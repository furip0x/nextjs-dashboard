'use client'

import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <div className="flex gap-1 mb-4">
        <ShieldAlert size={40} className="text-red-500" />
        <h2 className="text-4xl">Something went wrong!</h2>
      </div>
      <Button
        variant="secondary"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
