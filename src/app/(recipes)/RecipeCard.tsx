import Image from 'next/image';
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import dayjs from 'dayjs';
import { userLikedType } from '../Types';
import Likes from './Likes';



export default async function RecipeCard() {
    
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
    <div className="grid md:grid-cols-3 gap-10">
    {recipes?.map((recipe)=>(
        <div key={recipe.id} className="card hover:shadow-lg">
          <Link href={`/${recipe.id}`}>
          <Image
          src={`${recipe.image_path}`}
          width={500}
          height={500}
          alt="ace"
          className="w-full h-48 sm:h-52 object-cover"
          />
          <div className="m-4">
          <p className="font-bold uppercase text-lg">{recipe.recipe_name}</p>
          <p className="text-neutral-400 flex"> <span className="mr-1">Updated</span>{dayjs(recipe.created_at).format('MMM D, YYYY h:mm A')}</p>
          </div>
          <div className="badges">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 inline-block mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
            <span>{recipe.time_used} minutes</span>
          </div>
          </Link>
          {user &&(<div className="flex justify-end m-2"> <Likes recipe={recipe}/> <span>{recipe.likesCount}</span></div>)}

        </div>
    ))}

      {data?.length === 0 && (<p className="text-2xl text-neutral-400"> No recipes available.</p>)}
      {error && (<p>{error.message}</p>)}
    </div>
  )
}
