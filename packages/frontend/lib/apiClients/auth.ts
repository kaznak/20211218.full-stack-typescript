import { apiClient } from 'lib/apiClients'
import type { AuthApiRequest } from 'lib/pages/api/auth'

export async function signIn(body: AuthApiRequest) {
  return apiClient.auth.$post({ body })
}

export async function signOut() {
  return apiClient.auth.$delete()
}
