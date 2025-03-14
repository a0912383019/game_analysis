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

export const apiHalls = (params: ParamsHalls) => {
  return apiGet<ParamsHalls, ResultHalls[]>('/api/auth/halls', params)
}

export const apiLobbies = (params: ParamsLobbies) => {
  return apiGet<ParamsLobbies, ResultLobbies[]>('/api/auth/lobbies', params)
}

export const apiLobbyGames = (params: ParamsLobbyGames) => {
  const { lobby_id } = params
  return apiGet<undefined, ResultLobbyGames[]>(`/api/auth/lobbies/${lobby_id}/games`)
}