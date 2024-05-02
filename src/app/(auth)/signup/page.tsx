
import { Metadata } from "next";
import SignUpClient from "./SignUpClient";
import { createClient } from "@/utils/supabase/server";

export const metadata:Metadata={
  title:"Sign up"
}


export default async function SignUpPage() {
  const supabase = createClient()
  const {data:profileEmail} = await supabase.from("profiles").select('email')
  const {data:profileUsername}= await supabase.from("profiles").select('username')


  return(
    <div>
      <SignUpClient profileEmail={profileEmail} profileUsername={profileUsername}/>
    </div>
  )
}
