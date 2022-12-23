import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function App ({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Link
        className='fixed bottom-10 right-10 py-2 px-8 bg-blue-300 text-white rounded-full'
        href='/'
      >
        Volver
      </Link>
      <Component {...pageProps} />
    </div>
  )
}
