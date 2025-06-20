import { apiGet, apiPut } from './axiosGoInstance'
import { mockHalls, mockLobbies, mockDevices } from '@/api/mock/system'

const useMock = import.meta.env.VITE_ENV === 'local'

export const apiRelease = () => {
  return apiGet<undefined, undefined>('/api/release')
}

export const apiLogin = (params: ParamsLogin) => {
  return apiPut<ParamsLogin, ResultLoginData>('/api/login_google', params)
}

export const apiGetSidebar = () => {
  return apiGet<undefined, ResultSidebar[]>('/api/auth/menu/sidebar')
}

export const apiHalls = (params: ParamsHalls) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultHalls[]>>((resolve) => {
      setTimeout(() => resolve(mockHalls), 300)
    })
  }

  return apiGet<ParamsHalls, ResultHalls[]>('/api/auth/halls', params)
}

export const apiLobbies = (params: ParamsLobbies) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultLobbies[]>>((resolve) => {
      setTimeout(() => resolve(mockLobbies), 300)
    })
  }

  return apiGet<ParamsLobbies, ResultLobbies[]>('/api/auth/lobbies', params)
}

export const apiDevices = (params: ParamsDevices) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultDevices[]>>((resolve) => {
      setTimeout(() => resolve(mockDevices), 300)
    })
  }

  return apiGet<ParamsDevices, ResultDevices[]>('/api/auth/devices', params)
}

export const apiLobbyGames = (params: ParamsLobbyGames) => {
  const { lobby_id } = params
  return apiGet<undefined, ResultLobbyGames[]>(`/api/auth/lobbies/${lobby_id}/games`)
}
