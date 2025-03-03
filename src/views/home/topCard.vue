<script setup lang="ts">
import type { HomeCard } from './home'
import { formatNumber } from '@/utils/commonUtils'

const titleIcon = ['prob', 'live', 'card', 'fish', 'lottery']

const todayDate = ref<string>('2024/01/09')
const cardList = ref<HomeCard[]>([])
const transformData = (data: any) => {
  titleIcon.forEach((ele) => {
    const cardData: HomeCard = {
      title: ele,
      customShapeColor: generateShapeColorClass(ele),
      bet: formatNumber(data[ele].bet),
      payoff: formatNumber(data[ele].payoff),
      amount: formatNumber(data[ele].amount),
      people: formatNumber(data[ele].people)
    }

    cardList.value.push(cardData)
  })
}

const generateShapeColorClass = (val: string): string => {
  let colorClass: string = 'bg-[var(--cdp-pink)]'
  switch (val) {
    case 'prob':
      colorClass = 'bg-[var(--cdp-pink)]'
      break
    case 'live':
      colorClass = 'bg-[var(--cdp-yellow)]'
      break
    case 'card':
      colorClass = 'bg-[var(--cdp-green)]'
      break
    case 'fish':
      colorClass = 'bg-[var(--cdp-blue)]'
      break
    case 'lottery':
      colorClass = 'bg-[var(--cdp-orange)]'
      break
  }

  return colorClass
}

onMounted(() => {
  const apiResult = {
    prob: {
      bet: 420388770,
      payoff: 83829,
      amount: 2022111,
      people: 8819
    },
    live: {
      bet: 8812199,
      payoff: -373922,
      amount: 778922,
      people: 20091
    },
    card: {
      bet: 378222,
      payoff: 774999,
      amount: 22338,
      people: 14888
    },
    fish: {
      bet: 443574900,
      payoff: -5254146,
      amount: 9118662,
      people: 668923
    },
    lottery: {
      bet: 912199,
      payoff: 87869,
      amount: 44357,
      people: 19908
    }
  }

  transformData(apiResult)
})
</script>
<template>
  <section class="!my-[15px] !mx-[10px]">
    <a-row justify="center" class="gap-2.5">
      <a-col :span="5" v-for="(item, idx) in cardList" :key="idx">
        <a-card class="shadow-lg">
          <template #title>
            <div class="custom-shape" :class="item.customShapeColor"></div>
            <cdp-icon :name="item.title"></cdp-icon>
            <span class="text-base !ml-2"> {{ $t(`lobby_group.${item.title}`) }} </span>
            <span class="text-[13px] text-[#A5B1C5] !ml-2"> {{ todayDate }} </span>
          </template>
          <div>
            <a-row justify="center" :gutter="[10, 10]">
              <a-col :span="12">
                <div class="text-[13px] text-[#A5B1C5]">{{ $t('data_name.bet_amount') }}</div>
                <div>{{ item.bet }}</div>
              </a-col>
              <a-col :span="12">
                <div class="text-[13px] text-[#A5B1C5]">{{ $t('data_name.game_profit_loss') }}</div>
                <div>{{ item.payoff }}</div>
              </a-col>
              <a-col :span="12">
                <div class="text-[13px] text-[#A5B1C5]">{{ $t('unit.amount') }}</div>
                <div>{{ item.amount }}</div>
              </a-col>
              <a-col :span="12">
                <div class="text-[13px] text-[#A5B1C5]">{{ $t('unit.people_num') }}</div>
                <div>{{ item.people }}</div>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </section>
</template>
<style lang="scss" scoped>
.custom-shape {
  width: 5px;
  height: 39px;
  position: absolute;
  border-radius: 0px 100% 100% 0 / 0px 7px 7px 0px;
  top: 6px;
  left: 0;
}
:deep(.ant-col-5) {
  flex: 0 0 calc(20% - 10px);
  min-width: 224px;
  width: calc(20%);
}
:deep(.ant-card) {
  min-width: 224px;
  min-height: 180px;
  .ant-card-head {
    min-height: 51px;
    padding: 0 16px;
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(
      90deg,
      rgb(255, 255, 255),
      rgba(240, 240, 240) 20%,
      rgba(240, 240, 240) 80%,
      rgb(255, 255, 255)
    );
    border-image-slice: 1;
  }
  .ant-card-body {
    padding: 15px;
  }
}
</style>
