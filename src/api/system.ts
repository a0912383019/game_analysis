import { apiGet, apiPut } from './axiosGoInstance'

export const apiRelease = () => {
  return apiGet<undefined, undefined>('/api/release')
}

export const apiLogin = (params: LoginParams) => {
  return apiPut<LoginParams, ResultLoginData>('/api/login_google', params)
}
