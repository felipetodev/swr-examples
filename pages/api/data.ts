// an simple endpoint for getting current list
import type { NextApiRequest, NextApiResponse } from 'next'
let list: string[] = []

export default function api (req: NextApiRequest, res: NextApiResponse) {
  console.log({ revalidating: '1s' })
  if (req.query.add) {
    list.push(req.query.add as string)
  } else if (req.query.clear) {
    list = []
  }
  res.status(200).json(list)
}
