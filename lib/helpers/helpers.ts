'use server'
import { BuiltInProviderType } from '@auth/core/providers'
import { signIn as naSignIn, signOut as naSignOut } from '../../auth'

export async function signIn(
  provider: BuiltInProviderType,
  redirectTo?: string
) {
  await naSignIn(provider, { redirectTo })
}

export async function signOut() {
  await naSignOut({ redirectTo: '/' })
}
