"use client"
import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function ResetPasswordpage() {
    const router = useRouter()
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")
    const searchParams=useSearchParams()
    const redirect = searchParams.get('redirect')
    const supabase = createClient()

    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault()
        const { error } = await supabase.auth.resetPasswordForEmail(email,{
            redirectTo: `${location.origin}/account/update-password`
          })
          if(error){
            setError(error.message)
          }else{
          router.replace('/update-password?redirect=redirect')}
        
    }
    if(redirect && redirect ==="redirect"){
      return (
        <div className='flex flex-col p-10 gap-5 items-center font-semibold'>
        <p>Keep an eye out for your password link!</p>
        <p>An email with a link to reset your password has just been sent to the email address registered with us.</p>       
        </div>
      )
    }
  
  return (
   <div className='flex flex-col gap-5 p-12 items-center'>
    <p className='font-bold'>Set a new password</p>
    <p>We will send you a link to reset your password </p>
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-1/2 items-center'>
    <input
    onChange={(e)=>setEmail(e.target.value)} 
    type="email" placeholder='Email' required
    className='p-1 border border-slate-500 w-72 rounded'/>
    <button className='button'>Send Email</button>
    </form>
    {error&& <p className='text-pink-800'>{error}</p>}
   </div>
  )
}
