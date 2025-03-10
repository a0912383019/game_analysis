import { apiGet, apiPut } from './axiosGoInstance'

export const apiRelease = () => {
  return apiGet<undefined, undefined>('/api/release')
}

export const apiLogin = (params: ParamsLogin) => {
  return apiPut<ParamsLogin, ResultLoginData>('/api/login_google', params)
}

export const apiGetSidebar = () => {
  return apiGet<undefined, ResultSidebar[]>('/api/auth/menu/sidebar')
}
