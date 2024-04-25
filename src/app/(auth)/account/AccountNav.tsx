import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import AccountNavClient from './AccountNavClient';


export default async function AccountNav() {

    const supabase = createClient()
    const {data:{user}}=await supabase.auth.getUser()
    const {data} = await supabase.from('profiles').select('avatar_url, username').eq('id',user?.id).single()

  return (
    <div className='flex flex-col gap-10 py-10'>
      {user && <AccountNavClient data={data}/>}
    </div>
  )
}
