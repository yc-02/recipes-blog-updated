import RecipeCard from '@/app/components/RecipeCard'
import { FavoriteDataType, RecipeCardType, LikesSupabaseDataType } from '@/app/Types'
import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'

export const metadata:Metadata={
  title:"Favorites"
}

export default async function FavoritesPage() {
  const supabase = createClient()
  const {data:{user}} = await supabase.auth.getUser();
  const {data}=await supabase.from('likes').select(`*,recipes(*)`).eq('user_id',user?.id)
  const {data:likesData} = await supabase.from('likes').select()


  const recipes:RecipeCardType[]|undefined=data?.map((a:FavoriteDataType)=>{
    const userHasLiked = {id:a.id,user_id:a.user_id,recipe_id:a.recipe_id,created_at:a.created_at}
    const likes= likesData? likesData.filter((like:LikesSupabaseDataType)=>like.recipe_id===a.recipes.id):[]
   
    return{
      id:a.recipes.id,
      recipe_name:a.recipes.recipe_name,
      directions:a.recipes.directions,
      time_used:a.recipes.time_used,
      user_id:a.user_id,
      created_at:a.recipes.created_at,
      image_path:a.recipes.image_path,
      file_path:a.recipes.file_path,
      ingredients:a.recipes.ingredients,
      likes:likes,
      userLiked:userHasLiked,
      likesCount:likes?.length
    }
  }    
  )


  return (
    <div>
      <div className='w-full p-12 text-center'>
      <p className='text-lg font-semibold'>My Favorites</p>
      </div>
    <RecipeCard recipes={recipes} user={user}/>
    </div>
  )
}
