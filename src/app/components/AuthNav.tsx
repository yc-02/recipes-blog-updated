import AuthNavClient from "./AuthNavClient"
import { createClient } from "@/utils/supabase/server"
import {v4 as uuidv4} from 'uuid'

export default async function AuthNav() {

    const supabase = createClient()
    const {
        data: { user },
      } = await supabase.auth.getUser()


    const {data:profileData} = await supabase.from('profiles').select().eq('id',user?.id)

    if(user?.identities){
      if(user.identities[0].provider ==='google'){
        if(profileData?.length===0){
          const { data, error } = await supabase.from('profiles').insert({
            id: user?.id,
            email:user?.email,
            username: `${user?.user_metadata.full_name}-${uuidv4()}`,
            full_name: user?.user_metadata.full_name.replace(/(\S+)\s+(\S+)/, '$1,$2'),
            updated_at: new Date().toISOString(),
            avatar_url:user?.user_metadata.avatar_url
          })
          if(error){
            throw new Error(error.message)
          }
        }
      }
    }

    const {data} = await supabase.from('profiles').select('avatar_url, username').eq('id',user?.id).single()

  return ( 
    <div className="flex items-center gap-5 justify-between w-full py-2 px-6 bg-secondary">
      <AuthNavClient user={user} data={data}/>
    </div>
  )
}
