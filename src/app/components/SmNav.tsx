'use client'
import Link from 'next/link'
import { Bars3Icon, UserCircleIcon, XMarkIcon} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function SmNav({data,user}:{data: {
  avatar_url: any;
  username: any;
} | null,user:User|null}) {

    const [showNav,setShowNav]=useState(false)
    const toggleNav=()=>{
        setShowNav(!showNav)
    }
    useEffect(()=>{
        if(showNav){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = '';
        }
    },[showNav])
    const pathname = usePathname()
    const isActive = (href:string)=>pathname===href
  return (
    <>
    <div className="md:hidden">
     <button onClick={toggleNav}>
        <Bars3Icon className="w-6 h-6"/>
      </button>
      <div className={`${showNav?'block':'hidden'}`}>
      <div className="absolute top-0 left-0 flex-col bg-white h-full w-1/2 flex items-end p-3 gap-3 z-10">
        <button onClick={toggleNav}><XMarkIcon className='w-6 h-6'/></button>
       <Link href="/" onClick={toggleNav}>Home</Link>
       <Link href="/" onClick={toggleNav}>About</Link>
       <Link href="/" onClick={toggleNav}>Contact</Link>
      </div>
      <div className="absolute top-0 right-0 bg-black h-full w-1/2 opacity-15 z-10" onClick={()=>setShowNav(false)}/>
      </div>
    </div>
      
    <div className='flex gap-3 justify-between w-full items-center'>
      <div className='gap-3 items-center hidden md:flex'>
        <div className={`border-b-4 ${isActive('/')?' border-primary':'border-secondary'}`}>
          <Link href="/">Home</Link>
        </div>
        <div className='border-b-4 border-secondary'>
        <Link href="/">About</Link>
        </div>
        <div className='border-b-4 border-secondary'>
         <Link href="/">Contact</Link>
        </div>
       {/* <div className='border-b-4 border-white'>
       <Link href="/my-recipes">My Recipes</Link>
       </div>
       */}
     </div>
     <div className='flex w-full justify-end'>
     {!user?
        <Link  href='/login' className='flex items-center gap-2'>
          <UserCircleIcon className='w-6 h-6'/>
          <div className={`border-b-4 ${isActive('/login')?' border-primary':'border-secondary'}`}>
          <p>Log in</p>
          </div>
        </Link>:
        <Link href="/account" className="flex gap-2 items-center">
          <p>Hello, {user.user_metadata.username}</p>
          <div className='w-10 h-10 rounded-full overflow-hidden'>
          <Image src={data?.avatar_url} width={50} height={50} alt='image'/>
          </div>
        </Link>
        }
     </div>
    </div>
    </>
  )
}
          {/* <form action="/auth/signout" method="post" className="flex justify-center">
            <button type="submit" className="text-xs">Log out</button>
          </form> */}