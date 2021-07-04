import nc from 'next-connect'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { DocModel } from '../../../db'
import { Request } from '../../../types'

import { NextApiResponse } from 'next'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.put(async (req: Request, res: NextApiResponse) => {
  const updatedDoc = await DocModel.updateOne(req.db, req.query.id, req.body)

  res.send({ data: updatedDoc })
})

export default handler;