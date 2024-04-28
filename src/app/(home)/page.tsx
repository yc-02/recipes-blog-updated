"use server"
import { createClient } from "@/utils/supabase/server";
import { RecipeCardType, LikesSupabaseDataType } from "../Types";
import RecipeCard from "../components/RecipeCard";



export default async function Home() {
  const supabase = createClient()
  const {data:{user}} = await supabase.auth.getUser();
  const {data,error}=await supabase.from("recipes").select(`*,likes(*)`).order('id', { ascending: false })
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
      <RecipeCard recipes={recipes} user={user}/>
      </div>
  );
}
