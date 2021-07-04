import { Db } from 'mongodb'

export const getUserById = async (db: Db, id: string) => {
  return await db.collection('users').findOne({ _id: id })
}
