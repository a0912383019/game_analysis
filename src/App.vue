<script lang="ts" setup>
import zhTw from 'ant-design-vue/es/locale/zh_TW'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const lang = {
  'zh-TW': zhTw
}

const language = computed(() => {
  return lang[locale.value as keyof typeof lang] || lang['zh-TW']
})
</script>
<template>
  <a-config-provider :locale="language">
    <router-view />
  </a-config-provider>
</template>
<style scoped></style>
