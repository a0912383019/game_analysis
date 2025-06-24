// 視訊列表
export const mockLiveStates: ApiResponse<ResultLiveStates[]> = {
  result: 'success',
  ret: [
    {
      state: 0,
      state_name: '影音現場',
      table_data: [
        {
          table_no: 1,
          table_name: 'A',
          table_id: '0_1'
        }
      ]
    },
    {
      state: 1,
      state_name: '電子書簽名會場',
      table_data: [
        {
          table_no: 1,
          table_name: 'BC1',
          table_id: '1_1'
        },
        {
          table_no: 2,
          table_name: 'BC2',
          table_id: '1_2'
        },
        {
          table_no: 148,
          table_name: 'BC148',
          table_id: '1_148'
        },
        {
          table_no: 149,
          table_name: 'BC149',
          table_id: '1_149'
        },
        {
          table_no: 150,
          table_name: 'BC150',
          table_id: '1_150'
        }
      ]
    },
    {
      state: 11,
      state_name: '直播現場',
      table_data: [
        {
          table_no: 1,
          table_name: 'AS1',
          table_id: '11_1'
        },
        {
          table_no: 2,
          table_name: 'AS1',
          table_id: '11_2'
        },
        {
          table_no: 5,
          table_name: 'AS1',
          table_id: '11_5'
        },
        {
          table_no: 82,
          table_name: 'AS1',
          table_id: '11_82'
        },
        {
          table_no: 83,
          table_name: 'AS2',
          table_id: '11_83'
        },
        {
          table_no: 84,
          table_name: 'AS3',
          table_id: '11_84'
        },
        {
          table_no: 85,
          table_name: 'AS4',
          table_id: '11_85'
        },
        {
          table_no: 86,
          table_name: 'AS5',
          table_id: '11_86'
        }
      ]
    },
    {
      state: 13,
      state_name: 'Podcast 現場',
      table_data: [
        {
          table_no: 4,
          table_name: 'MX1',
          table_id: '13_4'
        },
        {
          table_no: 6,
          table_name: 'MX1',
          table_id: '13_6'
        },
        {
          table_no: 9,
          table_name: 'MX1',
          table_id: '13_9'
        },
        {
          table_no: 77,
          table_name: 'MX1',
          table_id: '13_77'
        },
        {
          table_no: 78,
          table_name: 'MX2',
          table_id: '13_78'
        },
        {
          table_no: 79,
          table_name: 'MX3',
          table_id: '13_79'
        },
        {
          table_no: 80,
          table_name: 'MX4',
          table_id: '13_80'
        },
        {
          table_no: 81,
          table_name: 'MX5',
          table_id: '13_81'
        }
      ]
    }
  ]
}

// 視訊現場
export const mockLiveTableReportsByState: ApiResponse<ResultLiveTableReportsByState> = {
  result: 'success',
  ret: {
    data: [
      {
        state: 1,
        state_name: '影音現場',
        user_count: 1,
        wagers_total: 17,
        bet_amount: '665.0000',
        payoff: '128.8000',
        payoff_ratio: '0.1937'
      },
      {
        state: 13,
        state_name: '電子書簽名會場',
        user_count: 7,
        wagers_total: 114,
        bet_amount: '59591.0000',
        payoff: '-2987.5000',
        payoff_ratio: '-0.0501'
      },
      {
        state: 7,
        state_name: '直播現場',
        user_count: 1,
        wagers_total: 29,
        bet_amount: '5550.0000',
        payoff: '-640.0000',
        payoff_ratio: '-0.1153'
      },
      {
        state: 11,
        state_name: 'Podcast 現場',
        user_count: 8,
        wagers_total: 57,
        bet_amount: '8420.0000',
        payoff: '1635.0000',
        payoff_ratio: '0.1942'
      }
    ],
    total: {
      user_count: 17,
      wagers_total: 217,
      bet_amount: '74226.0000',
      payoff: '-1863.7000',
      payoff_ratio: '-0.0251'
    }
  }
}

export const mockLiveTableReportsByTable: ApiResponse<ResultLiveTableReportsByTable> = {
  result: 'success',
  ret: {
    data: [
      {
        table_name: 'BC4',
        game_name: 'Spotify百大10秒體驗',
        user_count: 1,
        wagers_total: 8,
        bet_amount: '330.0000',
        payoff: '-159.6000',
        payoff_ratio: '-0.4836'
      },
      {
        table_name: 'BC3',
        game_name: 'Spotify百大10秒體驗',
        user_count: 3,
        wagers_total: 15,
        bet_amount: '2660.0000',
        payoff: '2060.0000',
        payoff_ratio: '0.7744'
      },
      {
        table_name: 'BC3',
        game_name: 'Spotify流行',
        user_count: 1,
        wagers_total: 1,
        bet_amount: '100.0000',
        payoff: '100.0000',
        payoff_ratio: '1.0000'
      },
      {
        table_name: 'BC2',
        game_name: 'Spotify百大10秒體驗',
        user_count: 2,
        wagers_total: 5,
        bet_amount: '110.0000',
        payoff: '-20.0000',
        payoff_ratio: '-0.1818'
      },
      {
        table_name: 'BC2',
        game_name: 'Spotify百大10秒體驗',
        user_count: 2,
        wagers_total: 3,
        bet_amount: '307.0000',
        payoff: '-83.0000',
        payoff_ratio: '-0.2704'
      },
      {
        table_name: 'BC2',
        game_name: 'Spotify風景介紹',
        user_count: 2,
        wagers_total: 3,
        bet_amount: '240.0000',
        payoff: '-200.0000',
        payoff_ratio: '-0.8333'
      },
      {
        table_name: 'BC2',
        game_name: 'SpotifyHiLo',
        user_count: 1,
        wagers_total: 2,
        bet_amount: '300.0000',
        payoff: '300.0000',
        payoff_ratio: '1.0000'
      },
      {
        table_name: 'BC2',
        game_name: 'Spotify越南星閃閃',
        user_count: 1,
        wagers_total: 2,
        bet_amount: '80.0000',
        payoff: '0',
        payoff_ratio: '0'
      },
      {
        table_name: 'BC2',
        game_name: 'Spotify泰國網紅介紹',
        user_count: 1,
        wagers_total: 1,
        bet_amount: '200.0000',
        payoff: '200.0000',
        payoff_ratio: '1.0000'
      },
      {
        table_name: 'BC1',
        game_name: 'Spotify百大10秒體驗',
        user_count: 6,
        wagers_total: 11,
        bet_amount: '50200626.0000',
        payoff: '-49978424.0000',
        payoff_ratio: '-0.9956'
      },
      {
        table_name: 'BC1',
        game_name: 'Spotify美食介紹',
        user_count: 2,
        wagers_total: 2,
        bet_amount: '600.0000',
        payoff: '400.0000',
        payoff_ratio: '0.6667'
      },
      {
        table_name: 'BC1',
        game_name: 'Spotify戰爭紀錄',
        user_count: 1,
        wagers_total: 1,
        bet_amount: '200.0000',
        payoff: '200.0000',
        payoff_ratio: '1.0000'
      },
      {
        table_name: 'BC1',
        game_name: 'Spotify演算法解釋',
        user_count: 1,
        wagers_total: 2,
        bet_amount: '400.0000',
        payoff: '400.0000',
        payoff_ratio: '1.0000'
      },
      {
        table_name: 'BC1',
        game_name: 'SpotifyHiLo',
        user_count: 1,
        wagers_total: 29,
        bet_amount: '9800.0000',
        payoff: '-2022.0000',
        payoff_ratio: '-0.2063'
      },
      {
        table_name: 'BC1',
        game_name: 'Spotify日本旅遊',
        user_count: 1,
        wagers_total: 1,
        bet_amount: '200.0000',
        payoff: '-62.0000',
        payoff_ratio: '-0.3100'
      }
    ]
  }
}
