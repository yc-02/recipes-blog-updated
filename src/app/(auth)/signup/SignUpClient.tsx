"use client"
import { ChangeEvent,useState } from "react";
import { signup } from "../../action";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupDataType} from "@/app/Types";
import { ErrorMessage } from "@hookform/error-message";


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
    } = useForm<SignupDataType>({criteriaMode: "all"})
  
  
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
      <input 
      {...register("email", { 
        required: "This field is required.",
        pattern:{
        value:/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,10})(\.[a-z]{2,10})?$/,
        message:'Invalid email address.'
      } 
    })} 
      className="input"  
      onBlur={handleValidateEmail} 
      onFocus={()=>setEmailError(false)}
      />
      <ErrorMessage errors={errors} name="email" render={({messages})=>messages && Object.entries(messages).map(([type,message])=>(
        <p key={type} className="text-red-500 text-sm">{message}</p>
      ))}/>
        {emailError===true && <p className="text-red-500 text-sm">This email is already registered. Please use another one.</p>}
      <label htmlFor="password" className='inputLabel'>Password</label>
      <input 
      {...register("password", 
      { required:"This field is required.",
        pattern:{
          value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}/.|:"<>?])(?=.*[a-zA-Z0-9]).{6,}$/,
          message:'Password should include at least 6 characters, and contain a combination of uppercase and lowercase letters, numbers, and symbols.'
        },
      })} 
      className="input" 
      type="password"/>
        <ErrorMessage errors={errors} name="password" render={({messages})=>messages && Object.entries(messages).map(([type,message])=>(
        <p key={type} className="text-red-500 text-sm">{message}</p>
      ))}/>
    
      <label htmlFor="first_name" className='inputLabel'>First Name</label>
      <input 
      {...register("first_name", 
      { required: "This field is required." })} 
      className="input" />
      <ErrorMessage errors={errors} name="first_name" render={({message})=><p className="text-red-500 text-sm">{message}</p>}/>
      <label htmlFor="last_name" className='inputLabel'>Last Name</label>
      <input 
      {...register("last_name", 
      { required: "This field is required." })} 
      className="input" />
      <ErrorMessage errors={errors} name="last_name" render={({message})=><p className="text-red-500 text-sm">{message}</p>}/>
      <label htmlFor="username" className='inputLabel'>Username</label>
      <input 
      {...register("username", 
      { required: "This field is required.",
        pattern:{
          value:/^[a-z\d-]{4,}$/,
          message:"The username must be at least 4 characters and can only include lowercase letters, numbers, and hyphens (-)."
        }
       },
      )} 
      className="input" 
      onBlur={handleValidateUsername} 
      onFocus={()=>setUsernameError(false)}
      />
      <ErrorMessage errors={errors} name="username" render={({messages})=>messages && Object.entries(messages).map(([type,message])=>(
        <p key={type} className="text-red-500 text-sm">{message}</p>
      ))}/>
    
      {usernameError ===true && <p className="text-red-500 text-sm">Username already exists. Please choose a different one.</p>}
    <div className='my-3'>
    <button type="submit" className='button'>Sign up</button>
    </div>
    </form>
    </div>
      
    )
  }