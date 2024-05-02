import { createClient } from "@/utils/supabase/server"
import EditForm from "./EditForm"
import { redirect } from "next/navigation"

export default async function EditPage({params}:{params:{id:string}}) {
    const supabase =createClient()
    const {data:{user}} = await supabase.auth.getUser()
    const {data}= await supabase.from('recipes').select().eq('id',params.id).eq('user_id',user?.id).single()
    if(!user){
      redirect('/login')
    }else if(data === null){
      redirect('/')
    }
   
  return (
    <EditForm recipe={data}/>
  )
}
