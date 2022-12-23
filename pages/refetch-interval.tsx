import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

export default function Index () {
  const { data, mutate }: { data: string[], mutate: () => void } = useSWR('/api/data', fetcher, {
    // revalidate data per 1s
    refreshInterval: 1000
  })
  const [value, setValue] = useState<string>('')

  if (!data) {
    return <h1 className='grid place-items-center h-screen text-2xl'>
    Loading...
    </h1>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValue('')
    await fetch(`/api/data?add=${value}`)
    mutate()
  }

  const handleClear = async () => {
    await fetch('/api/data?clear=1')
    mutate()
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div>
      <h1 className='text-2xl text-blue-400'>Refetch Interval (1s)</h1>
      <h2 className='text-xl text-blue-400'>Todo List:</h2>
      <form className='my-6' onSubmit={handleSubmit}>
        <input className='border border-blue-300 w-full p-2' placeholder='enter something' value={value} onChange={ev => setValue(ev.target.value)} />
        <span className='text-xs'>(hit enter to submit)</span>
      </form>
      <ul className='my-4'>
        {data.map(item => <li key={item}>{item}</li>)}
      </ul>
      <button className='bg-blue-300 rounded-lg py-2 px-6 text-white' onClick={handleClear}>
        Clear All
      </button>
    </div>
    </div>
  )
}
