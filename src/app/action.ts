"use server"
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import {v4 as uuidv4} from 'uuid'

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

export async function signup(formData: FormData) {
  const enter = Object.fromEntries(formData)
  const {data:profileEmail} = await supabase.from("profiles").select("email").eq("email",`${enter.email}`);
  const {data:profileUsername}= await supabase.from("profiles").select("username").eq("username",`${enter.username}`)


  if(profileEmail?.length!==0){
    throw new Error('Email already exists!');
  }
  if(profileUsername?.length!==0){
    throw new Error('Username already exists!');
  }

  if(profileEmail?.length===0 && profileUsername?.length ===0){
      const { data, error } = await supabase.auth.signUp({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      options:{
        data:{
          first_name:formData.get('first_name') as string,
          last_name:formData.get('last_name') as string,
          username:formData.get('username') as string
        }
      }
    })
  if (error) {
    throw new Error (error.message)
  }

  revalidatePath('/', 'layout')
  redirect('/verify')

  }

}

export async function AddRecipeCard(formData:FormData,directionsData:string){
  const recipe=Object.fromEntries(formData)

  const {data:{user}}=await supabase.auth.getUser()
      const file = recipe.image_data
      const filePath = `${user?.id}/${uuidv4()}`
      const {data:uploadData,error:uploadError} = await supabase.storage.from('recipes').upload(filePath,file,{
              contentType:  'image/png,image/jpeg',
      })
      if (uploadError){
          throw new Error (uploadError.message)
      }


  const {error}=await supabase.from("recipes").insert({
      recipe_name:recipe.recipe_name,
      directions:directionsData,
      ingredients:recipe.ingredients,
      time_used:recipe.time_used,
      user_id:user?.id,
      image_path:`recipes/${uploadData.path}`,
      file_path:filePath
  })
  if (error){
      throw new Error (error.message)
  }
  else{
      redirect('/account/my-recipes')
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

//update user profile

export async function updateProfile(formData:FormData) {

  const {data:{user}}=await supabase.auth.getUser()
  const {data} = await supabase.from('profiles').select('avatar_url').eq('id',user?.id).single()
  const profile=Object.fromEntries(formData)


  const filePath = `${user?.id}/profile-image`
  if(profile.avatar_url!==null){
    if(data?.avatar_url!==null){
      const {data,error} = await supabase.storage.from('avatar').update(filePath,profile.avatar_url,{
        contentType:  'image/png,image/jpeg',
      })
      if (error){
        throw new Error (error.message)
      }
      console.log(data)
  
    }else{
      const {data:uploadData,error:uploadError} = await supabase.storage.from('avatar').upload(filePath,profile.avatar_url,{
        contentType:  'image/png,image/jpeg',
     })
     if (uploadError){
      throw new Error (uploadError.message)
    }
  }
  }

   

    const { error } = await supabase.from('profiles').upsert({
      id: user?.id as string,
      email:user?.email,
      first_name: profile.first_name,
      username: profile.username,
      last_name: profile.last_name,
      updated_at: new Date().toISOString(),
      avatar_url:`avatar/${user?.id}/profile-image`
    })
    if(error){
      throw new Error(error.message)
    }else{
      redirect('/account/profile')
    }

}