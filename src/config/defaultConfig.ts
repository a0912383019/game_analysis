// 各平台時區
export const platformTimezones: Record<string, string> = {
  bbin: 'America/New_York',
  bbgp: 'America/New_York',
  xctw: 'Asia/Taipei',
  xcmy: 'Asia/Taipei',
  midori: 'Asia/Manila'
}

// 側邊欄對應的 icon 名稱
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
export const targetMap: Record<number, { name: string; color: string }> = {
  2: { name: 'live', color: '--cdp-yellow' }, // 視訊
  3: { name: 'prob', color: '--cdp-pink' }, // 電子
  4: { name: 'lottery', color: '--cdp-orange' }, // 彩票
  5: { name: 'fish', color: '--cdp-blue' }, // 捕魚
  6: { name: 'card', color: '--cdp-green' } // 棋牌
}

// 遊戲大廳預設 target [2: 視訊, 3: 電子, 4: 彩票, 5: 捕魚, 6: 棋牌]
export const platformDefaultTarget1 = {
  bbin: 3,
  bbgp: 3,
  xctw: 3,
  xcmy: 3,
  midori: 2
}
export const platformDefaultTarget2 = {
  bbin: 2,
  bbgp: 2,
  xctw: 3,
  xcmy: 3,
  midori: 2
}
