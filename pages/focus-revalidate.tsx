import Image from 'next/image'
import React from 'react'
import useSWR from 'swr'
import { login, logout } from '@/utils/auth'
import { fetcher } from '@/utils/fetcher'

const Button: React.FC<any> = (props) => (
  <button className='bg-blue-400 rounded-full px-6 py-2 text-white' {...props} />
)

export default function Index () {
  const { data, mutate } = useSWR('/api/user', fetcher)

  if (!data) return <h1>loading...</h1>
  return (
    <div className='flex flex-col justify-center  items-center gap-4 h-screen'>
      {data.loggedIn
        ? (
          <>
            <h1>Welcome, {data.name}</h1>
            <Image className='rounded-full' alt='' src={data.avatar} width={80} height={80} />
            <Button onClick={async () => {
              logout()
              await mutate() // after logging in/out, we mutate the SWR
            }}>Logout</Button>
          </>)
        : (
          <>
            <h1>Please login</h1>
            <Button onClick={async () => {
              login()
              await mutate()
            }}>Login</Button>
          </>
          )}
    </div>
  )
}
