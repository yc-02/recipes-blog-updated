"use client"
import Image from 'next/image';
import Link from "next/link";
import dayjs from 'dayjs';
import Likes from './Likes';
import { useSearchParams } from 'next/navigation';
import Sort from './Sort';
import { ClockIcon} from '@heroicons/react/24/outline'
import { useState } from 'react';
import { RecipeCardType } from '../Types';


export default function RecipeCard({recipes}:{recipes:RecipeCardType[]|undefined}) {

   const searchParams = useSearchParams()
   const search = searchParams.get('search')?.toLowerCase()
   let searchedRecipes = recipes
   if(search){
    searchedRecipes = recipes?.filter(r => r.ingredients.toLowerCase().includes(search)||r.recipe_name.toLowerCase().includes(search))
  }
  const sort = searchParams.get('sort')
  let renderRecipes =searchedRecipes
  if(sort){
    if(sort === "mostrecent"){
      renderRecipes = searchedRecipes?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } else if(sort === "timeused:lowtohigh"){
     renderRecipes = searchedRecipes?.sort((a, b) => a.time_used - b.time_used)
    } else if(sort === "mostpopular"){
      renderRecipes = searchedRecipes?.sort((a,b)=> b.likesCount - a.likesCount)
    }
  }
  const [showSort,setShowSort]=useState(false)

    return (
      <div className='flex flex-col gap-10 bg-secondary w-screen'>
       <div className='flex justify-end py-1 px-6'>
       <Sort search={search} showSort={showSort} setShowSort={setShowSort}/>
       </div>
        <div className="flex flex-col items-center justify-center gap-10 w-full px-12 md:grid md:grid-cols-3 xl:grid-cols-4" 
        onClick={()=>setShowSort(false)}>
        {renderRecipes?.map((recipe)=>(
        <div key={recipe.id} className="card hover:shadow-lg">
          <Link href={`/${recipe.id}`}>
            <div>
            <Image
            src={`${recipe.image_path}`}
            width={500}
            height={500}
            alt="image"
            className="w-full h-48 sm:h-52 object-cover"
            />
            </div>
          <div className="m-4">
          <p className="font-bold uppercase text-lg">{recipe.recipe_name}</p>
          <p className="flex text-text-secondary items-baseline gap-2">Updated at</p>
          <p className='text-sm text-text-secondary'>{dayjs(recipe.created_at).format('MMM D, YYYY h:mm A')}</p>
          </div>
          <div className="badges">
            <ClockIcon  className="h-6 w-6 inline-block mr-2"/>
            <p>{recipe.time_used} minutes</p>
          </div>
          </Link>
          <div className="float float-end items-center px-3 pb-2"> 
          <div className='flex items-center justify-center'>
          <Likes recipe={recipe}/> 
          </div>
          <p className='text-sm text-text-secondary'>{recipe.likesCount} likes</p>
          </div>
        </div>
    ))}
    </div>
    <div className='flex items-center justify-center h-96'>
      {recipes?.length === 0 && (<p className="text-xl text-text-secondary"> No recipes available.</p>)}
      {searchedRecipes?.length === 0 && recipes?.length!==0 && (<p className='text-xl text-text-secondary'>Nothing Found.</p>)}
    </div>
    </div>
      
  )
}
