type ConfigMap = {
  name: string,
  key: string,
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
    key: 'xc-tw',
    pColor: '#28182C'
  },
  {
    name: 'XC馬來站',
    key: 'xc-ml',
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
  operations_center: 'operationsCenter',
  risk_center: 'riskCenter',
  member_center: 'memberCenter',
  live_report: 'live',
  prob_report: 'prob',
  user_management: 'userManagement'
} as const

export type SidebarIconType = keyof typeof sidebarIcon
