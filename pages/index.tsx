import Link from 'next/link'

export default function Home () {
  return (
    <div className='grid place-items-center h-screen'>
      <ul className='flex flex-col gap-2'>
        <li className='hover:text-blue-400 hover:underline'>
          <Link href='/global-fetcher'>
            Global fetcher
          </Link>
        </li>
        <li className='hover:text-blue-400 hover:underline'>
          <Link href='/refetch-interval'>
            Refetch interval
          </Link>
        </li>
        <li className='hover:text-blue-400 hover:underline'>
          <Link href='/focus-revalidate'>
            Focus revalidate
          </Link>
        </li>
        <li className='hover:text-blue-400 hover:underline'>
          <Link href='/infinite-scroll'>
            Infinite Scroll
          </Link>
        </li>
      </ul>
    </div>
  )
}
