// 總報表
// 取得投注報表（by 遊戲）
export const mockBetReportByGame: ApiResponse<ResultBetReportByGame> = {
  result: 'success',
  ret: {
    data: [
      {
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        user_count: 1,
        wager_count: 6,
        bet_amount: '2880.0000',
        payoff: '2880.0000',
        payoff_ratio: '1.0000',
        rtp: '0',
        expected_rtp: '0.8257',
        base_win_wager_count: 0,
        base_lose_wager_count: 6,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0'
      },
      {
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5268',
        game_name: '百搭雙星',
        user_count: 1,
        wager_count: 3,
        bet_amount: '1440.0000',
        payoff: '662.4000',
        payoff_ratio: '0.4600',
        rtp: '0.5400',
        expected_rtp: '1.0380',
        base_win_wager_count: 1,
        base_lose_wager_count: 2,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0.3333'
      }
    ],
    records_total: 2
  }
}

// 取得投注報表（by 廳主）
export const mockBetReportByHall: ApiResponse<ResultBetReportByHall> = {
  result: 'success',
  ret: {
    data: [
      {
        hall_id: 3820051,
        hall_name: '至尊國際',
        login_code: 'zz',
        user_count: 2,
        wager_count: 77,
        bet_amount: '4265.0000',
        payoff: '2296.0000',
        payoff_ratio: '0.5383',
        rtp: '0.4617',
        base_win_wager_count: 4,
        base_lose_wager_count: 73,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0.0519'
      },
      {
        hall_id: 3820026,
        hall_name: '瑞博-廳名',
        login_code: 'rb',
        user_count: 3,
        wager_count: 15,
        bet_amount: '5678.0000',
        payoff: '3298.0000',
        payoff_ratio: '0.5808',
        rtp: '0.4192',
        base_win_wager_count: 5,
        base_lose_wager_count: 10,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0.3333'
      },
      {
        hall_id: 6,
        hall_name: 'Esball-1',
        login_code: 'esx',
        user_count: 3,
        wager_count: 637,
        bet_amount: '56742.5000',
        payoff: '31245.5000',
        payoff_ratio: '0.5507',
        rtp: '0.4493',
        base_win_wager_count: 81,
        base_lose_wager_count: 556,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0.1272'
      },
      {
        hall_id: 3820050,
        hall_name: 'BBIN',
        login_code: 'bbi',
        user_count: 1,
        wager_count: 7,
        bet_amount: '42.0000',
        payoff: '36.0000',
        payoff_ratio: '0.8571',
        rtp: '0.1429',
        base_win_wager_count: 0,
        base_lose_wager_count: 7,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0'
      }
    ],
    records_total: 4
  }
}

// 取得投注報表（by 遊戲大廳）
export const mockBetReportByLobby: ApiResponse<ResultBetReportByLobby> = {
  result: 'success',
  ret: {
    data: [
      {
        lobby: 5,
        lobby_name: 'BB電子',
        user_count: 1,
        wager_count: 9,
        bet_amount: '4320.0000',
        payoff: '3542.4000',
        payoff_ratio: '0.8200'
      }
    ],
    records_total: 1
  }
}

// 取得投注報表（by 會員）
export const mockBetReportByUser: ApiResponse<ResultBetReportByUser> = {
  result: 'success',
  ret: {
    data: [
      {
        user_id: '457600348',
        user_name: 'idrnathan1',
        wager_count: 9,
        bet_amount: '4320.0000',
        payoff: '3542.4000',
        payoff_ratio: '0.8200',
        base_win_wager_count: 8,
        base_lose_wager_count: 8,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0.1111',
        rtp: '0.1800'
      },
      {
        user_id: '457591348',
        user_name: 'qacathy040',
        wager_count: 5,
        bet_amount: '1352.0000',
        payoff: '-250.4000',
        payoff_ratio: '-0.1852',
        base_win_wager_count: 1,
        base_lose_wager_count: 1,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0.8000',
        rtp: '1.1852'
      },
      {
        user_id: '457597092',
        user_name: 'vndnathan1',
        wager_count: 1,
        bet_amount: '6.0000',
        payoff: '6.0000',
        payoff_ratio: '1.0000',
        base_win_wager_count: 1,
        base_lose_wager_count: 1,
        free_win_wager_count: 0,
        free_lose_wager_count: 0,
        win_ratio: '0',
        rtp: '0'
      }
    ],
    records_total: 3
  }
}

// 取得視訊投注報表（by 遊戲玩法）
export const mockBetReportLiveBySerialType: ApiResponse<ResultBetReportLiveBySerialType> = {
  result: 'success',
  ret: {
    data: [
      {
        lobby: 3,
        lobby_name: 'BB視訊',
        game_code: '3001',
        game_name: '百家樂',
        serial_type: '2',
        serial_type_name: '閒',
        odds: '1.0000',
        user_count: 1,
        wager_count: 1,
        bet_amount: '500.0000',
        payoff: '500.0000',
        payoff_ratio: '1.0000',
        rtp: '0',
        expected_rtp: '0.9876',
        serial_type_wager_count_ratio: '1.0000',
        serial_type_payoff_ratio: '1.0000'
      },
      {
        lobby: 3,
        lobby_name: 'BB視訊',
        game_code: '3007',
        game_name: '輪盤',
        serial_type: '151',
        serial_type_name: '紅/黑(紅)',
        odds: '1.0000',
        user_count: 1,
        wager_count: 1,
        bet_amount: '500.0000',
        payoff: '-500.0000',
        payoff_ratio: '-1.0000',
        rtp: '2.0000',
        expected_rtp: '0.9730',
        serial_type_wager_count_ratio: '1.0000',
        serial_type_payoff_ratio: '1.0000'
      }
    ],
    records_total: 2
  }
}

// 取得投注報表（by 日期）
export const mockBetReportByDate: ApiResponse<ResultBetReportByDate> = {
  result: 'success',
  ret: {
    data: [
      {
        data_date: '2025-06-22',
        user_count: 8,
        wager_count: 660,
        bet_amount: '62512.5000',
        payoff: '34621.5000',
        payoff_ratio: '0.5538'
      },
      {
        data_date: '2025-06-21',
        user_count: 1,
        wager_count: 76,
        bet_amount: '4215.0000',
        payoff: '2254.0000',
        payoff_ratio: '0.5348'
      }
    ],
    records_total: 2
  }
}

// 會員注單查詢 [注單]
export const mockBetRecords: ApiResponse<ResultBetRecords> = {
  result: 'success',
  ret: {
    data: [
      {
        wager_id: '5200008853329',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:57+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '1600.0000',
        payoff: '1280.0000',
        payoff_ratio: '0.8000',
        result: 1
      },
      {
        wager_id: '5200008853318',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:47+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '1600.0000',
        payoff: '-17600.0000',
        payoff_ratio: '-11.0000',
        result: 1
      },
      {
        wager_id: '5200008853316',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:45+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '1600.0000',
        payoff: '0',
        payoff_ratio: '0',
        result: 1
      },
      {
        wager_id: '5200008853312',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:44+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '1600.0000',
        payoff: '1600.0000',
        payoff_ratio: '1.0000',
        result: 1
      },
      {
        wager_id: '5200008853307',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:42+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '1600.0000',
        payoff: '1600.0000',
        payoff_ratio: '1.0000',
        result: 1
      },
      {
        wager_id: '5200008853289',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:28+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '6.0000',
        payoff: '6.0000',
        payoff_ratio: '1.0000',
        result: 1
      },
      {
        wager_id: '5200008853279',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:16+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '0',
        payoff: '0',
        payoff_ratio: null,
        result: 1
      },
      {
        wager_id: '5200008853280',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:16+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '0',
        payoff: '-960.0000',
        payoff_ratio: null,
        result: 1
      },
      {
        wager_id: '5200008853278',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:16+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '0',
        payoff: '-3200.0000',
        payoff_ratio: null,
        result: 1
      },
      {
        wager_id: '5200008853276',
        hall_id: 6,
        bet_time: '2025-06-03T11:00:16+08:00',
        user_id: '455808258',
        username: 'nathan1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5153',
        game_name: '九尾狐',
        bet_amount: '0',
        payoff: '-960.0000',
        payoff_ratio: null,
        result: 1
      }
    ],
    records_total: 221
  }
}

// 會員注單查詢 [結算日期]
export const mockBetSettledByDate: ApiResponse<ResultBetSettledByDate> = {
  result: 'success',
  ret: {
    data: [
      {
        hall_id: 6,
        settle_date: '2025-06-20',
        user_id: '457599842',
        username: 'fxtim1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5096',
        game_name: '五行',
        bet_amount: '25.0000',
        payoff: '25.0000',
        payoff_ratio: '1.0000'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-20',
        user_id: '457600490',
        username: 'mikeusd',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5171',
        game_name: '糖果派對-極速版',
        bet_amount: '19731.2500',
        payoff: '12721.2750',
        payoff_ratio: '0.6447'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-20',
        user_id: '457600490',
        username: 'mikeusd',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5274',
        game_name: '財富宙升',
        bet_amount: '7.1750',
        payoff: '7.1750',
        payoff_ratio: '1.0000'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-19',
        user_id: '457599842',
        username: 'fxtim1',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5261',
        game_name: '招財喵喵',
        bet_amount: '408.0000',
        payoff: '180.0000',
        payoff_ratio: '0.4412'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-19',
        user_id: '456520864',
        username: 'hope02',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5222',
        game_name: '瘋狂果醬罐',
        bet_amount: '3500.0000',
        payoff: '965.0000',
        payoff_ratio: '0.2757'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-19',
        user_id: '457600490',
        username: 'mikeusd',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5311',
        game_name: '翻轉神廟',
        bet_amount: '161.4375',
        payoff: '-1943.3488',
        payoff_ratio: '-12.0378'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-19',
        user_id: '455650272',
        username: 'rmb14',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5247',
        game_name: '無限1024',
        bet_amount: '40000.0000',
        payoff: '8448.0000',
        payoff_ratio: '0.2112'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-19',
        user_id: '456539788',
        username: 'rmb1402',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5234',
        game_name: '超牛逼',
        bet_amount: '7600.0000',
        payoff: '4990.0000',
        payoff_ratio: '0.6566'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-18',
        user_id: '455651399',
        username: 'apoliao',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5261',
        game_name: '招財喵喵',
        bet_amount: '132.0000',
        payoff: '-26.4000',
        payoff_ratio: '-0.2000'
      },
      {
        hall_id: 6,
        settle_date: '2025-06-18',
        user_id: '455651399',
        username: 'apoliao',
        lobby: 5,
        lobby_name: 'BB電子',
        game_code: '5231',
        game_name: '聚寶消消樂',
        bet_amount: '13000.0000',
        payoff: '-1810.0000',
        payoff_ratio: '-0.1392'
      }
    ],
    records_total: 30
  }
}
