"use client"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"


export default function SignoutButton() {
    const router = useRouter()
    const supabase = createClient()
    const handleSignOut=async()=>{
        const {error} = await supabase.auth.signOut()
        if(error){
            throw new Error(error.message)
        }else{
            router.refresh()
        }
      }

  return (
    <button type="submit" className="text-sm flex dropdown-link justify-start" onClick={handleSignOut}>Sign out</button>
  )
}
