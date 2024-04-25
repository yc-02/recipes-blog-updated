import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function accountPage() {

    const supabase = createClient()
    const {data:{user}}=await supabase.auth.getUser()
    const {data} = await supabase.from('profiles').select('avatar_url, username').eq('id',user?.id).single()
    console.log(data)

  return (
<div>
  
</div>
  )
}
