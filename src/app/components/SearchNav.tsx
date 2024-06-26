import Link from 'next/link'
import SearchBar from './SearchBar';


export default async function SearchNav() {



  return (
      <div className='flex justify-between items-center px-6 py-5 md:px-12'>
        <Link href="/" className='primary-title'>Recipes Blog</Link>
        <SearchBar/>
    </div>

  )
}
