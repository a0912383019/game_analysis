import { svgIconRegister } from './svg-icon'
import { echartsRegister } from './echarts'

export const globalRegister = (app: any) => {
  svgIconRegister(app)
  echartsRegister(app)
}
