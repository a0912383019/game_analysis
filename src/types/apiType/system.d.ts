interface ParamsLogin {
  id_token: string
}

interface ResultLoginData {
  access_token: string
  email: string
  expires_in: number
  name: string
  picture: string
  token_type: string
}

interface ResultSidebar {
  title: string
  route: string
  submenu?: ResultSidebar[]
}

interface ParamsHalls {
  hall_id?: number
}

interface ResultHalls {
  hall_id: number
  login_code: string
  name: string
}

interface ParamsLobbies {
  lobby?: number
}

interface ResultLobbies {
  lobby: number
  lobby_name: string
  target: number
  target_name: string
}

interface ParamsDevices {
  device?: number
}

interface ResultDevices {
  created_time: string
  id: number
  name: string
}

interface ParamsLobbyGames {
  lobby_id: number
}

interface SerialInfo {
  serial_name?: string
  serial_type?: number
}

interface ResultLobbyGames {
  enable: number
  game_code: string
  game_name: string
  serial_info: SerialInfo[]
}
