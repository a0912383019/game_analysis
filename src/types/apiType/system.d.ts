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
