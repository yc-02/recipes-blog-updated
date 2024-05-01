"use client"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { HeartIcon} from '@heroicons/react/24/solid'
import { RecipeCardType } from "../Types"


export default function Likes({recipe}:{recipe:RecipeCardType}) {
  
  const router=useRouter()

  async function handleClick (){
  
  const supabase= createClient()
  const {data:{user}}=await supabase.auth.getUser()

  if (user){
    if(recipe.userLiked){
      await supabase.from('likes').delete().match({user_id:user.id,recipe_id:recipe.id})
    }else{
      await supabase.from('likes').insert({user_id:user.id,recipe_id:recipe.id})
    }
    router.refresh()
  }else{
    router.push('/login')
  }
}


  return (
    <button onClick={handleClick}>
      <HeartIcon  className={`${recipe.userLiked?"fill-red-500 w-6 h-6 stroke-red-500":"fill-none w-6 h-6 stroke-black"}`}/>
    </button>
  )
}
