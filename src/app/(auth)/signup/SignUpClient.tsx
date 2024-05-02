"use client"
import { ChangeEvent,useState } from "react";
import { signup } from "../../action";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupDataType} from "@/app/Types";


interface profileData{
  profileEmail: {
    email: string;
}[] | null
profileUsername: {
  username: string;
}[] |null
}

export default function SignUpClient({profileEmail,profileUsername}:profileData) {
    const {
      register,
      handleSubmit,
      formState: { errors},
    } = useForm<SignupDataType>()
  
  
    const [emailError,setEmailError]=useState<boolean>(false)
    const [usernameError,setUsernameError]=useState<boolean>(false)
  
    const onSubmit:SubmitHandler<SignupDataType>= (data)=>{
      if(emailError===false  && usernameError === false){
        signup(data)
      }
    }
    const handleValidateEmail=(e:ChangeEvent<HTMLInputElement>)=>{
     if(e.target.value.length>0){
      const exist = profileEmail?.some(a=>a.email.toLowerCase() === e.target.value.toLowerCase())
      if(exist){
       setEmailError(exist)
      }else{
       setEmailError(false)
      }
     }
    }
    const handleValidateUsername=(e:ChangeEvent<HTMLInputElement>)=>{
      if(e.target.value.length>0){
        const exist = profileUsername?.some(a=>a.username.toLowerCase() ===e.target.value.toLowerCase())
        if(exist){
         setUsernameError(exist)
        }else{
         setUsernameError(false)
        }
      }
    }

  
    return (
      <div className='flex justify-center p-13'>
      <form className='w-full max-w-xs p-10 rounded' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email" className='inputLabel'>Email</label>
      <input {...register("email", { required: true })} className="input"  
      onBlur={handleValidateEmail} onFocus={()=>setEmailError(false)}
      />
        {errors.email && <span className="text-red-500 text-sm">*This field is required</span>}
        {emailError===true && <p className="text-red-500 text-sm">*This email is already registered. Please use another one.</p>}
      <label htmlFor="password" className='inputLabel'>Password</label>
      <input {...register("password", { required: true })} className="input" type="password"/>
        {errors.password && <span className="text-red-500 text-sm">*This field is required</span>}
    
      <label htmlFor="first_name" className='inputLabel'>First Name</label>
      <input {...register("first_name", { required: true })} className="input" />
        {errors.first_name && <span className="text-red-500 text-sm">*This field is required</span>}
      <label htmlFor="last_name" className='inputLabel'>Last Name</label>
      <input {...register("last_name", { required: true })} className="input" />
        {errors.last_name && <span className="text-red-500 text-sm">*This field is required</span>}
      <label htmlFor="username" className='inputLabel'>Username</label>
      <input {...register("username", { required: true })} className="input" 
      onBlur={handleValidateUsername} 
      onFocus={()=>setUsernameError(false)}
      />
        {errors.username && <span className="text-red-500 text-sm">*This field is required</span>}
      {usernameError ===true && <p className="text-red-500 text-sm">*Username already exists. Please choose a different one.</p>}
    <div className='my-3'>
    <button type="submit" className='button'>Sign up</button>
    </div>
    </form>
    </div>
      
    )
  }