"use server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {v4 as uuidv4} from 'uuid'
import { RecipesSupabaseDataType, SignupDataType} from './Types'

const supabase = createClient()

export async function login(formData: FormData) {
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error,data:signinData } = await supabase.auth.signInWithPassword(data)

  if (error) {
    throw new Error (error.message)
  }
  revalidatePath('/', 'layout')
  redirect('/')
}


export async function signup(signupData:SignupDataType) {

   const { data, error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password
    })

    if(data.user?.id!==null){
      const {error:profileError} = await supabase.from('profiles').insert({
        id:data.user?.id,
        email:signupData.email,
        full_name:`${signupData.first_name},${signupData.last_name}`,
        username:signupData.username.toLowerCase(),
        updated_at:new Date().toISOString(),
      })
      if(profileError){
        throw new Error(profileError.message)
      }
    }

  if (error) {
    throw new Error (error.message)
  }else{
    revalidatePath('/', 'layout')
    redirect('/verify')
  }


  }


export async function AddRecipeCard(formData:FormData,directionsData:string){
  const recipe=Object.fromEntries(formData)
  const {data:{user}}=await supabase.auth.getUser()
  const {data:username} = await supabase.from('profiles').select('username').eq('id',user?.id).single()


      const file = recipe.image_data
      const filePath = `${user?.id}/${uuidv4()}`
      const {data:uploadData,error:uploadError} = await supabase.storage.from('recipes').upload(filePath,file,{
              contentType:  'image/png,image/jpeg',
      })
      if (uploadError){
          throw new Error (uploadError.message)
      }


  const {data,error}=await supabase.from("recipes").insert({
      recipe_name:recipe.recipe_name,
      directions:directionsData,
      ingredients:recipe.ingredients,
      time_used:recipe.time_used,
      user_id:user?.id,
      image_path:`recipes/${uploadData.path}`,
      file_path:filePath,
      username:username?.username
  })
  if (error){
      throw new Error (error.message)
  }
  else{
      redirect(`/user-recipes/${username?.username}`)
  }

}

//delete recipe card
export async function deleteRecipeCard(id:string){
  const {data} = await supabase.from('recipes').select('file_path').eq('id',id).single()
  const {error} = await supabase.from('recipes').delete().eq('id',id)


  const {error:storageError } = await supabase.storage.from('recipes').remove([`${data?.file_path}`])
  
  if (error){
      throw new Error (error.message)
  }else if(storageError){
      throw new Error (storageError.message)
  }else redirect('/')
}

//edit recipe
export async function EditRecipeCard(formData:FormData,directionsData:string,recipeOriginData:RecipesSupabaseDataType,file:string|undefined){
  const recipe=Object.fromEntries(formData)


if(file!==undefined && file!==recipeOriginData.image_path){
  const file = recipe.image_data
  const filePath = recipeOriginData.file_path
  const {error:uploadError} = await supabase.storage.from('recipes').update(filePath,file,{
          contentType:  'image/png,image/jpeg',
  })
  if (uploadError){
      throw new Error (uploadError.message)
  }

}

  const {data:{user}}=await supabase.auth.getUser()


  const {data, error}=await supabase.from('recipes').update({
      recipe_name:recipe.recipe_name,
      directions:directionsData,
      ingredients:recipe.ingredients,
      time_used:recipe.time_used,
      created_at:new Date().toISOString()
  }).eq('id',recipeOriginData.id).eq('user_id',user?.id).select()


  if (error){
      throw new Error (error.message)
  }
  else{
      redirect('/my-recipes')
  }

}





//update user profile

export async function updateProfile(formData:FormData,imageFile:string|null) {

  const {data:{user}}=await supabase.auth.getUser()
  const {data} = await supabase.from('profiles').select('avatar_url').eq('id',user?.id).single()
  const profile=Object.fromEntries(formData)
  const usernameLower = profile.username.toString().toLowerCase()
  const filePath = `${user?.id}/profile-image`

//update bucket

  if(imageFile!==null){
    if(data?.avatar_url && !data?.avatar_url.includes('https')){
     const {data:imageData,error} = await supabase.storage.from('avatar').update(filePath,profile.avatar_url,{
        contentType:  'image/png,image/jpeg',
      })
      if (error){
        throw new Error (error.message)
      }
    }else{
      const {data:uploadData,error:uploadError} = await supabase.storage.from('avatar').upload(filePath,profile.avatar_url,{
        contentType:  'image/png,image/jpeg',
     })
     if (uploadError){
      throw new Error (uploadError.message)
    }
  }
  }
//update profile
   if(imageFile!==null){
    const { error } = await supabase.from('profiles').upsert({
      id: user?.id as string,
      email:user?.email,
      username: usernameLower,
      full_name:`${profile.first_name},${profile.last_name}`,
      updated_at: new Date().toISOString(),
      avatar_url:`avatar/${filePath}`
    })
    if(error){
      throw new Error(error.message)
    }else{
      redirect('/profile')
    }

   }else{
    const { error } = await supabase.from('profiles').upsert({
      id: user?.id as string,
      email:user?.email,
      username: usernameLower,
      full_name:`${profile.first_name},${profile.last_name}`,
      updated_at: new Date().toISOString(),
    })
    if(error){
      throw new Error(error.message)
    }else{
      redirect('/profile')
    }

   }



}