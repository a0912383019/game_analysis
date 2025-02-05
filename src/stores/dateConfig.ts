import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import dayjs from '@/utils/appDayjs'

export const useDateStore = defineStore('dateStore', () => {
  const { t } = useI18n()

  const dateRangeConfig1 = ref([
    { label: t('date.today'), value: [dayjs(), dayjs()] },
    { label: t('date.yesterday'), value: [dayjs().add(-1, 'd'), dayjs().add(-1, 'd')] },
    { label: t('date.last_7_days'), value: [dayjs().add(-7, 'd'), dayjs().add(-1, 'd')] },
    { label: t('date.this_week'), value: [dayjs().startOf('week'), dayjs()] },
    {
      label: t('date.last_week'),
      value: [dayjs().startOf('week').add(-7, 'd'), dayjs().startOf('week').add(-1, 'd')]
    },
    { label: t('date.last_30_days'), value: [dayjs().add(-30, 'd'), dayjs().add(-1, 'd')] },
    { label: t('date.this_month'), value: [dayjs().startOf('month'), dayjs()] },
    {
      label: t('date.last_month'),
      value: [dayjs().startOf('month').add(-1, 'month'), dayjs().startOf('month').add(-1, 'd')]
    }
  ])

  const dateRangeConfig2 = ref([
    { label: t('date.last_7_days'), value: [dayjs().add(-7, 'd'), dayjs().add(-1, 'd')] },
    { label: t('date.this_week'), value: [dayjs().startOf('week'), dayjs()] },
    {
      label: t('date.last_week'),
      value: [dayjs().startOf('week').add(-7, 'd'), dayjs().startOf('week').add(-1, 'd')]
    }
  ])

  return { dateRangeConfig1, dateRangeConfig2 }
})
