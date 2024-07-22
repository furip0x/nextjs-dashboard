import NextAuth, { NextAuthConfig, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import { authConfig } from './auth.config'
import { loginFormSchema } from './validations/loginFormSchema'

const authSettings: NextAuthConfig = {
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentails',
      credentials: {
        username: { label: 'Username', type: 'username' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        const validateFields = loginFormSchema.safeParse(credentials)

        if (validateFields.success) {
          const { username, password } = validateFields.data

          try {
            const response = await fetch('https://dummyjson.com/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username,
                password,
                expiresInMins: 30,
              }),
            })

            if (!response.ok) {
              throw new Error('Failed to authenticate user')
            }

            const user = await response.json()

            if (user) {
              return user
            } else {
              throw new Error('User not found')
            }
          } catch (error) {
            console.log('Err: ', error)
            throw new Error('Failed to get user')
          }
        }

        return null
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  // callbacks: {
  // Keeping these for future refence
  //   async jwt({ token, user }) {
  //     return { ...token, ...user }
  //   },
  //   async session({ session, token, user }) {
  //     session.user = token as any
  //     return session
  //   },
  // },
  callbacks: {
    // Handled in middleware
    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl
    //   if (pathname.includes('private')) return !!auth
    //   return true
    // },
    async jwt({ user, token }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }: any) {
      session.user = token.user
      return session
    },
  },
}
export const { handlers, auth, signIn, signOut } = NextAuth(authSettings)
