/**
 * 將浮點數四捨五入至指定位數
 * @param val 要處理的數值
 * @param precision 小數點後四捨五入的位數 (預設值為 2)
 * @returns {string} 返回四捨五入後的數字字串
 */
export function roundDecimal(val: number, precision: number = 2): string {
  const multiplier = Math.pow(10, precision)
  const roundedValue =
    val > 0
      ? Math.round(val * multiplier) / multiplier
      : (Math.round(Math.abs(val) * multiplier) / multiplier) * -1

  return roundedValue.toString()
}

/**
 * 數字加上千分位分隔符號
 * @param n 要加工的數值
 * @param precision 顯示的小數位數 (預設值為 0)
 * @returns {string} 返回格式化後的數字字串
 */
export function formatNumber(n: number, precision: number = 0): string {
  const rounded = roundDecimal(n, precision)
  const parts = rounded.split('.')

  // 格式化小數點部分
  if (parts[1] !== undefined) {
    if (parts[1] === '00') {
      // 如果小數點後的數字為 "00"，則移除小數點部分
      parts.splice(1, 1)
    } else if (parts[1].substring(1, 2) === '0' && parts[1].length < 3) {
      // 如果小數點第二位為 "0"，且沒有第三位數，則移除多餘位數
      parts[1] = parts[1].substring(0, 1)
    } else if (parts[1].substring(2, 3) === '0') {
      // 如果小數點第三位為 "0"，則移除多餘位數
      parts[1] = parts[1].substring(0, 2)
    }
  }

  const re = /(\d{1,3})(?=(\d{3})+$)/g
  return parts[0].replace(re, '$1,') + (parts.length === 2 ? '.' + parts[1] : '')
}

export const sortDate: (a: any, b: any) => number = (a, b) => {
  return new Date(a.betTime).getTime() - new Date(b.betTime).getTime()
}
