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
    name: 'BI-Family-Yu_Lan',
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
        // {
        //   title: 'regional_difference',
        //   route: '/operations/regional-difference'
        // },
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
    // {
    //   title: 'risk_control',
    //   route: '/risk-control',
    //   submenu: [
    //     {
    //       title: 'high_profit_members',
    //       route: '/risk-control/high-profit-members'
    //     },
    //     {
    //       title: 'risk_behavior',
    //       route: '/risk-control/risk-behavior'
    //     }
    //   ]
    // },
    // {
    //   title: 'members',
    //   route: '/members',
    //   submenu: [
    //     {
    //       title: 'member_analysis',
    //       route: '/members/member-analysis'
    //     },
    //     {
    //       title: 'member_tags',
    //       route: '/members/member-tags'
    //     }
    //   ]
    // },
    // {
    //   title: 'electronic_reports',
    //   route: '/electronic-reports',
    //   submenu: [
    //     {
    //       title: 'game_risk',
    //       route: '/electronic-reports/game-risk'
    //     },
    //     {
    //       title: 'jackpot_stats',
    //       route: '/electronic-reports/jackpot-stats'
    //     },
    //     {
    //       title: 'page_load_time',
    //       route: '/electronic-reports/page-load-time'
    //     }
    //   ]
    // },
    {
      title: 'video_reports',
      route: '/video-reports',
      submenu: [
        // {
        //   title: 'game_risk',
        //   route: '/video-reports/game-risk'
        // },
        {
          title: 'table_reports',
          route: '/video-reports/table-reports'
        }
      ]
    }
    // {
    //   title: 'user_management',
    //   route: '/user-management',
    //   submenu: [
    //     {
    //       title: 'account_list',
    //       route: '/user-management/account-list'
    //     },
    //     {
    //       title: 'role_list',
    //       route: '/user-management/role-list'
    //     },
    //     {
    //       title: 'menu_management',
    //       route: '/user-management/menu-management'
    //     }
    //   ]
    // }
  ]
}

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

export const mockLobbyGamesProb: ApiResponse<ResultLobbyGames[]> = {
  result: 'success',
  ret: [
    {
      game_code: '5001',
      game_name: '水果拉霸',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5002',
      game_name: '撲克拉霸',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5003',
      game_name: '筒子拉霸',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5004',
      game_name: '足球拉霸',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5005',
      game_name: '惑星戰記',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '5006',
      game_name: 'Staronic',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '5007',
      game_name: '激爆水果盤',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5008',
      game_name: '猴子爬樹',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '5009',
      game_name: '金剛爬樓',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '5010',
      game_name: '外星戰記',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '5011',
      game_name: '西遊記',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '5012',
      game_name: '外星爭霸',
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
      game_name: '百家樂',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '莊'
        },
        {
          serial_type: 2,
          serial_name: '閒'
        },
        {
          serial_type: 3,
          serial_name: '和'
        },
        {
          serial_type: 4,
          serial_name: '莊對'
        },
        {
          serial_type: 5,
          serial_name: '閒對'
        },
        {
          serial_type: 6,
          serial_name: '大'
        },
        {
          serial_type: 7,
          serial_name: '小'
        },
        {
          serial_type: 12,
          serial_name: '任意對子'
        },
        {
          serial_type: 13,
          serial_name: '完美對子'
        },
        {
          serial_type: 14,
          serial_name: '莊(免傭)'
        },
        {
          serial_type: 15,
          serial_name: '超級六(免傭)'
        },
        {
          serial_type: 16,
          serial_name: '莊天牌'
        },
        {
          serial_type: 17,
          serial_name: '閒天牌'
        },
        {
          serial_type: 18,
          serial_name: '天牌'
        },
        {
          serial_type: 19,
          serial_name: '莊龍寶'
        },
        {
          serial_type: 20,
          serial_name: '閒龍寶'
        },
        {
          serial_type: 21,
          serial_name: '莊單'
        },
        {
          serial_type: 22,
          serial_name: '閒單'
        },
        {
          serial_type: 23,
          serial_name: '莊雙'
        },
        {
          serial_type: 24,
          serial_name: '閒雙'
        },
        {
          serial_type: 25,
          serial_name: '幸運6'
        },
        {
          serial_type: 26,
          serial_name: '超級對'
        },
        {
          serial_type: 27,
          serial_name: '莊對組合'
        },
        {
          serial_type: 28,
          serial_name: '閒對組合'
        },
        {
          serial_type: 29,
          serial_name: '虎'
        },
        {
          serial_type: 30,
          serial_name: '龍'
        }
      ]
    },
    {
      game_code: '3002',
      game_name: '二八槓',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '3003',
      game_name: '龍虎鬥',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '虎'
        },
        {
          serial_type: 2,
          serial_name: '龍'
        },
        {
          serial_type: 3,
          serial_name: '和'
        },
        {
          serial_type: 4,
          serial_name: '虎單'
        },
        {
          serial_type: 5,
          serial_name: '虎雙'
        },
        {
          serial_type: 6,
          serial_name: '龍單'
        },
        {
          serial_type: 7,
          serial_name: '龍雙'
        },
        {
          serial_type: 8,
          serial_name: '虎黑'
        },
        {
          serial_type: 9,
          serial_name: '虎紅'
        },
        {
          serial_type: 10,
          serial_name: '龍黑'
        },
        {
          serial_type: 11,
          serial_name: '龍紅'
        }
      ]
    },
    {
      game_code: '3005',
      game_name: '三公',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '閒1贏'
        },
        {
          serial_type: 2,
          serial_name: '閒1輸'
        },
        {
          serial_type: 3,
          serial_name: '閒1和'
        },
        {
          serial_type: 4,
          serial_name: '閒1三公'
        },
        {
          serial_type: 5,
          serial_name: '閒1對牌以上'
        },
        {
          serial_type: 6,
          serial_name: '閒2贏'
        },
        {
          serial_type: 7,
          serial_name: '閒2輸'
        },
        {
          serial_type: 8,
          serial_name: '閒2和'
        },
        {
          serial_type: 9,
          serial_name: '閒2三公'
        },
        {
          serial_type: 10,
          serial_name: '閒2對牌以上'
        },
        {
          serial_type: 11,
          serial_name: '閒3贏'
        },
        {
          serial_type: 12,
          serial_name: '閒3輸'
        },
        {
          serial_type: 13,
          serial_name: '閒3和'
        },
        {
          serial_type: 14,
          serial_name: '閒3三公'
        },
        {
          serial_type: 15,
          serial_name: '閒3對牌以上'
        },
        {
          serial_type: 16,
          serial_name: '莊對牌以上'
        }
      ]
    },
    {
      game_code: '3006',
      game_name: '溫州牌九',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '順門贏'
        },
        {
          serial_type: 2,
          serial_name: '順門輸'
        },
        {
          serial_type: 3,
          serial_name: '出門贏'
        },
        {
          serial_type: 4,
          serial_name: '出門輸'
        },
        {
          serial_type: 5,
          serial_name: '到門贏'
        },
        {
          serial_type: 6,
          serial_name: '到門輸'
        }
      ]
    },
    {
      game_code: '3008',
      game_name: '骰寶',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '大/小(小)'
        },
        {
          serial_type: 2,
          serial_name: '大/小(大)'
        },
        {
          serial_type: 4,
          serial_name: '點數/4點'
        },
        {
          serial_type: 5,
          serial_name: '點數/5點'
        },
        {
          serial_type: 6,
          serial_name: '點數/6點'
        },
        {
          serial_type: 7,
          serial_name: '點數/7點'
        },
        {
          serial_type: 8,
          serial_name: '點數/8點'
        },
        {
          serial_type: 9,
          serial_name: '點數/9點'
        },
        {
          serial_type: 10,
          serial_name: '點數/10點'
        },
        {
          serial_type: 11,
          serial_name: '點數/11點'
        },
        {
          serial_type: 12,
          serial_name: '點數/12點'
        },
        {
          serial_type: 13,
          serial_name: '點數/13點'
        },
        {
          serial_type: 14,
          serial_name: '點數/14點'
        },
        {
          serial_type: 15,
          serial_name: '點數/15點'
        },
        {
          serial_type: 16,
          serial_name: '點數/16點'
        },
        {
          serial_type: 17,
          serial_name: '點數/17點'
        },
        {
          serial_type: 18,
          serial_name: '短牌(1,2)'
        },
        {
          serial_type: 19,
          serial_name: '短牌(1,3)'
        },
        {
          serial_type: 20,
          serial_name: '短牌(1,4)'
        },
        {
          serial_type: 21,
          serial_name: '短牌(1,5)'
        },
        {
          serial_type: 22,
          serial_name: '短牌(1,6)'
        },
        {
          serial_type: 23,
          serial_name: '短牌(2,3)'
        },
        {
          serial_type: 24,
          serial_name: '短牌(2,4)'
        },
        {
          serial_type: 25,
          serial_name: '短牌(2,5)'
        },
        {
          serial_type: 26,
          serial_name: '短牌(2,6)'
        },
        {
          serial_type: 27,
          serial_name: '短牌(3,4)'
        },
        {
          serial_type: 28,
          serial_name: '短牌(3,5)'
        },
        {
          serial_type: 29,
          serial_name: '短牌(3,6)'
        },
        {
          serial_type: 30,
          serial_name: '短牌(4,5)'
        },
        {
          serial_type: 31,
          serial_name: '短牌(4,6)'
        },
        {
          serial_type: 32,
          serial_name: '短牌(5,6)'
        },
        {
          serial_type: 33,
          serial_name: '長牌(1,1)'
        },
        {
          serial_type: 34,
          serial_name: '長牌(2,2)'
        },
        {
          serial_type: 35,
          serial_name: '長牌(3,3)'
        },
        {
          serial_type: 36,
          serial_name: '長牌(4,4)'
        },
        {
          serial_type: 37,
          serial_name: '長牌(5,5)'
        },
        {
          serial_type: 38,
          serial_name: '長牌(6,6)'
        },
        {
          serial_type: 39,
          serial_name: '圍骰(1,1,1)'
        },
        {
          serial_type: 40,
          serial_name: '圍骰(2,2,2)'
        },
        {
          serial_type: 41,
          serial_name: '圍骰(3,3,3)'
        },
        {
          serial_type: 42,
          serial_name: '圍骰(4,4,4)'
        },
        {
          serial_type: 43,
          serial_name: '圍骰(5,5,5)'
        },
        {
          serial_type: 44,
          serial_name: '圍骰(6,6,6)'
        },
        {
          serial_type: 45,
          serial_name: '全圍'
        },
        {
          serial_type: 46,
          serial_name: '三軍(1)'
        },
        {
          serial_type: 47,
          serial_name: '三軍(2)'
        },
        {
          serial_type: 48,
          serial_name: '三軍(3)'
        },
        {
          serial_type: 49,
          serial_name: '三軍(4)'
        },
        {
          serial_type: 50,
          serial_name: '三軍(5)'
        },
        {
          serial_type: 51,
          serial_name: '三軍(6)'
        },
        {
          serial_type: 52,
          serial_name: '單/雙(單)'
        },
        {
          serial_type: 53,
          serial_name: '單/雙(雙)'
        }
      ]
    },
    {
      game_code: '3010',
      game_name: '德州撲克',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '3011',
      game_name: '色碟',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '四白'
        },
        {
          serial_type: 2,
          serial_name: '四紅'
        },
        {
          serial_type: 3,
          serial_name: '三白一紅'
        },
        {
          serial_type: 4,
          serial_name: '三紅一白'
        },
        {
          serial_type: 5,
          serial_name: '單'
        },
        {
          serial_type: 6,
          serial_name: '雙'
        },
        {
          serial_type: 7,
          serial_name: '大'
        },
        {
          serial_type: 8,
          serial_name: '小'
        }
      ]
    },
    {
      game_code: '3012',
      game_name: '牛牛',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '閒1平倍'
        },
        {
          serial_type: 2,
          serial_name: '閒1翻倍'
        },
        {
          serial_type: 3,
          serial_name: '閒1預扣額度'
        },
        {
          serial_type: 4,
          serial_name: '閒2平倍'
        },
        {
          serial_type: 5,
          serial_name: '閒2翻倍'
        },
        {
          serial_type: 6,
          serial_name: '閒2預扣額度'
        },
        {
          serial_type: 7,
          serial_name: '閒3平倍'
        },
        {
          serial_type: 8,
          serial_name: '閒3翻倍'
        },
        {
          serial_type: 9,
          serial_name: '閒3預扣額度'
        }
      ]
    },
    {
      game_code: '3041',
      game_name: '區塊鏈搶莊牛牛',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '莊家'
        },
        {
          serial_type: 2,
          serial_name: '閒1'
        },
        {
          serial_type: 3,
          serial_name: '閒2'
        },
        {
          serial_type: 4,
          serial_name: '閒3'
        }
      ]
    },
    {
      game_code: '3043',
      game_name: '區塊鏈21點百家樂',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '莊'
        },
        {
          serial_type: 2,
          serial_name: '閒'
        },
        {
          serial_type: 3,
          serial_name: '和'
        },
        {
          serial_type: 6,
          serial_name: '莊20'
        },
        {
          serial_type: 7,
          serial_name: '閒20'
        },
        {
          serial_type: 8,
          serial_name: '莊BJ'
        },
        {
          serial_type: 9,
          serial_name: '閒BJ'
        },
        {
          serial_type: 10,
          serial_name: '超級21'
        },
        {
          serial_type: 11,
          serial_name: '莊龍寶'
        },
        {
          serial_type: 12,
          serial_name: '閒龍寶'
        },
        {
          serial_type: 13,
          serial_name: '虎'
        },
        {
          serial_type: 14,
          serial_name: '龍'
        },
        {
          serial_type: 15,
          serial_name: '莊爆牌'
        },
        {
          serial_type: 16,
          serial_name: '閒爆牌'
        },
        {
          serial_type: 17,
          serial_name: '莊單'
        },
        {
          serial_type: 18,
          serial_name: '閒單'
        },
        {
          serial_type: 19,
          serial_name: '莊雙'
        },
        {
          serial_type: 20,
          serial_name: '閒雙'
        },
        {
          serial_type: 21,
          serial_name: '莊對組合'
        },
        {
          serial_type: 22,
          serial_name: '閒對組合'
        },
        {
          serial_type: 23,
          serial_name: '任意對子'
        },
        {
          serial_type: 24,
          serial_name: '完美對子'
        }
      ]
    },
    {
      game_code: '3047',
      game_name: '21點百家樂',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '莊'
        },
        {
          serial_type: 2,
          serial_name: '閒'
        },
        {
          serial_type: 3,
          serial_name: '和'
        },
        {
          serial_type: 6,
          serial_name: '莊20'
        },
        {
          serial_type: 7,
          serial_name: '閒20'
        },
        {
          serial_type: 8,
          serial_name: '莊BJ'
        },
        {
          serial_type: 9,
          serial_name: '閒BJ'
        },
        {
          serial_type: 10,
          serial_name: '超級21'
        },
        {
          serial_type: 11,
          serial_name: '莊龍寶'
        },
        {
          serial_type: 12,
          serial_name: '閒龍寶'
        },
        {
          serial_type: 13,
          serial_name: '虎'
        },
        {
          serial_type: 14,
          serial_name: '龍'
        },
        {
          serial_type: 15,
          serial_name: '莊爆牌'
        },
        {
          serial_type: 16,
          serial_name: '閒爆牌'
        },
        {
          serial_type: 17,
          serial_name: '莊單'
        },
        {
          serial_type: 18,
          serial_name: '閒單'
        },
        {
          serial_type: 19,
          serial_name: '莊雙'
        },
        {
          serial_type: 20,
          serial_name: '閒雙'
        },
        {
          serial_type: 21,
          serial_name: '莊對組合'
        },
        {
          serial_type: 22,
          serial_name: '閒對組合'
        },
        {
          serial_type: 23,
          serial_name: '任意對子'
        },
        {
          serial_type: 24,
          serial_name: '完美對子'
        }
      ]
    },
    {
      game_code: '3048',
      game_name: '區塊鏈射龍門',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '射中'
        },
        {
          serial_type: 2,
          serial_name: '撞柱'
        },
        {
          serial_type: 3,
          serial_name: '不中'
        },
        {
          serial_type: 4,
          serial_name: '紅'
        },
        {
          serial_type: 5,
          serial_name: '黑'
        },
        {
          serial_type: 6,
          serial_name: '大'
        },
        {
          serial_type: 7,
          serial_name: '小'
        },
        {
          serial_type: 8,
          serial_name: '單'
        },
        {
          serial_type: 9,
          serial_name: '雙'
        }
      ]
    },
    {
      game_code: '3049',
      game_name: '區塊鏈安達巴哈',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: 'ANDAR'
        },
        {
          serial_type: 2,
          serial_name: 'BAHAR'
        }
      ]
    },
    {
      game_code: '3050',
      game_name: '區塊鏈28百家樂',
      enable: 1,
      serial_info: [
        {
          serial_type: 1,
          serial_name: '莊'
        },
        {
          serial_type: 2,
          serial_name: '閒'
        },
        {
          serial_type: 3,
          serial_name: '莊對'
        },
        {
          serial_type: 4,
          serial_name: '閒對'
        },
        {
          serial_type: 5,
          serial_name: '鱉十'
        },
        {
          serial_type: 6,
          serial_name: '白板組合'
        }
      ]
    }
  ]
}
export const mockLobbyGamesCard: ApiResponse<ResultLobbyGames[]> = {
  result: 'success',
  ret: [
    {
      game_code: '66000',
      game_name: '遊戲大廳',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66001',
      game_name: '炸金花',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66002',
      game_name: '二八槓',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66003',
      game_name: '通比牛牛',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66004',
      game_name: '搶莊牛牛',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66005',
      game_name: '大話骰',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66006',
      game_name: '看三張搶莊牛牛',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66007',
      game_name: '看四張搶莊牛牛',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66008',
      game_name: '新炸金花',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66009',
      game_name: '新鬥地主',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66010',
      game_name: '新十三水',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66011',
      game_name: '新德州撲克',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66024',
      game_name: '新十點半',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66025',
      game_name: '新百家樂',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66026',
      game_name: '新二八杠',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66027',
      game_name: '新龍虎鬥',
      enable: 0,
      serial_info: []
    },
    {
      game_code: '66038',
      game_name: '搶莊三公',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66047',
      game_name: '海底派對',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66048',
      game_name: '單人海底派對',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66049',
      game_name: '西遊爭霸',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66050',
      game_name: '21點',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66051',
      game_name: '金鯊銀鯊',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66052',
      game_name: '區塊鏈二八杠',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66053',
      game_name: '區塊鏈搶莊牛牛',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66054',
      game_name: '區塊鏈大小7',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66055',
      game_name: '區塊鏈色碟',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66056',
      game_name: '區塊鏈魚蝦蟹',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66057',
      game_name: '區塊鏈番攤',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66058',
      game_name: '單人金鯊銀鯊',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66059',
      game_name: '區塊鏈百人牛牛',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66060',
      game_name: '搶錢紅包',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66061',
      game_name: '奔馳寶馬',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66062',
      game_name: '單人奔馳寶馬',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66063',
      game_name: '百家樂',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66064',
      game_name: '捕魚大亨',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '66065',
      game_name: '區塊鏈百家樂',
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
      game_name: '捕魚大師',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '38002',
      game_name: '富貴漁場',
      enable: 1,
      serial_info: []
    },
    {
      game_code: '38003',
      game_name: '捕魚達人',
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
      game_name: '安徽快3',
      enable: 0,
      serial_info: []
    },
    {
      game_code: 'B128',
      game_name: 'BB 幸運28',
      enable: 1,
      serial_info: []
    },
    {
      game_code: 'B1E5',
      game_name: 'BB 11選5',
      enable: 1,
      serial_info: []
    },
    {
      game_code: 'B1PK',
      game_name: 'BB 北京PK拾',
      enable: 1,
      serial_info: []
    },
    {
      game_code: 'B1Q3',
      game_name: 'BB 快3',
      enable: 1,
      serial_info: []
    },
    {
      game_code: 'ZD-BBZD-1',
      game_name: 'BB 福來運轉',
      enable: 0,
      serial_info: []
    },
    {
      game_code: 'ZD-LGZD-1630033472',
      game_name: 'BB 福來運轉',
      enable: 0,
      serial_info: []
    },
    {
      game_code: 'ZD-SSZD-1607563275',
      game_name: 'BB 生肖秒秒彩',
      enable: 0,
      serial_info: []
    }
  ]
}
