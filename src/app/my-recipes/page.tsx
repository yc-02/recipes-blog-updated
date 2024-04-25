import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
        <Link href='/add' className="btn-secondary">Add Recipes</Link>
    </div>
    
  )
}
