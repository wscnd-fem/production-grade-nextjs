import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const route = req.query.route as string
  res.setPreviewData({})
  res.redirect(route)
}
