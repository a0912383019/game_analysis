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
  operations: 'operationsCenter',
  risk_control: 'riskCenter',
  members: 'memberCenter',
  video_reports: 'live',
  electronic_reports: 'prob',
  user_management: 'userManagement'
} as const

export type SidebarIconType = keyof typeof sidebarIcon
