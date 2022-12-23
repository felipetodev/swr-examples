// an endpoint for getting user info
import type { NextApiRequest, NextApiResponse } from 'next'

export default function user (req: NextApiRequest, res: NextApiResponse) {
  if (req.cookies['swr-test-token'] === 'swr') {
    // authorized
    res.json({
      loggedIn: true,
      name: '@felipetodev',
      avatar: 'https://github.com/felipetodev.png'
    })
    return
  }

  res.json({
    loggedIn: false
  })
}
