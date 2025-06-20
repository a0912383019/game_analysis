// export const mockRelease = () => {
//   return apiGet<undefined, undefined>('/api/release')
// }

// export const mockLogin = (params: ParamsLogin) => {
//   return apiPut<ParamsLogin, ResultLoginData>('/api/login_google', params)
// }

// export const mockSidebar = () => {
//   return apiGet<undefined, ResultSidebar[]>('/api/auth/menu/sidebar')
// }

export const mockHalls: ApiResponse<ResultHalls[]> = {
  result: 'success',
  ret: [
    {
      hall_id: 1,
      login_code: 'bmww',
      name: '寶馬天堂'
    },
    {
      hall_id: 5,
      login_code: 'livv',
      name: '淘金世界'
    },
    {
      hall_id: 6,
      login_code: 'esj',
      name: 'e世界'
    },
    {
      hall_id: 20,
      login_code: 'bb8',
      name: 'bbet8'
    },
    {
      hall_id: 21,
      login_code: 'pai',
      name: '利博大陸'
    },
    {
      hall_id: 23,
      login_code: '777',
      name: 'gaming777'
    },
    {
      hall_id: 26,
      login_code: 'g44',
      name: '博仁賺'
    },
    {
      hall_id: 32,
      login_code: 'bin',
      name: '測試-入門'
    }
  ]
}

export const mockLobbies: ApiResponse<ResultLobbies[]> = {
  result: 'success',
  ret: [
    {
      lobby: 5,
      lobby_name: 'CC電子',
      target: 3,
      target_name: '電子'
    },
    {
      lobby: 3,
      lobby_name: 'CC視訊',
      target: 2,
      target_name: '視訊'
    },
    {
      lobby: 66,
      lobby_name: 'CC棋牌',
      target: 6,
      target_name: '棋牌'
    },
    {
      lobby: 38,
      lobby_name: 'CC捕魚大師',
      target: 5,
      target_name: '捕魚'
    },
    {
      lobby: 12,
      lobby_name: 'CC彩票',
      target: 4,
      target_name: '彩票'
    }
  ]
}

export const mockDevices: ApiResponse<ResultDevices[]> = {
  result: 'success',
  ret: [
    {
      id: 0,
      name: 'PC',
      created_time: '2025-04-22T16:43:08+08:00'
    },
    {
      id: 1,
      name: '其他 (行動網頁版)',
      created_time: '2025-04-22T16:43:08+08:00'
    },
    {
      id: 2,
      name: 'iOS手機',
      created_time: '2025-04-22T16:43:08+08:00'
    },
    {
      id: 3,
      name: 'Android手機',
      created_time: '2025-04-22T16:43:08+08:00'
    },
    {
      id: 4,
      name: 'iOS平板',
      created_time: '2025-04-22T16:43:08+08:00'
    },
    {
      id: 5,
      name: 'Android平板',
      created_time: '2025-04-22T16:43:08+08:00'
    },
    {
      id: 6,
      name: 'Mac',
      created_time: '2025-04-22T16:43:08+08:00'
    }
  ]
}

// export const mockLobbyGames = (params: ParamsLobbyGames) => {
//   const { lobby_id } = params
//   return apiGet<undefined, ResultLobbyGames[]>(`/api/auth/lobbies/${lobby_id}/games`)
// }