import { useState } from 'react'
import useSWR, { mutate } from 'swr'

const initialStore = { name: 'felipetodev' }

const Profile: React.FC = () => {
  const { data } = useSWR<any>('globalState', { fallbackData: initialStore })

  const [value, updateValue] = useState<string>((data || {})?.name)
  if (!data) {
    return null
  }

  return (
    <div>
      <h1>My name is {data.name}.</h1>
      <input
        value={value}
        className='border border-blue-300 p-2 rounded-md'
        onChange={e => updateValue(e.target.value)}
        style={{ width: 200, marginRight: 8 }}
      />
      <button
        className="bg-blue-300 py-2 px-4 rounded-full text-white tracking-wider hover:bg-blue-400"
        type="button"
        onClick={async () => {
          await mutate('globalState', { ...data, name: value }, false)
        }}
      >
        Uppercase my name!
      </button>
    </div>
  )
}

const Other: React.FC = () => {
  const { data } = useSWR('globalState', { fallbackData: initialStore })
  if (!data) {
    return null
  }
  return (
    <div className='border border-blue-300 p-6 mt-10 rounded-lg'>
      <div className='flex flex-col'>
        <h1 className='text-blue-400 underline mb-1 font-bold'>
          {'<Another Component />'}
        </h1>
        <h1>My name is: {data.name}.</h1>
      </div>
    </div>
  )
}

export default function Home () {
  return (
    <div className='grid place-items-center h-screen'>
      <div className='flex flex-col'>
        <h1 className='text-blue-500 text-2xl mb-8'>
          useSWR share state between components:
        </h1>
        <Profile />
        <Other />
      </div>
    </div>
  )
}
