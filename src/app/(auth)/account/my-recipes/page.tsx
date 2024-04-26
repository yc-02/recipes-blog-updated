
import { createClient } from '@/utils/supabase/server';
import React from 'react'
import { userLikedType } from '@/app/Types';
import RecipeCard from '@/app/components/RecipeCard';

export function generateMetadata(){
  return{
      title:"My Recipes"
  }
}

export default async function myRecipes() {
  const supabase = createClient()
  const {data:{user}} = await supabase.auth.getUser();
  const {data,error}=await supabase.from("recipes").select(`*,likes(*)`).eq('user_id',user?.id).order('id', { ascending: false })
  const recipes = data?.map((recipe)=>{
    const userHasLiked = recipe.likes.find((like:userLikedType)=>like.user_id === user?.id)
    return{
      ...recipe,
      userLiked:userHasLiked,
      likesCount:recipe.likes.length
    }
  })



  return (
    <div>
      <div className='w-full p-12 text-center'>
      <p className='text-lg font-semibold'>My Recipes</p>
      </div>
        <RecipeCard recipes={recipes} user={user}/>
    </div>
    
  )
}
