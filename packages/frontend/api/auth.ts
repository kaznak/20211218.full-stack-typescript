import { AuthApiRequest, AuthApiResponse } from 'lib/pages/api/auth'

export type Methods = {
  get: {
    resBody: AuthApiResponse
  }
  post: {
    reqBody: AuthApiRequest
    resBody: AuthApiResponse
  }
  delete: {
    resBody: AuthApiResponse
  }
}
