import { LikesSupabaseDataType, RecipeCardType } from '@/app/Types'
import RecipeCard from '@/app/components/RecipeCard'
import { createClient } from '@/utils/supabase/server'
import React from 'react'

export default async function UserPage({params}:{params:{slug:string}}) {
  console.log(params)
  const supabase = createClient()
  const {data:{user}} = await supabase.auth.getUser()
  const {data:userId} = await supabase.from('profiles').select('id').eq('username',params.slug).single()
  const {data}=await supabase.from("recipes").select(`*,likes(*)`).eq('user_id',userId?.id).order('id', { ascending: false })
  const recipes:RecipeCardType[]|undefined = data?.map((recipe)=>{
    const userHasLiked = recipe.likes.find((like:LikesSupabaseDataType)=>like.user_id === user?.id)
    return{
      ...recipe,
      userLiked:userHasLiked,
      likesCount:recipe.likes.length
    }
  })
  
  return (
    <div>
      <div className='w-full p-12 text-center'>
            <p className='text-lg font-semibold'>{params.slug}&apos;s recipes</p>
      </div>
     <RecipeCard recipes={recipes}/>
    </div>
  )
}
