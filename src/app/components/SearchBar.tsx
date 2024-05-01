"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MagnifyingGlassIcon} from '@heroicons/react/24/outline'

export default function SearchBar() {

    const router = useRouter()
    const [search,setSearch]=useState("")

    function handleSubmit(e:any) {
        e.preventDefault()
        router.push(`/?search=${search}`)
      }
  return (
    <form onSubmit={handleSubmit}>
        <label className='flex gap-1'>
        <input 
        className='border border-inputBorder p-2 rounded md:text-lg shadow text-base'
        type='text'
        value={search}
        placeholder='Search recipes'
        onChange={(e)=>setSearch(e.target.value)}/>
        <button className='flex items-center'>   
        <MagnifyingGlassIcon className="w-8 h-8"/>
        </button>    
        </label>
    </form>
  )
}
