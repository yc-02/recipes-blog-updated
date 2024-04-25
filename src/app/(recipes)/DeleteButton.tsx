"use client"
import { useTransition } from "react"
import { deleteRecipeCard } from "../action"

export default function DeleteButton({id}:{id:string}) {

    const [isPending,startTransition] =useTransition()
    return (
      <button
      className="button m-5"
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
            Delete
          </span>
        )}
      </button>
    )
  }
