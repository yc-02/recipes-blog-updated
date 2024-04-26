import { Metadata } from 'next'
import AccountForm from '../AccountForm'
import { createClient } from '@/utils/supabase/server'

export const metadata:Metadata={
  title:"Profile"
}


export default async function profilePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()


  return (
    <div className='pt-14'>
    <AccountForm user={user} />
    </div>

)
}