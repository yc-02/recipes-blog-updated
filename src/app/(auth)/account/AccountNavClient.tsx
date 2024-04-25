"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image';
import { User } from '@supabase/supabase-js';

export default function AccountNavClient({data}:{data: {
    avatar_url: any;
    username: any;
} | null}) {
    const pathname = usePathname()
    const isActive = (href:string)=>pathname===href
    console.log(pathname)
  return (
    <>
        <div className='flex gap-3 items-center justify-center'>
        <div className={`border-b-4 ${isActive('/account')?' border-primary':'border-white'}`}>
        <Link href='/account'>Account</Link>
        </div>
        <div className={`border-b-4 ${isActive('/account/profile')?' border-primary':'border-white'}`}>
        <Link href='/account/profile'>Profile</Link>
        </div>
        <div className={`border-b-4 ${isActive('/account/my-recipes')?' border-primary':'border-white'}`}>
        <Link href='/account/my-recipes'>My Recipes</Link>
        </div>
        <div className={`border-b-4 ${isActive('/add')?' border-primary':'border-white'}`}>
        <Link href='/add'>Add Recipe</Link>
        </div>
    </div>
        <div className='flex flex-col gap-3 items-center'>
        {pathname!=='/account/profile'&& pathname!=='/add'&&
        <>
         <div className='w-32 h-32 rounded-full overflow-hidden'>
            <Image src={data?.avatar_url} width={150} height={150} alt='image' className='object-cover'/>
         </div>
            <p>Hello {data?.username}</p>
        </>
         }
       </div>
    </>

  )
}
