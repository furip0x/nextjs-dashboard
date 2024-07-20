import { auth } from '@/auth'
import LogoutButton from '@/components/auth/LogoutButton.client'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'
import React from 'react'

const Home = async () => {
  const session = await auth()

  return (
    <>
      <div className="flex items-center justify-center min-h-screen w-full p-8 relative">
        <div className="text-center space-y-6 w-full min-w-0 max-w-[800px]">
          <h1 className="text-4xl">
            Preview Page, User:{' '}
            {session ? (
              session?.user.name ? (
                <b>{session.user.name}</b>
              ) : (
                <b>{session.user.username}</b>
              )
            ) : null}
          </h1>
          <div className="text-sm">
            {
              <pre className="break-words whitespace-pre-line">
                {JSON.stringify(session, null, 2)}
              </pre>
            }
          </div>
          <div className="flex flex-wrap gap-4 items-start">
            <div className="flex flex-col flex-1 gap-2">
              <Link
                href="/auth/login"
                className="px-3 py-2 bg-cyan-700 rounded-sm whitespace-nowrap text-white"
              >
                Login
              </Link>
              {session?.user && (
                <LogoutButton className="flex-1 px-3 py-2 bg-cyan-800 rounded-sm whitespace-nowrap text-white" />
              )}
            </div>
            <Link
              href="/auth/register"
              className="flex-1 px-3 py-2 bg-teal-700 rounded-sm text-foreground whitespace-nowrap text-white"
            >
              Register
            </Link>
            <Link
              href="/private/dashboard"
              className="flex-1 px-3 py-2 bg-slate-600 rounded-sm text-foreground whitespace-nowrap text-white"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
        <div className="absolute right-10 bottom-10 z-10">
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}

export default Home
