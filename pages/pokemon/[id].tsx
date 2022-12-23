import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import { fetcher } from '@/utils/fetcher'

import type { GetServerSidePropsContext } from 'next'

const getURL = (pokemon: string) => `https://pokeapi.co/api/v2/pokemon/${pokemon}`

const PokemonPage: React.FC<{ fallbackData: any[], pokemon: string }> = ({
  fallbackData,
  pokemon
}) => {
  const { data } = useSWR(getURL(pokemon), fetcher, { fallbackData })

  return (
    <>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      <Link href='/infinite-scroll' className='fixed top-20 right-10 bg-blue-400 text-white rounded-full px-4 py-1'>
        Volver atrás
      </Link>
    </>
  )
}

export default PokemonPage

export const getServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  const id = params?.id as string
  try {
    const pokemonData = await fetcher(getURL(id))
    return {
      props: { fallbackData: pokemonData, pokemon: id }
    }
  } catch (e) {
    return { notFound: true }
  }
}
