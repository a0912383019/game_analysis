<script lang="ts" setup>
import { useGlobalStore } from '@/stores'
import { platformDict } from '@/../public/js/system_config'
import { apiHalls, apiLobbies, apiDevices } from '@/api'
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
    const [hallResult, lobbyResult, deviceResult] = await Promise.allSettled([
      apiHalls({ hall_id: undefined }),
      apiLobbies({ lobby: undefined }),
      apiDevices({ device: undefined })
    ])

    const platformData: PlatformConfig = {
      platform_halls: [],
      platform_devices: [],
      platform_lobbies: []
    }

    if (
      hallResult.status === 'fulfilled' &&
      hallResult.value.result === 'success' &&
      hallResult.value.ret.length !== 0
    ) {
      platformData['platform_halls'] = hallResult.value.ret
    }

    if (
      lobbyResult.status === 'fulfilled' &&
      lobbyResult.value.result === 'success' &&
      lobbyResult.value.ret.length !== 0
    ) {
      platformData['platform_lobbies'] = lobbyResult.value.ret
    }

    if (
      deviceResult.status === 'fulfilled' &&
      deviceResult.value.result === 'success' &&
      deviceResult.value.ret.length !== 0
    ) {
      platformData['platform_devices'] = deviceResult.value.ret
    }

    sessionStorage.setItem('platform_config', JSON.stringify(platformData))

    // 額外提示錯誤（不是進 catch，而是個別處理）
    const errors: string[] = []
    if (hallResult.status === 'rejected') errors.push('Hall')
    if (lobbyResult.status === 'rejected') errors.push('Lobby')
    if (deviceResult.status === 'rejected') errors.push('Device')

    if (errors.length > 0) {
      notification['error']({
        message: `${errors.join(', ')} ${t('msg.platform_config_error')}`
      })
    }
  } catch (error) {
    // 這邊通常進不來，因為 allSettled 不會 throw error，但保險起見還是寫上
    console.error(error)
    notification['error']({
      message: t('msg.platform_config_error')
    })
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
