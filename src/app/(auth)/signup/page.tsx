"use client"
import { useState } from "react";
import { signup } from "../../action";

export default function SignUpPage() {
  const [email,setEmail] = useState<string|null>(null)
  const [password,setPassword]= useState<string|null>(null)
  const [first_name, setFirstName] = useState<string | null>(null)
  const [last_name,setLastName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)

console.log(email)
  return (
    <div className='flex justify-center p-13'>
    <form className='w-full max-w-xs p-10 rounded text-base; bg-neutral-100'>
    <label htmlFor="email" className='inputLabel'>Email</label>
    <input 
      id="email" 
      name="email"
      type="email" 
      value={email||''} 
      onChange={(e) => setEmail(e.target.value)}
      required 
      className='input' />
    <label htmlFor="password" className='inputLabel'>Password</label>
    <input 
      id="password" 
      name="password"
      type="password" 
      value={password||''} 
      required
      onChange={(e) => setPassword(e.target.value)}
      className='input' />
    <label htmlFor="first_name" className='inputLabel'>First Name</label>
    <input
      id="first_name"
      name="first_name"
      type="text"
      value={first_name || ''}
      onChange={(e) => setFirstName(e.target.value)}
      className='input'
    />
    <label htmlFor="last_name" className='inputLabel'>Last Name</label>
    <input
      id="last_name"
      name="last_name"
      type="text"
      value={last_name || ''}
      onChange={(e) => setLastName(e.target.value)}
      className='input'
    />
    <label htmlFor="username" className='inputLabel'>Username</label>
    <input
      id="username"
      name="username"
      type="text"
      value={username || ''}
      onChange={(e) => setUsername(e.target.value)}
      className='input'
    />
  <div className='my-3'>
  <button formAction={signup} className='button'>Sign up</button>
  </div>
  </form>
  </div>
    
  )
}
