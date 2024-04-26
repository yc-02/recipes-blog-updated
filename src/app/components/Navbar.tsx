import Link from 'next/link'
import SearchBar from './SearchBar';
import { createClient } from '@/utils/supabase/server';

export default async function Navbar() {
  const supabase = createClient()
  const {data:{user}}= await supabase.auth.getUser()


  return (
      <div className='flex justify-between items-center px-12 py-5'>
        <Link href="/" className='bg-primary text-white rounded-full h-20 w-20 items-center text-center justify-center flex'>02 Recipes</Link>
        <SearchBar/>
    </div>

  )
}
