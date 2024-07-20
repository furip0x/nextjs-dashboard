export interface UserSuccessResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
  refreshToken: string
}

export interface UserErrorResponse {
  message: string
}

export type User =
  | { success: true; data: UserSuccessResponse }
  | { success: false; error: UserErrorResponse }
