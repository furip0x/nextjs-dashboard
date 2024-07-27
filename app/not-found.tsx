import { Frown } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex w-full h-screen flex-col items-center justify-center gap-2">
      <Frown className=" text-gray-400" size={40} />
      <h2 className="text-2xl font-semibold">404 Not Found</h2>
      <p className="text-lg">Page Not Found.</p>
      <Link
        href={'/'}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </main>
  )
}
