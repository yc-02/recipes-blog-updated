"use client"
import { ChangeEvent,useState } from "react";
import { signup } from "../../action";
import { createClient } from "@/utils/supabase/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupDataType} from "@/app/Types";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<SignupDataType>()


  const [emailError,setEmailError]=useState<{ email: any; }[] | null>(null)
  const [usernameError,setUsernameError]=useState<{username: any;}[] | null>(null)

  const supabase = createClient()
  async function getEmailData(email:string) {
      const {data:profileEmail} = await supabase.from("profiles").select('email').eq("email",email);
      setEmailError(profileEmail)
    }
  async function getUsernameData(username:string) {
    const {data:profileUsername}= await supabase.from("profiles").select('username').eq("username",username);
    setUsernameError(profileUsername)
  }


  const onSubmit:SubmitHandler<SignupDataType>= (data)=>{
    if(emailError?.length===0 && usernameError?.length===0){
      signup(data)
    }
  }
  const handleValidateEmail=(e:ChangeEvent<HTMLInputElement>)=>{
  getEmailData(e.target.value)

  }
  const handleValidateUsername=(e:ChangeEvent<HTMLInputElement>)=>{
  getUsernameData(e.target.value)
  }

  return (
    <div className='flex justify-center p-13'>
    <form className='w-full max-w-xs p-10 rounded' onSubmit={handleSubmit(onSubmit)}>
    <label htmlFor="email" className='inputLabel'>Email</label>
    <input {...register("email", { required: true })} className="input"  
    onBlur={handleValidateEmail} onFocus={()=>setEmailError(null)}
    />
      {errors.email && <span className="text-red-500 text-sm">*This field is required</span>}
      {emailError && emailError.length!==0 && <p className="text-red-500 text-sm">*This email is already registered. Please use another one.</p>}
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
    onFocus={()=>setUsernameError(null)}
    />
      {errors.username && <span className="text-red-500 text-sm">*This field is required</span>}
    {usernameError && usernameError.length!==0 && <p className="text-red-500 text-sm">*Username already exists. Please choose a different one.</p>}
  <div className='my-3'>
  <button type="submit" className='button'>Sign up</button>
  </div>
  </form>
  </div>
    
  )
}
