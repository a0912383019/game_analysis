interface TableReportsSearchType {
  hallValue: number
  gameTypeValue: string[]
  liveRoom: string[]
  liveTable: string[]
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}

interface TableReportsFilterFormState {
  dateDuration: [Dayjs | undefined, Dayjs | undefined]
}
