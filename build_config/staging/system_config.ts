type ConfigMap = {
  name: string
  key: string
  pColor: string
}

export const platformDict: ConfigMap[] = [
  {
    name: 'BBIN',
    key: 'bbin',
    pColor: '#061127'
  },
  {
    name: 'BBGP',
    key: 'bbgp',
    pColor: '#18242C'
  },
  {
    name: 'XC台灣站',
    key: 'xctw',
    pColor: '#28182C'
  },
  {
    name: 'XC馬來站',
    key: 'xcmy',
    pColor: '#28182C'
  },
  {
    name: 'Midori',
    key: 'midori',
    pColor: '#332E21'
  }
]

export const sidebarIcon = {
  home: 'home',
  operations: 'operationsCenter',
  risk_control: 'riskCenter',
  members: 'memberCenter',
  video_reports: 'live',
  electronic_reports: 'prob',
  user_management: 'userManagement'
} as const

export type SidebarIconType = keyof typeof sidebarIcon

// 裝置種類編號
export const deviceGroupList: { value: number; label: string }[] = [
  { value: 0, label: 'PC' },
  { value: 6, label: 'Mac' },
  { value: 2, label: 'iOS 手機' },
  { value: 3, label: '安卓手機' },
  { value: 4, label: 'iOS 平板' },
  { value: 5, label: '安卓平板' },
  { value: 1, label: '其他' }
]

// 遊戲大類編號
export const lobbyGroupMap: Record<number, { name: string; color: string }> = {
  2: { name: 'live', color: '--cdp-yellow' }, // 視訊
  3: { name: 'prob', color: '--cdp-pink' }, // 電子
  4: { name: 'lottery', color: '--cdp-orange' }, // 彩票
  5: { name: 'fish', color: '--cdp-blue' }, // 捕魚
  6: { name: 'card', color: '--cdp-green' } // 棋牌
}

// 各平台篩選預設值
export const platformDefaultInfo = {
  bbin: {
    hall_id: 1, // 寶馬 [bmw]
    lobby: 5 // BB電子
  },
  bbgp: {
    hall_id: 3820474, // BGP API 測試廳[bgp]
    lobby: 5 // BB電子
  },
  xctw: {
    hall_id: 6, // default_classify []
    lobby: 5 // DW電子
  },
  xcmy: {
    hall_id: 32, // default_classify []
    lobby: 5 // DW電子
  },
  midori: {
    hall_id: 3, // Midori Online1 [mdo]
    lobby: 3 // BB視訊
  }
}

// 各平台時區
export const platformTimezones: Record<string, string> = {
  bbin: 'America/New_York',
  bbgp: 'America/New_York',
  xctw: 'Asia/Taipei',
  xcmy: 'Asia/Taipei',
  midori: 'Asia/Manila'
}
