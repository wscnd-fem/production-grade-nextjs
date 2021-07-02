import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.clearPreviewData()
  res.send('preview mode cleared')
}
