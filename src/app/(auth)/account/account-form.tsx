'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import LoginForm from '../login/LoginForm'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [first_name, setFirstName] = useState<string | null>(null)
  const [last_name,setLastName] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)


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

  async function updateProfile({
    username,
    first_name,
    last_name,
  }: {
    username: string | null
    first_name: string | null
    last_name: string |null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        email:user?.email,
        first_name: first_name,
        username: username,
        last_name: last_name,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center p-13'>
       {user? 
       <div className='w-full max-w-xs p-10 rounded text-base; bg-neutral-100'>
        <label htmlFor="email" className='inputLabel'>Email</label>
        <input id="email" type="text" value={user?.email} disabled className='input' />
        <label htmlFor="first_name" className='inputLabel'>First Name</label>
        <input
          id="first_name"
          type="text"
          value={first_name || ''}
          onChange={(e) => setFirstName(e.target.value)}
          className='input'
        />
        <label htmlFor="last_name" className='inputLabel'>Last Name</label>
        <input
          id="last_name"
          type="text"
          value={last_name || ''}
          onChange={(e) => setLastName(e.target.value)}
          className='input'
        />
        <label htmlFor="username" className='inputLabel'>Username</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className='input'
        />
      <div className='my-3'>
        <button
          className="button"
          onClick={() => updateProfile({ first_name, last_name, username,})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </div>
    :
    <LoginForm/>
    }
    </div>
  )
}