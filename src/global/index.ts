import { echartsRegister } from './echarts'
import { googleLoginRegister } from './google-login'

export const globalRegister = (app: ReturnType<typeof createApp>) => {
  echartsRegister(app)
  googleLoginRegister(app)
}
