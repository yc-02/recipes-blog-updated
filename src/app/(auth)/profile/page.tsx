import { Metadata } from 'next'
import AccountForm from '../../components/AccountForm'
import { createClient } from '@/utils/supabase/server'
import {v4 as uuidv4} from 'uuid'

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