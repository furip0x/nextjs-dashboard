import { passwordValidation } from '@/lib/utils'
import * as z from 'zod'

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .min(1, {
        message: 'Username is required',
      })
      .min(4, { message: 'Username should be at least 4 characters long' }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email({ message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(1, {
        message: 'Password is required',
      })
      // .min(4, { message: 'Password should be at least 4 characters long' })
      .regex(passwordValidation, {
        message:
          'Your password should contain minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      }),
    confirmPassword: z.string().min(1, {
      message: 'Confirm password is required',
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  )
