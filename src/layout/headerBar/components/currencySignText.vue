<script lang="ts" setup>
import { useGlobalStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const globalStore = useGlobalStore()

const currencySignText = computed<string>(() => {
  return t(`currency.currency_${getCurrencySign(globalStore.currentPlatform)}`)
})

const getCurrencySign = (platform: string): string => {
  let currencySign: string = '¥'
  switch (platform) {
    case 'xctw':
    case 'xcmy':
      currencySign = '$'
      break
    case 'midori':
      currencySign = '₱'
      break
    case 'bbin':
    case 'bbgp':
    default:
      currencySign = '¥'
      break
  }

  return currencySign
}
</script>
<template>
  <div class="text-sm !ml-5">
    <span class="show-on-desktop"> ({{ $t('currency.currency') + '：' + currencySignText }}) </span>
    <span class="show-on-pad"> ({{ getCurrencySign(globalStore.currentPlatform) }}) </span>
  </div>
</template>
<style lang="scss" scoped>
.show-on-desktop {
  display: inline;
}
.show-on-pad {
  display: none;
}

@media (max-width: 1045px) {
  .show-on-desktop {
    display: none;
  }
  .show-on-pad {
    display: inline;
  }
}
</style>
