import { createI18n } from 'vue-i18n'
import zhTw from '@/languages/zh_Hant.json'

export const i18n = createI18n({
  legacy: false, // 使用vue3 Composition Api 一定要設為false才可使用
  locale: sessionStorage.languageType ?? 'zh-TW', //設定預設語系
  fallbackLocale: 'zh-TW',
  warnHtmlMessage: false, // i18n內包含html標籤，console不跳警告提示
  messages: {
    'zh-TW': zhTw
  }
})
