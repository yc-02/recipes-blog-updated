"use client"
import Link from 'next/link'
import React, { useState } from 'react'

export default function Navbar() {
    const [open,setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open);
      };
  return (
    <div>
        <nav className="text-right">
            <div className="flex justify-between cursor-pointer  md:hidden" id="burger">
                <div>
                <h1 className="uppercase">
                <Link href="/" className="md:block">02 Recipes</Link>
                </h1>
                </div>
            <svg  onClick={toggle} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </div>
        <ul className={`${open? " absolute right-0 top-0 bg-white h-screen": "hidden md:block"}`} id="menu">
            <h1 className="font-bold uppercase p-4 hidden md:block">
                <Link href="/" className="md:block">02 Recipes</Link>
            </h1>
            <li className="font-bold py-1">
                <Link href="/" className="flex justify-end px-4">Home</Link>
            </li>
            <li>
            <Link href="/my-recipes" className="flex justify-end px-4 ">My Recipes</Link>
            </li>
            <li className="py-1">
                <Link href="/" className="flex justify-end px-4">About</Link>
            </li>
            <li className="py-1">
                <Link href="/" className="flex justify-end px-4 ">Contact</Link>
            </li>
        </ul>
    </nav>

    </div>
  )
}
