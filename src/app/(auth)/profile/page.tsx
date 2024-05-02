import { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import UpdateProfileForm from '@/app/components/UpdateProfileForm'

export const metadata:Metadata={
  title:"Profile"
}


export default async function profilePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const {data:profileUsername}= await supabase.from("profiles").select('username')



  return (
    <div className='pt-14'>
    <UpdateProfileForm user={user} profileUsername={profileUsername} />
    </div>

)
}