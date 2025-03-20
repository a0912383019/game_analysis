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
  { value: 1, label: '其他' },
  { value: 2, label: 'iOS 手機' },
  { value: 3, label: '安卓手機' },
  { value: 4, label: 'iOS 平板' },
  { value: 5, label: '安卓平板' },
  { value: 6, label: 'Mac' }
]

// 遊戲大類編號
export const lobbyGroupMap: Record<number, string> = {
  1: 'sport', // 體育
  2: 'lottery', // 彩票,
  3: 'live', // 視訊,
  4: 'fish', // 捕魚,
  5: 'prob', // 電子,
  6: 'card' // 棋牌,
}

// 各平台篩選預設值
export const platformDefaultInfo = {
  bbin: {
    hall_id: 1, // 寶馬-我是廳名 [bmw]
    lobby: 5 // BB電子
  },
  bbgp: {
    hall_id: 3820605, // WG [wgg]
    lobby: 5 // BB電子
  },
  xctw: {
    hall_id: undefined,
    lobby: undefined
  },
  xcmy: {
    hall_id: undefined,
    lobby: undefined
  },
  midori: {
    hall_id: undefined,
    lobby: undefined
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
