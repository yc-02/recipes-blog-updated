'use client'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import LoginForm from '../login/LoginForm'
import Image from "next/image";
import { updateProfile } from '@/app/action'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [first_name, setFirstName] = useState<string | null>(null)
  const [last_name,setLastName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string|null>(null);
  const [imageFile,setImageFile]= useState<string|null>(null);
  function handleImageChange(e:ChangeEvent<HTMLInputElement>) {
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
              setFirstName(data.first_name)
              setUsername(data.username)
              setLastName(data.last_name)
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



  return (
    <div className='flex justify-center p-13'>
       {user? 
       <form className='w-full max-w-sm p-10 rounded items-center'>
        <div className='flex items-center justify-center'>
        {imageFile&&
        <div className="w-40 h-40 overflow-hidden rounded-full">
        <Image src={imageFile} alt="file" width={150} height={150} className='w-full h-full overflow-hidden'/>
        </div>}
        {avatar_url && imageFile===null && <div className="w-40 h-40 overflow-hidden rounded-full">
        <Image src={avatar_url} alt="file" width={150} height={150} className='w-full h-full overflow-hidden'/>
        </div>
        }
        </div>
        <label htmlFor="avatar_url" className='inputLabel'>Edit picture</label>
        <input type="file" accept="image/png,image/jpeg" id="avatar_url" name='avatar_url' onChange={handleImageChange} multiple className='input'/>
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
        />
        <label htmlFor="last_name" className='inputLabel'>Last Name</label>
        <input
          id="last_name"
          name='last_name'
          type="text"
          value={last_name || ''}
          onChange={(e) => setLastName(e.target.value)}
          className='input'
        />
        <label htmlFor="username" className='inputLabel'>Username</label>
        <input
          id="username"
          name='username'
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className='input'
        />
      <div className='my-3'>
        <button
          className="button"
          formAction={updateProfile}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </form>
    :
    <LoginForm/>
    }
    </div>
  )
}