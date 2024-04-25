"use client"

import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { AddRecipeCard } from "@/app/action";

export default function RecipeCardForm() {
 
    const [file, setFile] = useState('');
     function handleChange(e:ChangeEvent<HTMLInputElement>) {
          console.log(e.target.files);
          if(e.target.files){
            setFile(URL.createObjectURL(e.target.files[0]));
          }
          
  }

  return (
    <div className="flex justify-center p-7 m-2">
    <form className=" bg-neutral-100 p-7 rounded text-base w-1/2">
        <label className="inputLabel">
            Recipe name:
            <input type="text"  name="recipe_name" className="input" required/>
        </label>
        <label className="inputLabel"> Ingredients:</label>
            <input  name="ingredients" className="input" required placeholder="Use comma to separate"/>
        <label className="inputLabel">
            Directions:
            <textarea  name="directions" className="input h-48 resize-none" required/>
        </label>
        <label className="inputLabel">
            Time used - minutes:
            <input type="number" name="time_used" className="input" placeholder="numbers" required />
        </label>

        <label className="inputLabel">
            <input type="file" accept="image/png,image/jpeg" name="image_data" className="input mb-2" multiple onChange={handleChange}/>
        </label>
        {file&&
        <div className="flex justify-center input mb-2">
        <Image src={file} alt="file" width={300} height={300} className="overflow-hidden"/>
        </div>}
        <div className="flex w-full justify-center mt-3">
        <button className="button w-1/3" formAction={AddRecipeCard}>Add</button>
        </div>
    </form>
    </div>
  )
}
