import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ThemeToggle from './ThemeToggle'
import { auth } from '@/auth'
import LogoutButton from './auth/LogoutButton.client'
import getSession from '@/lib/helpers/getSession'

const Navbar = async () => {
  const session = await getSession()
  const user = session?.user

  return (
    <header className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <Link
        href="/private/dashboard"
        className="w-10 h-10 rounded-full overflow-hidden relative"
      >
        <Image
          src="/img/logo.jpeg"
          fill
          alt="Logo"
          className="object-fill"
          sizes="40px"
        />
      </Link>
      <div className="flex gap-2">
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage
                src={user?.image || 'https://github.com/shadcn.png'}
                alt={user?.name || 'avatar'}
              />
              <AvatarFallback className="text-black">
                {user?.name
                  ? user?.name?.substring(0, 2)
                  : user?.username.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {user?.name ? user?.name : user?.username}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/private/dashboard/profile" className="flex-1">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogoutButton className="flex-1 justify-start text-sm p-0 h-auto bg-transparent text-black dark:text-white hover:bg-transparent" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Navbar
