import AccountForm from '../AccountForm'
import { createClient } from '@/utils/supabase/server'

export default async function profilePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()


  return <AccountForm user={user} />
}