type ConfigMap = {
  name: string
  pColor: string
}

export const platformDict: ConfigMap[] = [
  {
    name: 'BBIN',
    pColor: '#061127'
  },
  {
    name: 'BBGP',
    pColor: '#18242C'
  },
  {
    name: 'XC',
    pColor: '#28182C'
  },
  {
    name: 'Midori',
    pColor: '#332E21'
  }
]

export const sidebarIcon = {
  home: 'home',
  operations_center: 'operationsCenter',
  risk_center: 'riskCenter',
  member_center: 'memberCenter',
  live_report: 'liveReport',
  prob_report: 'probReport',
  user_management: 'userManagement'
} as const

export type SidebarIconType = keyof typeof sidebarIcon
