'use client'
import Link from 'next/link'
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

export default function SmScreenNav() {
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
  return (
    <div>
    <div className="md:hidden">
     <button onClick={toggleNav}>
        <Bars3Icon className="w-6 h-6"/>
      </button>
      <div className={`${showNav?'block':'hidden'}`}>
      <div className="absolute top-0 left-0 flex-col bg-white h-full w-1/2 flex items-end p-3 gap-3 z-10">
        <button onClick={toggleNav}><XMarkIcon className='w-6 h-6'/></button>
       <Link href="/" onClick={toggleNav}>Home</Link>
       <Link href="/about" onClick={toggleNav}>About</Link>
       <Link href="/contact" onClick={toggleNav}>Contact</Link>
      </div>
      <div className="absolute top-0 right-0 bg-black h-full w-1/2 opacity-15 z-10" onClick={()=>setShowNav(false)}/>
      </div>
    </div>

    </div>
  )
}
