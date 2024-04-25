import { createClient } from "@/utils/supabase/server"
import Link from "next/link"


export default async function AuthNav() {

    const supabase = createClient()
    const {
        data: { user },
      } = await supabase.auth.getUser()

  return ( 
    <div className="flex items-center gap-5 justify-end p-3 w-full">
        {!user?
        <Link  href='/login' className="p-3">Log in</Link>
        :
        <div className="flex gap-3 items-center">
        <p>Hello, {user.user_metadata.username}</p>
        <Link href="/account" className="flex justify-end px-4">Account</Link>
        <form action="/auth/signout" method="post" className="flex justify-center">
          <button type="submit" className="text-xs">
            Log out
          </button>
        </form>
        </div>
        }
    </div>
  )
}
