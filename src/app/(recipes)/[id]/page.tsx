import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import dayjs from 'dayjs';
import DeleteButton from "../../components/DeleteButton";

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
    const directions = JSON.parse(recipe.directions)
    console.log(directions)

    return(
        <div className="px-12 py-6 flex flex-col gap-3">
        {user?(
            <>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="md:h-96 w-full flex flex-col gap-3">
                <p className="font-bold uppercase text-xl mb-5">{recipe.recipe_name}</p>
                <p>Created by {recipe.profiles?.username}</p>
                <p className="flex"><span className="mr-1">Updated</span>{dayjs(recipe.created_at).format('MMM D, YYYY h:mm A')}</p>
                <div>
                    {user?.id === recipe.user_id && 
                    <DeleteButton id={recipe.id}/>
                    }
                </div>
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