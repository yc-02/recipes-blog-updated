import Link from 'next/link'
import SearchBar from './SearchBar';

export default function Navbar() {


  return (
      <div className='flex justify-between items-center px-6 py-3 border-b-2'>
        <Link href="/" className='bg-primary text-white rounded-full h-20 w-20 items-center text-center justify-center flex'>02 Recipes</Link>
        <SearchBar/>
    </div>

  )
}
