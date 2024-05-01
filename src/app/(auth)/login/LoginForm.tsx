"use client"
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginForm() {
  const supabase = createClient()
  const router = useRouter()
  const [error,setError]=useState<string|null>(null)
  const handleLogin=async(formData:FormData)=>{
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    const { error,data:signinData } = await supabase.auth.signInWithPassword(data)
  
    if (error) {
      setError(error.message)
    }else{
      router.push('/')
      router.refresh()
    }
  }

 const handleLoginWithGoogle=async()=>{
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
        redirectTo: `${location.origin}/auth/callback`,
    },
  })
  if(error){
    throw new Error(error.message)
  }
  router.refresh()
 }


 
 const imageLoader = ({ src, width, quality }:any) => {
  return `https://recipes-blog-updated.vercel.app/${src}?w=${width}&q=${quality || 75}`
}

 
  
  return (
    <div className='flex justify-center p-13 flex-col items-center'>
    <form className='w-full max-w-xs p-10 rounded'>
      <div className='inputContainer'>
      <label htmlFor="email" className='inputLabel'>Email</label>
      <input id="email" name="email" type="email" required  className='input'/>
      </div>
      <div className='inputContainer'>
      <label htmlFor="password" className='inputLabel'>Password</label>
      <input id="password" name="password" type="password" required  className='input'/>
      </div>
    <div className='my-3'>
    <button formAction={handleLogin} className='button'>Sign in</button>
    {error && <p className="text-red-600 py-3">*{error}</p>}
    </div>
    <p className="inputLabel">Or</p>
    <button onClick={handleLoginWithGoogle} type="button" className="my-3">
     <Image loader={imageLoader} src="/web_light_sq_SI@4x.png" alt="google signin" width={0} height={0} className="w-48 object-cover"/>
    </button>
    <div>
      <Link className="inline-block font-bold" href="/update-password">Forgot Password?</Link>
      </div>
      <div className="mt-4 border-t-2 pt-2 border-border">
        <h3>Don&apos;t have an account?</h3>
        <Link href="/signup" className="font-bold">Sign up</Link>
      </div>
  </form>
  </div>
  )
}
