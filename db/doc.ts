import { Db } from 'mongodb'
import { nanoid } from 'nanoid'
import { Doc, Folder } from '../types'

export const getOneDoc = async (db: Db, id: string) => {
  return await db.collection<Doc>('docs').findOne({ _id: id })
}

export const getDocsByFolderId = async (db: Db, folderId: string) => {
  return await db.collection<Doc>('docs').find({ folder: folderId }).toArray()
}

export const createDoc = async (db: Db, doc: Doc) => {
  const newDoc = await db
    .collection<Folder>('docs')
    .insertOne({
      _id: nanoid(),
      ...doc,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops, ...rest }) => {
      // console.log('rest:', rest)
      console.log('ops:', ops)
      return ops[0]
    })

  return newDoc
}

export const updateOne = async (db: Db, id: string, updates: Omit<Partial<Doc>, '_id'>) => {
  await db.collection<Doc>('docs').updateOne({ _id: id }, { $set: updates })

  const doc = await db.collection<Doc>('docs').findOne({ _id: id })

  return doc
}
