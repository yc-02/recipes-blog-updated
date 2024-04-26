'use client'
import Link from 'next/link'
import { UserCircleIcon,ChevronDownIcon } from '@heroicons/react/24/outline'
import { User } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import SmScreenNav from './smScreenNav'
import { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react'

export default function AuthNavClient({data,user}:{data: {
  avatar_url: string|null;
  username: string|null;
} | null,user:User|null}) {

    const pathname = usePathname()
    const isActive = (href:string)=>pathname===href
    const [showDrop,setShowDrop] =useState(false)
    const buttonRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      const handleClickOutside = (event:MouseEvent) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
          setShowDrop(false);
        }
      };
  
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
    
  return (
    <>      
    <SmScreenNav/>
    <div className='flex gap-3 justify-between w-full items-center'>
      <div className='gap-3 items-center hidden md:flex w-full'>
        <div className={`border-b-4 ${isActive('/')?' border-primary':'border-secondary'}`}>
          <Link href="/">Home</Link>
        </div>
        <div className='border-b-4 border-secondary'>
        <Link href="/">About</Link>
        </div>
        <div className='border-b-4 border-secondary'>
         <Link href="/">Contact</Link>
        </div>
     </div>
      <div className='flex justify-end w-full'>
      {!user?
        <Link  href='/login' className='flex items-center gap-2'>
          <UserCircleIcon className='w-6 h-6'/>
          <div className={`border-b-4 ${isActive('/login')?' border-primary':'border-secondary'}`}>
          <p>Log in</p>
          </div>
        </Link>:
          <div className="dropbtn group relative" onClick={()=>setShowDrop(!showDrop)} ref={buttonRef}>
          <p>Hello, {data?.username}</p>
          {data?.avatar_url!==null && data?.avatar_url!==undefined && 
          <div className='w-10 h-10 rounded-full overflow-hidden'>
          <Image src={data?.avatar_url} width={50} height={50} alt='image'/>
          </div>
          }
          <ChevronDownIcon className='w-4 h-4'/>
          <div className={`dropdown-content ${showDrop?'flex':'hidden'}`}>
          <Link href='/add' className='dropdown-link'>Add Recipe</Link>
          <Link href='/account/profile' className='dropdown-link'>Profile</Link>
         <Link href='/account/my-recipes' className='dropdown-link'>My Recipes</Link>
          <Link href='/account/favorites' className='dropdown-link'>My Favorites</Link>
          <form action="/auth/signout" method="post" className='dropdown-link'>
          <button type="submit" className="text-xs">Log out</button>
        </form> 
        </div>
        </div>
        }
      </div>
    </div>
    </>
  )
}
