import dayjs from '@/utils/appDayjs'
import { platformTimezones } from '@/../public/js/system_config'
import { useGlobalStore } from '@/stores'
import { notification } from 'ant-design-vue'
import { i18n } from '@/global/i18n'

/**
 * 將浮點數四捨五入至指定位數
 * @param {string | number} val 要處理的數值
 * @param precision 小數點後四捨五入的位數 (預設值為 2)
 * @returns {string} 返回四捨五入後的數字字串
 */
export function roundDecimal(val: string | number, precision: number = 2): string {
  let parseVal = parseFloat(val.toString())
  const multiplier = Math.pow(10, precision)
  const roundedValue =
    parseVal > 0
      ? Math.round(parseVal * multiplier) / multiplier
      : (Math.round(Math.abs(parseVal) * multiplier) / multiplier) * -1

  return roundedValue.toString()
}

/**
 * 數字加上千分位分隔符號
 * @param {string | number} n 要加工的數值
 * @param precision 顯示的小數位數 (預設值為 2)
 * @returns {string} 返回格式化後的數字字串
 */
export function formatNumber(n: string | number, precision: number = 2): string {
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

/**
 * 取得儲存在sessionStorage中的JSON物件
 * @param {string} key sessionStorage的key值
 * @return {object} sessionStorage儲存的JSON物件
 */
export function getSessionStorageEntity(key: string): Record<string, any> {
  const item = sessionStorage.getItem(key)
  return item ? JSON.parse(item) : {}
}

/**
 * 轉換為api時間格式
 * @param {Dayjs | string} dateTime 日期時間
 * @return {string} 對應時區的日期時間
 */
export function formatToApiTime(dateTime: Dayjs | string): string {
  const globalStore = useGlobalStore()
  return dayjs(dateTime)
    .tz(platformTimezones[globalStore.currentPlatform], true)
    .format('YYYY-MM-DDTHH:mm:ssZ')
}
/**
 * 轉換為api使用日期格式
 * @param {Dayjs} dateVal 日期
 * @return {string} 對應的日期
 */
export function formatToApiDate(dateVal: Dayjs | string): string {
  return dayjs(dateVal).format('YYYY-MM-DD')
}

/**
 * 根據當前平台轉換時區
 * @param {Dayjs | string} dateTime 日期時間
 * @return {Dayjs} 對應時區的日期時間
 */
export function formatByTimeZone(dateTime: Dayjs | string): Dayjs {
  const globalStore = useGlobalStore()
  return dayjs(dateTime).tz(platformTimezones[globalStore.currentPlatform])
}

/**
 * 轉換成百分比字串
 * @param {string | number | null} val 要加工的數值
 * @param {number} precision 顯示的小數位數 (預設值為 2)
 * @return {string} 返回格式化後的數字字串
 */
export function formatToPercentage(val: string | number | null, precision: number = 2): string {
  if (!val) return '--'
  return formatNumber(parseFloat(val.toString()) * 100, precision) + '%'
}

/**
 * 單位格式化，輸入 250000，輸出 2,500k
 * @param {number | string} label - 要格式化的數值
 * @param {number} precision 顯示的小數位數 (預設值為 2)
 * @returns {string} 格式化後的字串
 */
export function formatNumberWithK(label: string | number, precision: number = 2): string {
  const num = parseFloat(label as string) // 確保 label 轉為數字
  return Math.abs(num) >= 1000
    ? formatNumber(num / 1000, precision) + 'k'
    : formatNumber(String(label), precision)
}

export function handleApiError(err: unknown) {
  const globalStore = useGlobalStore()
  const { t } = i18n.global

  if (axios.isAxiosError(err)) {
    const status = err.response?.status
    if (status === 401) {
      globalStore.storeHandleApiError()
    } else if (status === 403) {
      notification['error']({ message: t('msg.no_permission') })
    } else {
      notification['error']({ message: t('msg.query_failed') })
    }
  } else {
    notification['error']({ message: t('msg.query_failed') })
  }
}
