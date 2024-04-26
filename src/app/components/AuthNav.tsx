import AuthNavClient from "./AuthNavClient"
import SmNav from "./AuthNavClient"
import { createClient } from "@/utils/supabase/server"

export default async function AuthNav() {

    const supabase = createClient()
    const {
        data: { user },
      } = await supabase.auth.getUser()

    const {data} = await supabase.from('profiles').select('avatar_url, username').eq('id',user?.id).single()


  return ( 
    <div className="flex items-center gap-5 justify-between w-full py-2 px-6 bg-secondary">
      <AuthNavClient user={user} data={data}/>
    </div>
  )
}
