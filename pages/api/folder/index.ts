import nc from 'next-connect'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { FolderModel } from '../../../db'
import { Request } from '../../../types'

import { NextApiResponse } from 'next'

const handler = nc({
  onError,
})

handler.use(middleware)

handler.get(async (req: Request, res: NextApiResponse) => {
  const folders = await FolderModel.getFolders(req.db, req.user.id)
  res.send(folders)
})

handler.post(async (req: Request, res: NextApiResponse) => {
  const newFolder = await FolderModel.createFolder(req.db, {
    createdBy: req.user.id,
    name: req.body.name,
  })
  res.send(newFolder)
})

export default handler
