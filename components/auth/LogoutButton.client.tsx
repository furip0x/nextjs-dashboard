'use client'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { signOut } from '@/lib/helpers/helpers'

interface Props {
  className?: string
  text?: string
}

const LogoutButton = ({ text, className }: Props) => {
  return (
    <Button className={cn(`${className}`)} onClick={async () => signOut()}>
      {text ? text : 'Logout'}
    </Button>
  )
}

export default LogoutButton
