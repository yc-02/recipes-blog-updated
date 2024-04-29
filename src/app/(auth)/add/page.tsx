"use client"
import { FormEvent, useState } from "react";
import { AddRecipeCard } from "@/app/action";
import AddForm from "../../components/AddForm";


export default function AddPage() {
 
  const [stepFormData, setStepFormData] = useState<string[]>([]);
  const [file, setFile] = useState<string|undefined>();


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

  

  return (
    <div className="min-h-screen">
    <AddForm 
    handleSubmit={handleSubmit} 
    setStepFormData={setStepFormData} 
    stepFormData={stepFormData} 
    file={file}
    setFile={setFile}
    />

    </div>
  )
}
