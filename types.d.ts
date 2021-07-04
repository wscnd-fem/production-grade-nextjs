import 'next-auth'

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module 'next-auth/client' {
  export interface Session {
    id: string
  }
}