import { Db } from 'mongodb'
import { nanoid } from 'nanoid'
import { Folder } from '../types'

export const createFolder = async (db: Db, folder: Folder) => {
  const newFolder = db
    .collection<Folder>('folders')
    .insertOne({
      _id: nanoid(),
      ...folder,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops, ...rest }) => {
      console.log('rest:', rest)
      console.log('ops:', ops)
      return ops[0]
    })

  return newFolder
}

export const getFolders = async (db: Db, userId: string) => {
  console.log('Db connection', Db)
  return db.collection<Folder>('folders').find({ createdBy: userId }).toArray()
}
