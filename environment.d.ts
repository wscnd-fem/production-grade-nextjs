/* eslint no-unused-vars: 0 */
import type { MongoClient } from 'mongodb'

declare global {
  namespace NodeJS {
    interface Global {
      mongo: { client: MongoClient }
    }
    interface ProcessEnv {
      NODE_ENV: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      DATABASE_URL: string
      JWT_SECRET: string
      NEXT_PUBLIC_API_HOST: string
      NEXTAUTH_URL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
