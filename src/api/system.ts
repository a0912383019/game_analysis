import { apiGet, apiPut } from './axiosGoInstance'
import {
  mockRelease,
  mockLogin,
  mockSidebar,
  mockHalls,
  mockLobbies,
  mockDevices,
  mockLobbyGamesProb,
  mockLobbyGamesLive,
  mockLobbyGamesCard,
  mockLobbyGamesFish,
  mockLobbyGamesLottery
} from '@/api/mock/system'

const useMock = import.meta.env.VITE_ENV === 'dev'

export const apiRelease = () => {
  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRelease), 300)
    })
  }

  return apiGet<undefined, undefined>('/api/release')
}

export const apiLogin = (params: ParamsLogin) => {
  if (useMock) {
    return new Promise<ApiResponse<ResultLoginData>>((resolve) => {
      setTimeout(() => resolve(mockLogin), 300)
    })
  }

  return apiPut<ParamsLogin, ResultLoginData>('/api/login_google', params)
}

export const apiGetSidebar = () => {
  if (useMock) {
    return new Promise<ApiResponse<ResultSidebar[]>>((resolve) => {
      setTimeout(() => resolve(mockSidebar), 300)
    })
  }

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
  if (useMock) {
    if (params.lobby_id === 5) {
      return new Promise<ApiResponse<ResultLobbyGames[]>>((resolve) => {
        setTimeout(() => resolve(mockLobbyGamesProb), 300)
      })
    }
    if (params.lobby_id === 3) {
      return new Promise<ApiResponse<ResultLobbyGames[]>>((resolve) => {
        setTimeout(() => resolve(mockLobbyGamesLive), 300)
      })
    }
    if (params.lobby_id === 66) {
      return new Promise<ApiResponse<ResultLobbyGames[]>>((resolve) => {
        setTimeout(() => resolve(mockLobbyGamesCard), 300)
      })
    }
    if (params.lobby_id === 38) {
      return new Promise<ApiResponse<ResultLobbyGames[]>>((resolve) => {
        setTimeout(() => resolve(mockLobbyGamesFish), 300)
      })
    }
    if (params.lobby_id === 12) {
      return new Promise<ApiResponse<ResultLobbyGames[]>>((resolve) => {
        setTimeout(() => resolve(mockLobbyGamesLottery), 300)
      })
    }
  }

  const { lobby_id } = params
  return apiGet<undefined, ResultLobbyGames[]>(`/api/auth/lobbies/${lobby_id}/games`)
}
