import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import dayjs from 'dayjs';
import DeleteButton from "../DeleteButton";


export async function generateMetadata({params}:{params:{id:string}}){
    const supabase=createClient()
    const {data} = await supabase.from('recipes').select().eq('id',params.id).single()

    return{
        title:`${data?.recipe_name||"Recipe not Found"}`
    }
}

async function getRecipe(id:string){
    const supabase=createClient()
    const {data}=await supabase.from("recipes").select(`*,profiles(*)`).eq('id',id).single()

    if (!data){
        notFound()
    }
    return data
}

export default async function RecipeDetails({params}:{params:{id:string}}){
    const recipe = await getRecipe(params.id)
    const supabase = createClient()
    const {data:{user}} = await supabase.auth.getUser()


    return(
        <div>
        {user?(
            <>
            <div className="flex justify-between shadow-sm items-baseline">
            <h2 className="text-4xl font-semibold">Recipe Details</h2>
            {user?.id === recipe.user_id && 
            <DeleteButton id={recipe.id}/>
            }
            </div>

            <div className="grid mt-2 md:grid-cols-2 gap-4">
                <div className=" ml-10 mt-10">
                <h3 className="font-bold uppercase text-3xl mb-5">{recipe.recipe_name}</h3>
                <p>Created by {recipe.profiles?.username}</p>
                <p className="flex"><span className="mr-1">Updated</span>{dayjs(recipe.created_at).format('MMM D, YYYY h:mm A')}</p>
                </div>
                <div className="flex justify-center h-52">
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
                <p className="text-xl">{recipe.ingredients}</p>
                </div>
                <div className="md:col-span-2">
                <p className="text-xl border-b-2 font-bold">Directions:</p>
                <p className="text-xl">{recipe.directions}</p>
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