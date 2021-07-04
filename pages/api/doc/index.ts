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

handler.post(async (req: Request, res: NextApiResponse) => {
  const newDoc = await DocModel.createDoc(req.db, {
    folder: req.body._id,
    createdBy: req.user.id,
    name: req.body.name,
    content: req.body.content
  })

  res.send({ data: newDoc })
})

export default handler;