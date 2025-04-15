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

interface OverallReportSearchType {
  hallValue: number
  memberType: string
  memberValue: string[]
  gamePlayValue: Game[] | undefined
  deviceTypeValue: number | undefined
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}

interface BaseOverallReportParams {
  device?: number
  endDate?: string
  startDate?: string
  hallId?: number
  userId?: string[]
  username?: string[]
  game?: Game[]
}

interface OverallReportFilterFormState {
  memberValue: string
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}
