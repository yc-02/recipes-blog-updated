'use client'
import Link from 'next/link'
import { UserCircleIcon,ChevronDownIcon } from '@heroicons/react/24/outline'
import { User } from '@supabase/supabase-js'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import SmScreenNav from './SmScreenNav'
import SignoutButton from './SignoutButton'

export default function AuthNavClient({data,user}:{data: {
  avatar_url: string|null;
  username: string|null;
  } | null,
  user:User|null;
}) {

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
          <Link href="/" className='font-medium'>Home</Link>
        </div>
        <div className={`border-b-4 ${isActive('/about')?' border-primary':'border-secondary'}`}>
        <Link href="/about" className='font-medium'>About</Link>
        </div>
        <div className={`border-b-4 ${isActive('/contact')?' border-primary':'border-secondary'}`}>
         <Link href="/contact" className='font-medium'>Contact</Link>
        </div>
     </div>
      <div className='flex justify-end w-full'>
      {!user?
        <Link  href='/login' className='flex items-start gap-2'>
          <UserCircleIcon className='w-6 h-6'/>
          <div className={`border-b-4 ${isActive('/login')?' border-primary':'border-secondary'}`}>
          <p className='font-medium'>Sign in</p>
          </div>
        </Link>:
          <div className="dropbtn group relative min-w-40" onClick={()=>setShowDrop(!showDrop)} ref={buttonRef}>
            <div className='flex justify-between items-center w-full'>
            <p className='font-medium'>Hello, {data?.username?.slice(0,16)}</p>
            {data?.avatar_url!==null && data?.avatar_url!==undefined && 
            <div className='w-10 h-10 rounded-full overflow-hidden'>
           <Image src={data?.avatar_url} width={50} height={50} alt='image'/>
            </div>
           }
            </div>
          <ChevronDownIcon className='w-4 h-4'/>
          <div className={`dropdown-content ${showDrop?'flex':'hidden'}`}>
          <Link href='/add' className='dropdown-link'>Add Recipe</Link>
          <Link href='/profile' className='dropdown-link'>Profile</Link>
         <Link href={`/user-recipes/${data?.username}`} className='dropdown-link'>My Recipes</Link>
          <Link href='/favorites' className='dropdown-link'>My Favorites</Link>
          <SignoutButton/>
        </div>
        </div>
        }
      </div>
    </div>
    </>
  )
}
