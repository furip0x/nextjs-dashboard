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
import { registerFormSchema } from '@/validations/registerFormSchema'
import { useTransition } from 'react'
import { toast } from '../ui/use-toast'
import { onUserRegister } from '@/action/user'

const RegisterForm = () => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const form = useForm<z.output<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const handleSubmit = async (data: z.output<typeof registerFormSchema>) => {
    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('username', data.username)
        formData.append('email', data.email)
        formData.append('password', data.password)
        formData.append('confirmPassword', data.confirmPassword)

        const response = await onUserRegister(formData)

        if (!response.success) {
          toast({
            variant: 'destructive',
            description: response.error?.message,
          })
        } else {
          toast({
            variant: 'success',
            description: <p>{JSON.stringify(response, null, 2)}</p>,
          })
          toast({
            variant: 'warning',
            description: (
              <>
                <p>Adding a new user will not add it into the server.</p>
                <p>
                  It will simulate a POST request and will return the new
                  created user with a new id
                </p>
              </>
            ),
          })
          router.replace('/auth/login')
          form.reset()
        }
      } catch (error) {
        console.log(error)
        toast({
          variant: 'destructive',
          description: 'Error' + error,
        })
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Sign up by adding the info below</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      autoComplete="email"
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter confirm password"
                      autoComplete="new-password"
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
      </CardContent>
    </Card>
  )
}

export default RegisterForm
