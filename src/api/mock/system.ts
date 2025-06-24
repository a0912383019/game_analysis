export const mockRelease = ` [ServiceName] dev-game-backend
 [Build-Time] 0612_1553
 [CommitID] 12c5785e
[Docker-Image] asia-docker.pkg.dev/gcp-family-004/bi-family/backend_golang_game:dev_0612_1553 `

export const mockLogin: ApiResponse<ResultLoginData> = {
  result: 'success',
  ret: {
    access_token: 'fake token',
    token_type: 'bearer',
    expires_in: 21600,
    email: 'yu_lan@mail.family.net',
    name: 'Family-Yu',
    picture:
      'https://lh3.googleusercontent.com/a/ACg8ocLERxVooBGvI1jWxkiCNh5D8KI06P5TXWh5iEy8_1pdHVPorfk=s96-c'
  }
}

export const mockSidebar: ApiResponse<ResultSidebar[]> = {
  result: 'success',
  ret: [
    {
      title: 'home',
      route: '/home'
    },
    {
      title: 'operations',
      route: '/operations',
      submenu: [
        {
          title: 'overall_report',
          route: '/operations/overall-report'
        },
        {
          title: 'operation_analysis',
          route: '/operations/operation-analysis'
        },
        {
          title: 'device_difference',
          route: '/operations/device-difference'
        },
        {
          title: 'bet_search',
          route: '/operations/bet-search'
        },
        {
          title: 'game_comparison',
          route: '/operations/game-comparison'
        }
      ]
    },
    {
      title: 'video_reports',
      route: '/video-reports',
      submenu: [
        {
          title: 'table_reports',
          route: '/video-reports/table-reports'
        }
      ]
    }
  ]
}

export const mockHalls: ApiResponse<ResultHalls[]> = {
  result: 'success',
  ret: [
    {
      hall_id: 1,
      login_code: 'mw',
      name: '音樂天堂'
    },
    {
      hall_id: 5,
      login_code: 'liv',
      name: '淘心世界'
    },
    {
      hall_id: 6,
      login_code: 'esj',
      name: 'e電音'
    },
    {
      hall_id: 23,
      login_code: '777',
      name: 'music777'
    }
  ]
}

export const mockLobbies: ApiResponse<ResultLobbies[]> = {
  result: 'success',
  ret: [
    {
      lobby: 5,
      lobby_name: 'max影音',
      target: 3,
      target_name: '影音'
    },
    {
      lobby: 3,
      lobby_name: 'max直播',
      target: 2,
      target_name: '直播'
    },
    {
      lobby: 66,
      lobby_name: 'max電子書',
      target: 6,
      target_name: '電子書'
    },
    {
      lobby: 38,
      lobby_name: 'max AR/VR',
      target: 5,
      target_name: 'AR/VR'
    },
    {
      lobby: 12,
      lobby_name: 'max Podcast',
      target: 4,
      target_name: 'Podcast'
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

export const mockLobbyGamesProb: ApiResponse<ResultLobbyGames[]> = {
  result: 'success',
  ret: [
    {
      game_code: '5001',
      game_name: '影音A',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5002',
      game_name: '影音B',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5003',
      game_name: '影音C',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5004',
      game_name: '影音D',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5005',
      game_name: '影音E',
      enable: 1,
      serial_info: []
    }
  ]
}
export const mockLobbyGamesLive: ApiResponse<ResultLobbyGames[]> = {
  result: 'success',
  ret: [
    {
      game_code: '3001',
      game_name: '百大10秒體驗',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: 'A'
        },
        {
          serial_type: 2,
          serial_name: 'B'
        },
        {
          serial_type: 3,
          serial_name: 'C'
        },
        {
          serial_type: 4,
          serial_name: 'D'
        }
      ]
    },
    {
      game_code: '3002',
      game_name: '直播A',
      enable: 0,
      serial_info: []
    }
  ]
}
export const mockLobbyGamesCard: ApiResponse<ResultLobbyGames[]> = {
  result: 'success',
  ret: [
    {
      game_code: '66000',
      game_name: '電子書A',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66001',
      game_name: '電子書B',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66002',
      game_name: '電子書C',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66003',
      game_name: '電子書D',
      enable: 1,
      serial_info: []
    }
  ]
}
export const mockLobbyGamesFish: ApiResponse<ResultLobbyGames[]> = {
  result: 'success',
  ret: [
    {
      game_code: '38001',
      game_name: 'AR-1',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '38002',
      game_name: 'AR-2',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '38003',
      game_name: 'VR-1',
      enable: 1,
      serial_info: []
    }
  ]
}
export const mockLobbyGamesLottery: ApiResponse<ResultLobbyGames[]> = {
  result: 'success',
  ret: [
    {
      game_code: 'AHQ3',
      game_name: 'POD-1',
      enable: 0,
      serial_info: []
    },
    {
      game_code: 'B128',
      game_name: 'POD-2',
      enable: 1,
      serial_info: []
    }
  ]
}
