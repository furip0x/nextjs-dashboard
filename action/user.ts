'use server'

import { User, UserErrorResponse, UserSuccessResponse } from '@/types/api/user'
import { loginFormSchema } from '@/validations/loginFormSchema'
import { registerFormSchema } from '@/validations/registerFormSchema'
import { signIn } from '@/auth'

const onUserRegister = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries())
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
        username: parsedForm.data.username,
        email: parsedForm.data.email,
        password: parsedForm.data.password,
      }),
    })

    const resData = await response.json()

    if (!response.ok)
      return { success: false, error: resData as UserErrorResponse }

    return { success: true, data: resData as UserSuccessResponse }
  } catch (error) {
    console.log('Failed to add user', error)
    throw new Error('Failed to add user')
  }
}

const onUserLogin = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries())
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
        password: parsedForm.data.password,
        username: parsedForm.data.username,
        expiresInMins: 30, // optional, defaults to 60
      }),
    })

    const user = await response.json()

    if (!response.ok)
      return { success: false, error: user as UserErrorResponse }

    await signIn('credentials', {
      username: parsedForm.data.username,
      password: parsedForm.data.password,
      redirect: false,
    })

    return { success: true, data: user as UserSuccessResponse }
  } catch (error) {
    console.log('Failed to get user', error)
    throw new Error('Failed to get user')
  }
}

export { onUserLogin, onUserRegister }
