import React, { useRef, useEffect } from 'react'
import useOnScreen from '@/hooks/useOnScreen'
import { fetcher } from '@/utils/fetcher'
import useSWRInfinite from 'swr/infinite'
import Link from 'next/link'

import type { Pokemons } from '../utils/types'

const PAGE_SIZE = 20

const getKey = (
  pageIndex: number,
  previousPageData: { results: Pokemons[] },
  pageSize: number
) => {
  if (previousPageData && !previousPageData.results.length) return null // reached the end
  return `https://pokeapi.co/api/v2/pokemon/?offset=${pageIndex * 10}&limit=${pageSize}`
}

const getPokemonsData = (data?: Array<{ results: Pokemons[] }>) => {
  const arr: Pokemons[] = []
  data?.forEach(({ results }) => {
    return results ? arr.push(...results) : []
  })

  return arr
}

const InfiniteScroll: React.FC = () => {
  const ref = useRef(null)
  const isVisible = useOnScreen(ref)

  const { data, error, mutate, size, setSize, isLoading, isValidating } = useSWRInfinite(
    (...args) => getKey(...args, PAGE_SIZE),
    fetcher
  )

  const pokemons = getPokemonsData(data)
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && pokemons && typeof pokemons[size - 1] === 'undefined')

  const isEmpty = !isLoading && pokemons.length === 0
  const isReachingEnd = size === PAGE_SIZE
  const isRefreshing = isValidating && pokemons && pokemons.length === size

  useEffect(() => {
    if (isVisible && !isReachingEnd && !isRefreshing) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      setSize(size + 1)
    }
  }, [isVisible, isRefreshing])

  return (
    <div>
      <nav className='fixed top-0 w-full flex justify-between items-center px-10 py-2 border-b border-blue-300 backdrop-blur-md'>
        <p>
          Showing {size} page(s) of {isLoadingMore ? '...' : pokemons.length}{' '}
          Pokémons{' '}
        </p>
        <div>
        <button
          className='rounded-full mr-2 bg-blue-400 py-2 px-4 text-white'
          disabled={isRefreshing}
          onClick={async () => await mutate()}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
        <button
          className='rounded-full bg-blue-400 py-2 px-4 text-white'
          disabled={!size}
          onClick={async () => await setSize(0)}
        >
          Clear
        </button>
        </div>
      </nav>
      {isEmpty ? <p>Oops! No pokémons found.</p> : null}
      <ul className='px-8 py-2 mt-14'>
        {pokemons.map((pokemon: Pokemons) => {
          return (
            <li key={pokemon.name} className='my-2 h-14'>
              <Link href={`/pokemon/${pokemon.name}`} className='hover:text-blue-500 p-2 capitalize'>
                {pokemon.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <div ref={ref}>
        <span className='text-2xl text-red-500 px-10 pb-4'>
          {isLoadingMore && 'Loading...'}
          {isReachingEnd && 'No more pokémons'}
        </span>
      </div>
    </div>
  )
}

export default InfiniteScroll
