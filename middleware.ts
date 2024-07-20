import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  console.log('req.auth.user: ' + req.auth?.user?.email)

  const isAuthenticated = !!req.auth

  const protectedRoutes = ['/protected', '/private']
  const isProtectedRoute = protectedRoutes.some(
    (route) => nextUrl.pathname.includes(route)
    // or nextUrl.pathname.startsWith(route)
  )
  if (isProtectedRoute && !isAuthenticated)
    return Response.redirect(new URL('/auth/login', nextUrl))

  const authRoutes = ['/auth/login', 'auth/register']
  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.includes(route)
  )
  if (isAuthRoute && isAuthenticated)
    return Response.redirect(new URL('/private/dashboard', nextUrl))
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
