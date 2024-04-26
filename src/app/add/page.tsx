"use client"
import { ChangeEvent, FormEvent, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { AddRecipeCard } from "@/app/action";
import { PhotoIcon, XMarkIcon} from '@heroicons/react/24/outline'
import Steps from "./Steps";


export default function RecipeCardForm() {
 
    const [file, setFile] = useState('');
     function handleChange(e:ChangeEvent<HTMLInputElement>) {
      e.preventDefault()
      if(e.target.files){
        setFile(URL.createObjectURL(e.target.files[0]));
      }
          
  }
  const [isPending,startTransition] = useTransition()
  const [stepFormData, setStepFormData] = useState<string[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null)
  const handleImageChange = ()=>{
    imageInputRef.current?.click()
  }


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const formData = new FormData(event.currentTarget); 
    const directionsData = JSON.stringify(stepFormData)
    try {
      await AddRecipeCard(formData,directionsData);
    } catch (error) {
      console.error('Error updating profile:', error);
    } 
  };

  
console.log('step',stepFormData)
  return (
    <div className="flex flex-col items-center p-16 w-full justify-center gap-3">
        {file ?
        <div className="flex justify-center h-60 w-60 overflow-hidden rounded relative m-3">
          <Image src={file} alt="file" width={300} height={300} className="overflow-hidden"/>
          <XMarkIcon className="w-6 h-6 absolute top-0 right-0 cursor-pointer font-bold" onClick={()=>setFile('')}/>
        </div>:
          <button onClick={handleImageChange} className="flex gap-3">
            Add Photo <PhotoIcon className="w-6 h-6"/>
          </button>
        }
        <form className="flex flex-col p-7 justify-end" onSubmit={(event)=>startTransition(()=>handleSubmit(event))}>
        <input 
        type="file" 
        accept="image/png,image/jpeg" 
        name="image_data" 
        className="hidden"
        ref={imageInputRef}
        onChange={handleChange}
        />
        <label className="inputLabel">
            Recipe name:
            <input type="text"  name="recipe_name" className="input" required/>
        </label>
        <label className="inputLabel">
            Time used - minutes:
            <input type="number" name="time_used" className="input" placeholder="numbers" required />
        </label>
        <label className="inputLabel"> Ingredients:</label>
            <textarea  name="ingredients"className="input h-32 resize-none" required placeholder="Use comma to separate"/>
        <label className="inputLabel">
            Directions:
           <Steps setFormData={setStepFormData} formData={stepFormData}/>
        </label>
        <div className="flex w-full justify-center mt-3">
        <button className="button w-1/3" type="submit" disabled={isPending}>
        {isPending && (
          <span>
            Adding...
          </span>
        )}
        {!isPending && (
          <span>
            Add Recipe
          </span>
        )}
        </button>
        </div>
    </form>
    </div>
  )
}
