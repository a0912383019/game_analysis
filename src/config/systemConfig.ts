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

// 遊戲大類編號
export const lobbyGroupMap: Record<number, string> = {
  1: 'sport', // 體育
  2: 'lottery', // 彩票,
  3: 'live', // 視訊,
  4: 'fish', // 捕魚,
  5: 'prob', // 電子,
  6: 'card' // 棋牌,
}
