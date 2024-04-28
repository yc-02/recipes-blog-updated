"use client"
import { usePathname, useRouter} from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { ChevronDownIcon, CheckIcon} from '@heroicons/react/24/outline'

export default function Sort({search,showSort,setShowSort}:{search:string|undefined,showSort:boolean,setShowSort:Dispatch<SetStateAction<boolean>>}) {
    const router = useRouter()
    const pathname = usePathname()
    
    const handleSortChange = (term:string) => {
      if(search){
        router.replace(`${pathname}?search=${search}&sort=${term.toString()}`)
      }else{
        router.replace(`${pathname}?sort=${term.toString()}`)
      }
      }
   const checkItems = ['Featured','Most Recent','Most Popular', 'Time used: Low to High']
   const [checked,setChecked] =useState<string|null>(null)
   const handleClick=(item:string)=>{
    setChecked(item)
    handleSortChange(item.toLowerCase().replace(/\s+/g, ''))
    setShowSort(false)
   }
  return (
    <div className="pr-6">
        <button className="flex gap-3" onClick={()=>setShowSort(!showSort)}>
        <p>{checked===null? 'Sort By':checked}</p>
        <ChevronDownIcon className="w-6 h-6"/>
        </button>
        <div className="relative">
        <div className={`absolute flex flex-col gap-1 right-1 top-3 w-64 p-3 bg-white rounded-md z-10 shadow-lg ${showSort?'block':'hidden'}`}>
            {checkItems.map(a=>(
                <div key={a}>
                <button className="flex items-center justify-start gap-1" onClick={()=>handleClick(a)}>
                <CheckIcon className={`w-5 h-5 ${checked===a?'text-inherit':'text-white'}`}/>
                <p className="text-start">{a}</p>
                </button>
                </div>

            ))}
        </div>
        </div>
    </div>
  )
}
