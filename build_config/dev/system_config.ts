type ConfigMap = {
  name: string
  key: string
  pColor: string
}

export const platformDict: ConfigMap[] = [
  {
    name: 'plata',
    key: 'plata',
    pColor: '#061127'
  },
  {
    name: 'platb',
    key: 'platb',
    pColor: '#18242C'
  },
  {
    name: 'XC台灣站',
    key: 'platc',
    pColor: '#28182C'
  },
  {
    name: 'XC馬來站',
    key: 'platd',
    pColor: '#28182C'
  }
  // {
  //   name: 'Midori',
  //   key: 'midori',
  //   pColor: '#332E21'
  // }
]

export const platformDefaultHall = {
  plata: {
    hall_id: 1 // 寶馬-我是廳名 [bmw]
  },
  platb: {
    hall_id: 3820605 // WG [wgg]
  },
  platc: {
    hall_id: 19 // default_classify []
  },
  platd: {
    hall_id: 29 // default_classify []
  }
}
