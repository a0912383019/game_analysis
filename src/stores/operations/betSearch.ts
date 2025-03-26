import { defineStore } from 'pinia'

export const useOperationsBetSearchStore = defineStore('memberBetQueryStore', () => {
  const searchParams = reactive<BetRecordSearchType>({
    hallValue: undefined,
    memberType: '',
    memberValue: [],
    lobbyValue: undefined,
    gameTypeValue: [],
    searchTypeValue: '',
    timeDuration: [undefined, undefined],
    dateDuration: [undefined, undefined]
  })

  const isFiltered = ref<number>(0)

  return { searchParams, isFiltered }
})
