import nc from 'next-connect'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import {  FolderModel } from '../../../db'
import { Request } from '../../../types'

import { NextApiResponse } from 'next'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.post(async (req: Request, res: NextApiResponse) => {
  const newFolder = await FolderModel.createFolder(req.db, {
    createdBy: req.user.id,
    name: req.body.name,
  })

  res.send({ data: newFolder })

})

export default handler;