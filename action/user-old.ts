'use server'

import * as z from 'zod'
import { User, UserErrorResponse, UserSuccessResponse } from '@/types/api/user'
import { loginFormSchema } from '@/validations/loginFormSchema'
import { registerFormSchema } from '@/validations/registerFormSchema'

const onUserRegister = async (data: z.infer<typeof registerFormSchema>) => {
  const parsedForm = registerFormSchema.safeParse(data)

  if (!parsedForm.success) {
    const errorResponse: UserErrorResponse = {
      message: parsedForm.error.errors.map((err) => err.message).join(', '),
    }

    return { success: false, error: errorResponse }
  }

  try {
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
      }),
    })

    const resData = await response.json()

    if (!response.ok)
      return { success: false, error: resData as UserErrorResponse }

    return { success: true, data: resData as UserSuccessResponse }
  } catch (error) {
    console.log('Failed to get user', error)
    throw new Error('Failed to get user')
  }
}

const onUserLogin = async (
  data: z.infer<typeof loginFormSchema>
): Promise<User> => {
  const parsedForm = loginFormSchema.safeParse(data)

  if (!parsedForm.success) {
    const errorResponse: UserErrorResponse = {
      message: parsedForm.error.errors.map((err) => err.message).join(', '),
    }

    return { success: false, error: errorResponse }
  }

  try {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        expiresInMins: 30, // optional, defaults to 60
      }),
    })

    const resData = await response.json()

    if (!response.ok)
      return { success: false, error: resData as UserErrorResponse }

    return { success: true, data: resData as UserSuccessResponse }
  } catch (error) {
    console.log('Failed to get user', error)
    throw new Error('Failed to get user')
  }
}

export { onUserLogin, onUserRegister }
