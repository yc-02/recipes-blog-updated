import Link from 'next/link'
import SearchBar from './SearchBar';


export default async function SearchNav() {



  return (
      <div className='flex justify-between items-center px-12 py-5'>
        <Link href="/" className='primary-title'>
          <span>02</span>Recipes</Link>
        <SearchBar/>
    </div>

  )
}
