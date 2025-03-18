interface BetSearchFilterFormState {
  memberValue: string
  timeDuration: [Dayjs | undefined, Dayjs | undefined]
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}

interface BetRecordSearchType {
  hallValue: number | undefined
  memberType: string
  memberValue: string[]
  lobbyValue: number | undefined
  gameTypeValue: string[]
  searchTypeValue: string
  timeDuration: [Dayjs | undefined, Dayjs | undefined]
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}
