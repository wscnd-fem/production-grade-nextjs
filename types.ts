import { Db, MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export interface PostFrontMatter {
  title: string
  summary: string
  publishedOn: string
}

export interface Post {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  frontMatter: PostFrontMatter
}

export interface UserSession {
  id: string
  image: string
  email: string
  name: string
}

export interface Folder {
  _id?: string
  name: string
  createdBy?: string
  createdAt?: string
}

export interface Doc {
  createdBy?: string
  _id?: string
  folder: string
  name: string
  content?: any
}

export interface Request extends NextApiRequest {
  db: Db
  dbClient: MongoClient
  user: { email: string; id: string }
  body: {
    _id?: string
    name: string
    createdBy: string
    content?: string
  }
  query: {
    id: string
  }
}
