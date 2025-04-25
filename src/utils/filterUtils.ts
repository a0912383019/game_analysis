import { i18n } from '@/global/i18n'
import type { DefaultOptionType } from 'ant-design-vue/es/cascader'
import type { Rule } from 'ant-design-vue/es/form'
import { queryLobbyGames } from '@/utils/commonApi'
import { handleApiError } from '@/utils/commonUtils'
import { useGlobalStore } from '@/stores'

// 遊戲及玩法選項
export const loadData = async (selectedOptions: DefaultOptionType[]) => {
  const targetOption = selectedOptions[selectedOptions.length - 1]
  if (targetOption.children !== undefined) {
    return
  }
  targetOption.loading = true

  const games = await queryLobbyGames(targetOption['value'] as number)
  if (games) {
    targetOption.children = games.map((ele) => {
      let children: any[] | undefined = undefined
      if (targetOption['value'] === 3) {
        children = ele.serial_info.map((item) => ({
          label: item.serial_name,
          value: item.serial_type?.toString()
        }))
      }
      return {
        label: ele.game_name,
        value: ele.game_code,
        isLeaf: targetOption['value'] !== 3 || (children && children.length === 0),
        children: children
      }
    })
  }

  targetOption.loading = false
}

export const dateDurationRule = (_rule: Rule, value: [Dayjs, Dayjs]) => {
  const { t } = i18n.global

  if (!value || !value[0] || !value[1]) {
    return Promise.reject(t('common.select_complete_date_range'))
  }
  return Promise.resolve()
}

export const timeDurationRule = (_rule: Rule, value: [Dayjs, Dayjs]) => {
  const { t } = i18n.global

  if (!value || !value[0] || !value[1]) {
    return Promise.reject(t('common.select_complete_time_range'))
  }
  return Promise.resolve()
}

export const memberValueRule = (_rule: Rule, value: string, accountOrId: string) => {
  const { t } = i18n.global

  if (value === '') {
    return Promise.resolve()
  }

  // 先檢查平台是否為 'xctw' 或 'xcmy'，這兩個平台不限制輸入格式
  if (['xctw', 'xcmy'].includes(useGlobalStore().currentPlatform)) {
    return Promise.resolve()
  }

  // 如果是會員帳號，確保輸入只能包含英數字 + 逗號
  if (accountOrId === 'account') {
    if (!/^[0-9a-zA-Z,]+$/.test(value)) {
      return Promise.reject(t('common.only_english_numbers_comma_separated'))
    }
  }

  // 如果是會員ID，需確保輸入的都是數字 + 逗號
  if (accountOrId === 'memberId') {
    if (!/^[0-9,]+$/.test(value)) {
      return Promise.reject(t('common.member_id_be_number_confirm_the_content'))
    }
  }

  const members = value.split(',').filter((id) => id !== '')

  // 限制最多10個帳號
  if (members.length > 10) {
    return Promise.reject(t('common.max_member_accounts_exceeded', { max: 10 }))
  }

  return Promise.resolve()
}

export const tidyMember = (memberValue: string): string => {
  return memberValue
    .trim() // 去掉頭尾空格
    .replace(/\s*,\s*/g, ',') // 去除逗號前後的空格
    .replace(/,{2,}/g, ',') // 移除連續逗號
    .replace(/(^,|,$)/g, '') // 移除開頭 結尾的逗號
}

export const generateGamePlayParam = (data: LobbyGameData[]): Game[] => {
  const map = new Map<string, Game>()

  data.forEach((item) => {
    const [lobby, game_code, serial_type] = item
    const key = game_code ? `${lobby}-${game_code}` : `${lobby}`

    if (!map.has(key)) {
      map.set(key, {
        lobby: lobby as number,
        ...(game_code ? { game_code: game_code as string } : {}),
        ...(serial_type ? { serial_type: [serial_type as string] } : {})
      })
    } else if (serial_type) {
      map.get(key)!.serial_type!.push(serial_type as string)
    }
  })

  return Array.from(map.values())
}

// 總報表共用參數整理
export const generateOverallParams = (
  apiLength: number | undefined,
  apiStart: number | undefined,
  sortCol: string,
  order: string,
  paramInfo: any
): ParamsBetReport => {
  let apiParams = {
    device: paramInfo.device,
    end_date: paramInfo.endDate,
    start_date: paramInfo.startDate,
    hall_id: paramInfo.hallId,
    user_id: paramInfo.userId,
    username: paramInfo.username,
    game: paramInfo.game
  }

  return {
    ...apiParams,
    length: apiLength,
    sort: sortCol,
    start: apiStart,
    order: order === 'descend' ? 'DESC' : 'ASC'
  }
}

// 營運中心-總報表 api 呼叫
export const queryApi = async (
  apiFunc: Function,
  params: ParamsBetReport,
  transformFunc: Function,
  record: any
) => {
  try {
    const response = await apiFunc(params)
    const { result } = response

    if (result === 'success') {
      if (response.ret.data.length !== 0) {
        transformFunc(response.ret, record, params)
      }
    } else {
      throw new Error()
    }
  } catch (err) {
    console.error(err)
    handleApiError(err)
  }
}
