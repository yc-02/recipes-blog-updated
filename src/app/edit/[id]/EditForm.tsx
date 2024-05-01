"use client"
import { RecipesSupabaseDataType } from "@/app/Types";
import { FormEvent, useState } from "react";
import { EditRecipeCard } from "@/app/action";
import AddForm from "@/app/components/AddForm";

export default function EditForm({recipe}:{recipe:RecipesSupabaseDataType}) {

    const stepData = JSON.parse(recipe.directions)
    const [stepFormData,setStepFormData]=useState(stepData)
    const [file, setFile] = useState<string|undefined>(recipe?.image_path);

    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const formData = new FormData(event.currentTarget); 
        const directionsData = JSON.stringify(stepFormData)
        try {
          await EditRecipeCard(formData,directionsData,recipe,file);
        } catch (error) {
          console.error('Error updating profile:', error);
        } 
      };
    
  return (
   <AddForm 
   handleSubmit={handleSubmit} 
   stepFormData={stepFormData} 
   setStepFormData={setStepFormData} 
   recipe={recipe}
   file={file}
   setFile={setFile}
   />
  )
}
