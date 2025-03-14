import { defineStore } from 'pinia'
import { Dayjs } from '@/utils/appDayjs'

interface searchType {
  hallValue: number | undefined
  memberType: string
  memberValue: string[]
  lobbyValue: number | undefined
  gameTypeValue: string[]
  searchTypeValue: string
  timeDuration: [Dayjs | undefined, Dayjs | undefined]
}

export const useOperationsBetSearchStore = defineStore('memberBetQueryStore', () => {
  const searchParams = reactive<searchType>({
    hallValue: undefined,
    memberType: '',
    memberValue: [],
    lobbyValue: undefined,
    gameTypeValue: [],
    searchTypeValue: '',
    timeDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  return { searchParams, isFiltered }
})
