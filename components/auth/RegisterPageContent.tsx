'use client'

import LoginForm from '@/components/auth/LoginForm'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import RegisterForm from './RegisterForm'

const RegisterPageContent = () => {
  const router = useRouter()

  return (
    <div className="w-[400px] space-y-2">
      <div className="grid w-full grid-cols-2 bg-muted text-muted-foreground p-1 rounded-md">
        <Button
          variant="link"
          size="sm"
          className={cn(
            'block hover:no-underline text-muted-foreground px-3 py-1.5 rounded-sm'
          )}
          onClick={() => router.push('/auth/login')}
        >
          Log in
        </Button>
        <Button
          variant="link"
          size="sm"
          className={cn(
            'block hover:no-underline bg-background px-3 py-1.5 rounded-sm'
          )}
          onClick={() => router.push('/auth/register')}
        >
          Register
        </Button>
      </div>
      <RegisterForm />
    </div>
  )
}

export default RegisterPageContent
