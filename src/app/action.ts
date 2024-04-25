'use server'
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

  const { error } = await supabase.auth.signInWithPassword(data)

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
  console.log(profileEmail?.length)
  console.log(profileUsername?.length)

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

export async function AddRecipeCard(formData:FormData){
  const recipe=Object.fromEntries(formData)
  const {data:{user}}=await supabase.auth.getUser()
      const file = recipe.image_data
      const filePath = `${user?.id}/${uuidv4()}`
      const {data:uploadData,error:uploadError} = await supabase.storage.from('test').upload(filePath,file,{
              contentType:  'image/png,image/jpeg',
      })
      if (uploadError){
          throw new Error (uploadError.message)
      }


  const {error}=await supabase.from("recipes").insert({
      recipe_name:recipe.recipe_name,
      directions:recipe.directions,
      ingredients:recipe.ingredients,
      time_used:recipe.time_used,
      user_id:user?.id,
      image_path:`test/${uploadData.path}`,
      file_path:filePath
  })
  if (error){
      throw new Error (error.message)
  }
  else{
      redirect('/')
  }

}

//delete food card
export async function deleteRecipeCard(id:string){
  const {data} = await supabase.from('recipes').select('file_path').eq('id',id)
  const {error} = await supabase.from('recipes').delete().eq('id',id)


  const filePathToDelete:string=data? data[0].file_path :''

  const {error:storageError } = await supabase.storage.from('test').remove([`${filePathToDelete}`])
  
  if (error){
      throw new Error (error.message)
  }else if(storageError){
      throw new Error (storageError.message)
  }else redirect('/')
}
