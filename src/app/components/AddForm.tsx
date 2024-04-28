"use client"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState, useTransition } from 'react';
import Image from "next/image";
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Steps from '../add/Steps';
import { RecipesSupabaseDataType } from '../Types';

interface AddFormProp{
    handleSubmit:(event: FormEvent<HTMLFormElement>) => Promise<void>;
    setStepFormData:Dispatch<SetStateAction<string[]>>;
    stepFormData:string[]
    recipe?:RecipesSupabaseDataType
    file:string|undefined
    setFile: Dispatch<SetStateAction<string | undefined>>

}

export default function AddForm({handleSubmit,setStepFormData,stepFormData,recipe,file,setFile}:AddFormProp) {


    function handleChange(e:ChangeEvent<HTMLInputElement>) {
      e.preventDefault()
      if(e.target.files){
        setFile(URL.createObjectURL(e.target.files[0]));
      }
          
  }
    const [isPending,startTransition] = useTransition()
    const imageInputRef = useRef<HTMLInputElement>(null)
    
    const handleImageChange = ()=>{
      imageInputRef.current?.click()
    }

    const [recipe_name,setRecipeName] = useState(recipe?.recipe_name)
    const [time_used,setTimeUsed]= useState<any>(recipe?.time_used)
    const [ingredients,setIngerdients] = useState(recipe?.ingredients)



  return (
    <div className="addContainer">
    <form className="addForm" onSubmit={(event)=>startTransition(()=>handleSubmit(event))}>
    <input 
    type="file" 
    accept="image/png,image/jpeg" 
    name="image_data" 
    className="hidden"
    ref={imageInputRef}
    onChange={handleChange}
    />
    <div className="flex justify-end mt-3">
    <button className="publishBtn" type="submit" disabled={isPending}>
    {isPending && (
      <span>
        Publishing...
      </span>
    )}
    {!isPending && (
      <span>
        Publish Recipe
      </span>
    )}
    </button>
    </div>
    <label className="addInputLabel">
        Recipe name
        <input type="text"  name="recipe_name" className="input" required value={recipe_name} onChange={(e)=>setRecipeName(e.target.value)}/>
    </label>
    <label className="addInputLabel">
        Time used - minutes
        <input type="number" name="time_used" className="input" placeholder="numbers" required value={time_used}  onChange={(e)=>setTimeUsed((e.target.value))}/>
    </label> 
    {file ?
    <div className="addBtnContainer relative">
      <div className="flex h-60 overflow-hidden rounded m-3">
      <Image src={file} alt="file" width={300} height={300} className="object-cover"/>
      <XMarkIcon className="w-6 h-6 absolute top-2 right-2 cursor-pointer" onClick={()=>setFile('')}/>
    </div>

    </div>
    :
    <div className="addBtnContainer">
      <button onClick={handleImageChange} className="addInputLabel flex items-center gap-3 addBtn" type="button">
        Add Photo <PhotoIcon className="w-6 h-6"/>
      </button>
    </div>

    }
    <label className="addInputLabel"> Ingredients</label>
        <textarea  name="ingredients"className="input h-32 resize-none" required placeholder="Use comma to separate" value={ingredients} onChange={(e)=>setIngerdients(e.target.value)}/>
    <label className="addInputLabel">
        Directions
       <Steps setFormData={setStepFormData} formData={stepFormData}/>
    </label>
</form>
</div>
  )
}
