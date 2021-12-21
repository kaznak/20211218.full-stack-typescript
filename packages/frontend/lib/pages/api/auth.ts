export type AuthInfo = {
  email: string
}

export type AuthApiRequest = AuthInfo

export type AuthApiResponse = {
  ok: boolean
  auth: AuthInfo
}
