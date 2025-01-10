interface QuerySmallBoxDataParams {
  hall_name: string
  search_date: string
}

interface QuerySmartMessNoteParams extends apiBase {
  hall_name: string
  kind: string
  search_date: string
  locale: string
}

interface ReadSmartMessNoteParams extends apiBase {
  hall_name: string
  message_id: string | number
}
