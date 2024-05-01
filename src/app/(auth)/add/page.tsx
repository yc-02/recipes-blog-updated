import { Metadata } from "next";
import AddClient from "./AddClient";
import { createClient } from "@/utils/supabase/server";

export const metadata:Metadata={
  title:"Add Recipe"
}

export default async function AddPage() {
  const supabase = createClient()
  const {data:{user}} = await supabase.auth.getUser()
  return (
    <>
        {user ?
      <AddClient/>
      :
      <div className="flex items-center justify-center p-12 font-semibold">
        <p className="capitalize">Please Sign in first to add Recipe.</p>
      </div>
    }
    </>
  )
}
