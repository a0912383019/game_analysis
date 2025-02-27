import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import { i18n } from '@/global/i18n'

export const useSystemStore = defineStore('systemStore', () => {
  const router = useRouter()
  const { t } = i18n.global

  const storeLogout = () => {
    sessionStorage.clear()
    localStorage.clear()
    notification['success']({
      message: t('msg.logout'),
      style: {
        width: '200px'
      }
    })
    router.push({ name: 'Login' })
  }

  return { storeLogout }
})
