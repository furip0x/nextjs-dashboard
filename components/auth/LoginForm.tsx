'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { onUserLogin } from '@/action/user'
import { useTransition } from 'react'
import { toast } from '../ui/use-toast'
import { loginFormSchema } from '@/validations/loginFormSchema'
import { Separator } from '../ui/separator'
import { signIn } from '@/lib/helpers/helpers'
import { Google, Github } from '../Icons'

const LoginForm = () => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const form = useForm<z.output<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: z.output<typeof loginFormSchema>) => {
    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('password', data.password)

        const response = await onUserLogin(formData)

        if (!response.success) {
          toast({
            variant: 'destructive',
            description: response.error?.message,
          })
        } else {
          toast({
            variant: 'success',
            description: 'Login successful',
          })
          router.push('/')
        }
      } catch (e) {
        console.log(e)
        toast({
          variant: 'destructive',
          description: 'Check your credentials',
        })
      }
    })
  }

  return (
    <Card className="relative">
      <Card className="absolute -left-full border-r-0 translate-x-[31%] top-32">
        <CardHeader>
          <CardDescription className="flex flex-col text-lg">
            <span>Username: emilys</span>
            <span className="mb-2">Password: emilyspass</span>
            <span>or any other user from:</span>
            <a
              href="https://dummyjson.com/users"
              className="text-blue-500 underline"
              target="_blank"
            >
              https://dummyjson.com/users
            </a>
          </CardDescription>
        </CardHeader>
      </Card>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>
          Log in to your account with your credentials.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            // action={(formData) => signIn('credentials', formData)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full dark:bg-slate-800 dark:text-white"
              disabled={pending}
            >
              Login
            </Button>
          </form>
        </Form>
        <div className="flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">
            OR CONTINUE WITH
          </span>
          <Separator className="flex-1" />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => signIn('google', '/private/dashboard')}
          >
            <Google className="mr-2 w-4 h-4 dark:text-white" />
            Google
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => signIn('github', '/private/dashboard')}
          >
            <Github className="mr-2 w-4 h-4 dark:text-white" />
            Github
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm
