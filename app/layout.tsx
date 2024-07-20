import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/ThemeProvider'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Next Dashboard',
  description: 'Admin dashboard',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
              storageKey="dashboard-theme"
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
