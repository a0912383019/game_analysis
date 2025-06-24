import { defineStore } from 'pinia'
import router from '@/router'
import { notification } from 'ant-design-vue'
import { i18n } from '@/global/i18n'

export const useGlobalStore = defineStore('globalStore', () => {
  const isSidebarClose = ref<boolean>(false) // sidebar預設開啟

  const isLoading = ref<boolean>(true)

  const currentPlatform = ref<string>('plata')

  const { t } = i18n.global

  const storeHandleApiError = async () => {
    // 當api錯誤時，會執行的內容
    // 清除所有sessionStorage與localStorage
    sessionStorage.clear()
    localStorage.clear()
    notification['error']({
      message: t('msg.login_error')
    })
    router.push({ name: 'Login' })
  }

  const resetState = () => {
    isSidebarClose.value = false
    isLoading.value = true
    currentPlatform.value = 'plata'
  }

  return {
    isSidebarClose,
    isLoading,
    currentPlatform,
    storeHandleApiError,
    resetState
  }
})
