import { defineStore } from 'pinia'
import { Dayjs } from '@/utils/appDayjs'

interface searchType {
  hallValue: number
  memberValue: string
  lobbyValue: string | undefined
  gameTypeValue: number[]
  typeValue: string
  timeDuration: [Dayjs | undefined, Dayjs | undefined]
}

export const useOperationsBetSearchStore = defineStore('memberBetQueryStore', () => {
  const searchParams = reactive<searchType>({
    hallValue: 8,
    memberValue: '',
    lobbyValue: undefined,
    gameTypeValue: [],
    typeValue: 'bet',
    timeDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  return { searchParams, isFiltered }
})
