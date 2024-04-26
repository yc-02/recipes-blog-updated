"use server"
import RecipeCard from "../components/RecipeCard";
import { createClient } from "@/utils/supabase/server";
import { userLikedType } from "../Types";



export default async function Home() {
  const supabase = createClient()
  const {data:{user}} = await supabase.auth.getUser();
  const {data,error}=await supabase.from("recipes").select(`*,likes(*)`).order('id', { ascending: false })
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
      <RecipeCard recipes={recipes} user={user}/>
      </div>
  );
}
