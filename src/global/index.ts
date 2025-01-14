import { svgIconRegister } from './svg-icon'
import { echartsRegister } from './echarts'
import { googleLoginRegister } from './google-login'

export const globalRegister = (app: any) => {
  svgIconRegister(app)
  echartsRegister(app)
  googleLoginRegister(app)
}
