"use client"
import { useTransition } from "react"
import { deleteRecipeCard } from "../action"
import { TrashIcon} from '@heroicons/react/24/outline'

export default function DeleteButton({id}:{id:string}) {

    const [isPending,startTransition] =useTransition()
    return (
      <button
      onClick={()=>startTransition(()=>deleteRecipeCard(id))}
      disabled={isPending}
      >
        {isPending && (
          <span>
            Deleting....
          </span>
        )}
        {!isPending && (
          <span>
           <TrashIcon className="w-6 h-6 text-text"/>
          </span>
        )}
      </button>
    )
  }
