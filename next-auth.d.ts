/* eslint no-unused-vars: 0 */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
  }

  interface Session {
    expires: string
    user: User
  }
}
