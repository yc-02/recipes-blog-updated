'use client'
import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import LoginForm from '../(auth)/login/LoginForm'
import Image from "next/image";
import { updateProfile } from '@/app/action'
import { XMarkIcon } from '@heroicons/react/24/solid'

export default function UpdateProfileForm({ user,profileUsername }: { 
  user: User | null;
  profileUsername: {
  username: any;
}[] | null}) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [first_name, setFirstName] = useState<string | null>(null)
  const [last_name,setLastName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string|null>(null);
  const [imageFile,setImageFile]= useState<string|null>(null);
  const [usernameError,setUsernameError]=useState<boolean>(false);
  function handleChange(e:ChangeEvent<HTMLInputElement>) {
       if(e.target.files){
         setImageFile(URL.createObjectURL(e.target.files[0]));
       }
}


  const getProfile = useCallback(async () => {
    if(user){
        try {
            setLoading(true)
            const { data, error, status } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user?.id)
              .single()
      
            if (error && status !== 406) {
              throw error
            }
      
            if (data) {
              const [firstName,lastName]=data.full_name.split(',')
              setUsername(data.username)
              setLastName(lastName)
              setFirstName(firstName)
              setAvatarUrl(data.avatar_url)
            }
          } catch (error) {
            alert('Error loading user data!')
          } finally {
            setLoading(false)
          }
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  const imageInputRef = useRef<HTMLInputElement>(null)
  const handleImageChange = ()=>{
    imageInputRef.current?.click()
  }

  const [isPending,startTransition] = useTransition()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const formData = new FormData(event.currentTarget); 
    if(usernameError!==true){
      try {
        await updateProfile(formData,imageFile);
      } catch (error) {
        console.error('Error updating profile:', error);
      } finally{
        alert('updated!')
      }

    }
  };

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
    <div className='flex flex-col justify-center p-13 items-center'>
       {user? 
       <>
       <div className='flex flex-col items-center justify-center relative'>
         {imageFile&&
         <>
        <XMarkIcon className='w-6 h-6 absolute top-0 right-0 cursor-pointer' onClick={()=>setImageFile(null)}/>
         <div className="w-40 h-40 overflow-hidden rounded-full">
         <Image src={imageFile} alt="file" width={150} height={150} className='w-full h-full overflow-hidden'/>
         </div>
         </>
         }
         {avatar_url && imageFile===null && <div className="w-40 h-40 overflow-hidden rounded-full">
         <Image src={avatar_url} alt="file" width={150} height={150} className='w-full h-full overflow-hidden'/>
         </div>
         }
         {avatar_url===null && imageFile===null&&
         <div className='w-40 h-40 bg-gray-200 rounded-full'>
         </div>
          }
         <button className='inputLabel' onClick={handleImageChange}>
           {avatar_url===null? 'Add profile Photo':'Change Photo'}
         </button>
         </div>
       <form className='w-full max-w-sm p-10 rounded items-center' onSubmit={(event)=>startTransition(()=>handleSubmit(event))}>
        <input 
        type="file" 
        accept="image/png,image/jpeg" 
        id="avatar_url" 
        name='avatar_url' 
        className="hidden"
        ref={imageInputRef}
        onChange={handleChange}
        />
        <label htmlFor="email" className='inputLabel'>Email</label>
        <input id="email" name='email' type="text" value={user?.email} disabled className='input' />
        <label htmlFor="first_name" className='inputLabel'>First Name</label>
        <input
          id="first_name"
          name='first_name'
          type="text"
          value={first_name || ''}
          onChange={(e) => setFirstName(e.target.value)}
          className='input'
          required
        />
        <label htmlFor="last_name" className='inputLabel'>Last Name</label>
        <input
          id="last_name"
          name='last_name'
          type="text"
          value={last_name || ''}
          onChange={(e) => setLastName(e.target.value)}
          className='input'
          required
        />
        <label htmlFor="username" className='inputLabel'>Username</label>
        <input
          id="username"
          name='username'
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className='input'
          required
          onBlur={handleValidateUsername} 
          onFocus={()=>setUsernameError(false)}
        />
        {usernameError ===true && <p className="text-red-500 text-sm">*Username already exists. Please choose a different one.</p>}
      <div className='my-3'>
      <button className="button" type="submit" disabled={isPending||loading}>
        {isPending && (
          <span>
            Updating...
          </span>
        )}
        {!isPending && (
          <span>
            Update
          </span>
        )}
        </button>
      </div>
    </form>
       </>
               
    :
    <LoginForm/>
    }
    </div>
  )
}