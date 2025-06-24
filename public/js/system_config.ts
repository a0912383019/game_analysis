type ConfigMap = {
  name: string
  key: string
  pColor: string
}

export const platformDict: ConfigMap[] = [
  {
    name: '平台A',
    key: 'plata',
    pColor: '#061127'
  },
  {
    name: '平台B',
    key: 'platb',
    pColor: '#18242C'
  },
  {
    name: '平台C',
    key: 'platc',
    pColor: '#28182C'
  },
  {
    name: '平台D',
    key: 'platd',
    pColor: '#28182C'
  }
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
    hall_id: 29
  }
}
