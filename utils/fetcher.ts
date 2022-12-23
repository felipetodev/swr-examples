export const fetcher = async (...args: any) => {
  const res = await fetch(args)
  return await res.json()
}
