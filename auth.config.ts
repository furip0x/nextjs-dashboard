//A Note to my future self
// The edge runtime does not support Node.js [module name here] module.
// This is because the Edge runtime does not support certain Node.js modules.
// To tackle this, we’ll need to export an auth instance from our middleware file that doesn’t have a database adapter attached to it.
// We can do this by creating an auth.config.ts file that will hold an instance of the NextAuthConfig interface
// We can then initialize it in our middleware like so to effectively protect the /protected route:
import { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [],
}
