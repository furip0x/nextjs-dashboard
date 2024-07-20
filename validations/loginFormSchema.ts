import * as z from 'zod'

export const loginFormSchema = z.object({
  username: z.string().min(1, {
    message: 'Username is required',
  }),
  password: z.string().trim().min(1, {
    message: 'Password is required',
  }),
})
