import { createClient } from "@/utils/supabase/server"
import EditForm from "./EditForm"

export default async function EditPage({params}:{params:{id:string}}) {
    const supabase =createClient()
    const {data}= await supabase.from('recipes').select().eq('id',params.id).single()

    
  return (
    <EditForm recipe={data}/>
  )
}
