"use client"
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Steps({setFormData,formData}:{
    setFormData: Dispatch<SetStateAction<string[]>>, formData:string[]
}) {



    const [steps, setSteps] = useState(formData.length===0?1:formData.length);
    const newInputs = Array.from({length:steps})
    
    const addStep = () => {
      setSteps((prevSteps) => prevSteps + 1);
      setFormData((prevFormData) => [...prevFormData, '']);
    };

    const deleteStep=()=>{
        setSteps((prevSteps)=>prevSteps-1)
        setFormData((prevFormData) => {
            const updatedFormData = [...prevFormData];
            updatedFormData.pop();
            return updatedFormData;
          });
    }

    const handleInputChange = (e:ChangeEvent<HTMLTextAreaElement>, index:number) => {
        const updatedFormData = [...formData];
        updatedFormData[index] = e.target.value
        setFormData(updatedFormData);
      };
    


  return (
    <div>
      {newInputs.map((_,index)=>(
        <div key={index}>
        <label className="text-sm">Step{index+1}</label>
        <textarea className="input h-32 resize-none" name={`step ${index + 1}`} onChange={(e)=>handleInputChange(e,index)} value={formData[index]}></textarea>
        </div>
      ))}
      <div className="flex items-center gap-3">
      <button type="button" className="addBtn flex items-center" onClick={addStep}>
      <PlusIcon className="w-6 h-6"/>
      Step</button>
      <button onClick={deleteStep} className="addBtn flex items-center" type="button">
        <MinusIcon className="w-6 h-6"/>
        Step</button>
      </div>
  </div>
  )
}
