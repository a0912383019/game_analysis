<script lang="ts" setup>
import { useGlobalStore } from '@/stores'
import { platformDict } from '@/../public/js/system_config'
import { apiHalls, apiLobbies, apiLobbyDevices } from '@/api'
import { notification } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const globalStore = useGlobalStore()

// 刷新的 key
const currentPlatform = ref<string>('bbin')

const getColorByName = (name: string): string => {
  return platformDict.find((item) => item.name.toLowerCase() === name)?.pColor || '#000000'
}

const isReady = ref(false)
const refreshData = async () => {
  globalStore.isLoading = true

  try {
    const [hallRes, lobbyRes, deviceRes] = await Promise.all([
      apiHalls({
        hall_id: undefined
      }),
      apiLobbies({
        lobby: undefined
      }),
      apiLobbyDevices({
        device: undefined
      })
    ])

    const platformData: Record<string, any> = {}

    if (hallRes.result === 'success' && hallRes.ret.length !== 0) {
      platformData['platform_halls'] = hallRes.ret
    }
    if (lobbyRes.result === 'success' && lobbyRes.ret.length !== 0) {
      platformData['platform_lobbies'] = lobbyRes.ret
    }
    if (deviceRes.result === 'success' && deviceRes.ret.length !== 0) {
      platformData['platform_devices'] = deviceRes.ret
    }

    sessionStorage.setItem('platform_config', JSON.stringify(platformData))
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      if (status === 401) {
        globalStore.storeHandleApiError()
      } else {
        notification['error']({
          message: t('msg.platform_config_error')
        })
      }
    }
  } finally {
    globalStore.isLoading = false
  }
}

watch(
  () => globalStore.currentPlatform,
  async () => {
    await refreshData()
    document.documentElement.style.setProperty(
      '--primary-color',
      getColorByName(globalStore.currentPlatform)
    )
    currentPlatform.value = globalStore.currentPlatform
  }
)

onMounted(async () => {
  await refreshData()
  isReady.value = true
})
</script>
<template>
  <div class="mainArea">
    <sidebar />
    <headerbar />
    <div class="mainArea__rightbox" :class="{ close: globalStore.isSidebarClose }">
      <div class="mainArea__container">
        <router-view v-if="isReady" :key="currentPlatform" />
      </div>
      <div class="loading" v-show="globalStore.isLoading">
        <loading-box />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mainArea {
  position: relative;
  display: flex;
  background-color: #f4f6f9;
  min-height: 100vh;
  min-width: 1024px;
  &__rightbox {
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    width: calc(100% - 250px);
    margin-left: auto;
    padding: 60px 0px 0px 0px;
    transition: all 0.2s ease;
    &.close {
      width: calc(100% - 80px);
    }
  }
}
</style>
