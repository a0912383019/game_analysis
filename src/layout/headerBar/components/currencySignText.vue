<script lang="ts" setup>
import { useGlobalStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const globalStore = useGlobalStore()

const currencySignText = computed(() => {
  return t(`currency.currency_${getCurrencySign(globalStore.currentPlatform)}`)
})

const getCurrencySign = (platform: string): string => {
  let currencySign: string = '¥'
  switch (platform) {
    case 'bbin':
    case 'bbgp':
      currencySign = '¥'
      break
    case 'xc':
      currencySign = '$'
      break
    case 'midori':
      currencySign = '₱'
      break
  }

  return currencySign
}
</script>
<template>
  <div class="text-sm">({{ $t('currency.currency') + '：' + currencySignText }})</div>
</template>
<style lang="scss" scoped></style>
