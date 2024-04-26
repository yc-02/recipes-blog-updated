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
        className='shadow border border-border p-2 rounded'
        type='text'
        value={search}
        placeholder='Search recipes'
        onChange={(e)=>setSearch(e.target.value)}/>
        <button className='flex items-center'>   
        <MagnifyingGlassIcon className="w-7 h-7"/>
        </button>    
        </label>
    </form>
  )
}
