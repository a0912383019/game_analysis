<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useGlobalStore } from '@/stores'
import { formatNumber } from '@/utils/commonUtils'
import { apiGetGameReportByLobbyGroup } from '@/api'
import { targetMap } from '@/../public/js/system_config'
import { notification } from 'ant-design-vue'
import { getPlatformToday } from '@/utils/appDayjs'

const { t } = useI18n()

const globalStore = useGlobalStore()

const todayDate = ref<Dayjs>(getPlatformToday(globalStore.currentPlatform))

const apiSuccess = ref<boolean>(false)
const apiResponse = ref<ResultGameReportByLobbyGroup[]>([])

const queryGameReportByLobbyGroup = async () => {
  apiSuccess.value = false
  apiResponse.value = []

  try {
    const response = await apiGetGameReportByLobbyGroup({
      date: todayDate.value.format('YYYY-MM-DD')
    })
    const { result } = response

    if (result === 'success') {
      apiResponse.value = response.ret
      apiSuccess.value = true
    } else {
      throw new Error()
    }
  } catch (err) {
    console.error(err)
    if (axios.isAxiosError(err)) {
      const status = err.response?.status
      if (status === 401) {
        // token 錯誤，登出
        globalStore.storeHandleApiError()
      } else if (status === 403) {
        // 沒有權限
        notification['error']({
          message: t('msg.no_permission')
        })
      } else {
        // query failed
        notification['error']({
          message: t('msg.query_failed')
        })
      }
    } else {
      // query failed
      notification['error']({
        message: t('msg.query_failed')
      })
    }
  }
}

const targetOrder: number[] = [3, 2, 6, 5, 4]

const cardList = computed<HomeCard[]>(() =>
  targetOrder.map((ele) => {
    const cardObj = apiResponse.value.find((item) => item.lobby_group === ele)
    return {
      title: targetMap[ele].name,
      customShapeColor: `bg-[var(${targetMap[ele].color})]`,
      bet: cardObj ? formatNumber(cardObj.bet_amount) : '--',
      payoff: cardObj ? formatNumber(cardObj.payoff) : '--',
      amount: cardObj ? formatNumber(cardObj.wager_count) : '--',
      people: cardObj ? formatNumber(cardObj.user_count) : '--'
    }
  })
)

onMounted(() => {
  queryGameReportByLobbyGroup()
})
</script>
<template>
  <section class="!mt-[15px] !mx-[10px]">
    <a-row justify="center" class="gap-2.5">
      <a-col :span="5" v-for="(item, idx) in cardList" :key="idx">
        <a-card class="cdp-card shadow-lg">
          <template #title>
            <div class="custom-shape" :class="item.customShapeColor"></div>
            <cdp-icon :name="item.title"></cdp-icon>
            <span class="text-base !ml-2"> {{ $t(`target_group.${item.title}`) }} </span>
            <span class="text-[13px] text-[#A5B1C5] !ml-2">
              {{ todayDate.format(t('date.format_locale_date_rule')) }}
            </span>
          </template>
          <div>
            <a-row justify="center" :gutter="[10, 10]" :class="{ 'text-[#A5B1C5]': !apiSuccess }">
              <a-col :span="12">
                <div class="text-[13px] text-[#A5B1C5]">{{ $t('data_name.bet_amount') }}</div>
                <div class="!font-medium">{{ item.bet }}</div>
              </a-col>
              <a-col :span="12">
                <div class="text-[13px] text-[#A5B1C5]">{{ $t('data_name.game_profit_loss') }}</div>
                <div class="!font-medium">{{ item.payoff }}</div>
              </a-col>
              <a-col :span="12">
                <div class="text-[13px] text-[#A5B1C5]">{{ $t('unit.amount') }}</div>
                <div class="!font-medium">{{ item.amount }}</div>
              </a-col>
              <a-col :span="12">
                <div class="text-[13px] text-[#A5B1C5]">{{ $t('unit.people_num') }}</div>
                <div class="!font-medium">{{ item.people }}</div>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </section>
</template>
<style lang="scss" scoped>
:deep(.ant-col-5) {
  flex: 0 0 calc(20% - 10px);
  min-width: 224px;
  width: calc(20%);
}
:deep(.ant-card) {
  min-width: 224px;
  min-height: 180px;
}
</style>
