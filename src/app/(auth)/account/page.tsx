import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata={
  title:"Account"
}


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
