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
  }
  // {
  //   name: 'Midori',
  //   key: 'midori',
  //   pColor: '#332E21'
  // }
]

export const platformDefaultHall = {
  bbin: {
    hall_id: 1 // 寶馬-我是廳名 [bmw]
  },
  bbgp: {
    hall_id: 3820605 // WG [wgg]
  },
  xctw: {
    hall_id: 19 // default_classify []
  },
  xcmy: {
    hall_id: 29 // default_classify []
  }
}
