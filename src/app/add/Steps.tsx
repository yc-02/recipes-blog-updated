"use client"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function Steps({setFormData,formData}:{
    setFormData: Dispatch<SetStateAction<string[]>>, formData:string[]
}) {
    const [steps, setSteps] = useState(1);


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
        <label>Step{index+1}</label>
        <textarea className="input h-32 resize-none" name={`step ${index + 1}`} onChange={(e)=>handleInputChange(e,index)}></textarea>
        </div>
      ))}
      <div className="flex items-center gap-3">
      <button type="button" onClick={addStep}>Add Step</button>
      <button onClick={deleteStep} type="button">Delete Step</button>
      </div>
  </div>
  )
}
