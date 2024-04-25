
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link'
import React from 'react'
import { userLikedType } from '@/app/Types';
import RecipeCard from '@/app/(recipes)/RecipeCard';

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
        <RecipeCard recipes={recipes}/>
    </div>
    
  )
}