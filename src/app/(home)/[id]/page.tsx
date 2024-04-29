import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import dayjs from 'dayjs';
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DeleteButton from "@/app/components/DeleteButton";
import { notFound } from "next/navigation";


export async function generateMetadata({params}:{params:{id:string}}){
    const supabase=createClient()
    const {data} = await supabase.from('recipes').select().eq('id',params.id).single()

    return{
        title:`${data?.recipe_name||"Recipe not Found"}`
    }
}


type recipeDetailsData={
    id:string;
    recipe_name:string;
    directions:string;
    time_used:number;
    user_id:string;
    created_at:Date;
    image_path:string;
    file_path:string;
    ingredients:string;
    username:string
    profiles:{
        username:string;
        avatar_url:string

    }
}

async function getRecipe(id:string) {
    const supabase=createClient()
    const {data}=await supabase.from('recipes').select(`*,profiles(avatar_url,username)`).eq('id',id).single()
    if (!data){
        notFound()
    }
    return data
}


export default async function RecipeDetails({params}:{params:{id:string}}){
    const supabase=createClient()
    const {data:{user}} = await supabase.auth.getUser()
    const recipe:recipeDetailsData = await getRecipe(params.id)
    const directions = JSON.parse(recipe.directions)


    return(
        <div className="px-12 py-6 flex flex-col gap-3">
        {user?(
            <>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="md:h-96 w-full flex flex-col gap-3">
                <p className="font-bold uppercase text-xl mb-5">{recipe.recipe_name}</p>
                <p>Created by</p>
                <Link href={`/user-recipes/${recipe.profiles.username}`} className="flex gap-2 items-center">
                <div className="w-10 h-10 overflow-hidden rounded-full bg-purple-50">
                <Image src={`${recipe.profiles.avatar_url}`} width={50} height={50} alt="profile-image" className="object-cover"/>
                </div>
                <p> {recipe.profiles.username}</p>
                </Link>
                <p className="flex"><span className="mr-1">Updated</span>{dayjs(recipe.created_at).format('MMM D, YYYY h:mm A')}</p>
                    {user?.id === recipe.user_id && 
                    <div className="flex items-center gap-3">
                        <Link href={`/edit/${recipe.id}`}>
                        <PencilSquareIcon className="w-6 h-6 text-text"/>
                        </Link>
                    <DeleteButton id={recipe.id}/>
                    </div>
                    }
                </div>
                <div className="flex h-60 md:h-96 w-full overflow-hidden justify-center">
                <Image
                src={`${recipe.image_path}`}
                width={500}
                height={500}
                alt="image"
                className="object-cover rounded-md"
                />
                </div>
                <div className="md:col-span-2">
                <p className="text-xl border-b-2 font-bold">Ingredients:</p>
                <p className="text-lg">{recipe.ingredients}</p>
                </div>
                <div className="md:col-span-2">
                <p className="text-xl border-b-2 font-bold">Directions:</p>
                {directions.map((a:string,index:number)=>(
                    <div key={a}>
                        <p className="text-lg p-2">Step{index+1} :{a}</p>
                    </div>
                ))}
                </div>
            </div>
            </>
            ):
            (<div className="flex flex-col justify-center items-center h-96">
                <p className="mb-4">Please Log in first.</p>
                <Link href="/login" className="button">Log in</Link>
            </div>)}
        </div>
    )
}