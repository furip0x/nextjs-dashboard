import NextAuth from 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user']
  }

  interface User {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    token: string
    refreshToken: string
  }
}
