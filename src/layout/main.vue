<script lang="ts" setup>
import { useGlobalStore } from '@/stores'
import { platformDict } from '@/../public/js/system_config'
import { apiHalls, apiLobbies } from '@/api'
import { notification } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const globalStore = useGlobalStore()

// 刷新的 key
const currentPlatform = ref<string>('bbin')

const getColorByName = (name: string): string => {
  return platformDict.find((item) => item.name.toLowerCase() === name)?.pColor || '#000000'
}

// 通用 API 查詢函式
const queryApiData = async (apiFunc: Function, storageKey: string, params = {}) => {
  try {
    const response = await apiFunc(params)
    if (response.result === 'success') {
      sessionStorage.setItem(storageKey, JSON.stringify(response.ret))
    } else {
      throw new Error()
    }
  } catch (err) {
    console.error(err)
    sessionStorage.setItem(storageKey, JSON.stringify([]))
    throw err // 讓外部統一處理 401
  }
}

const isReady = ref(false)
const refreshData = async () => {
  globalStore.isLoading = true

  const results = await Promise.allSettled([
    queryApiData(apiHalls, 'platform_halls', { hall_id: undefined }),
    queryApiData(apiLobbies, 'platform_lobbies', { lobby: undefined })
  ])

  globalStore.isLoading = false

  // 檢查是否有任何一個請求出現 401
  if (
    results.some(
      (result) =>
        result.status === 'rejected' &&
        axios.isAxiosError(result.reason) &&
        result.reason.response?.status === 401
    )
  ) {
    globalStore.storeHandleApiError()
  }
  // 其他錯誤
  else if (results.some((result) => result.status === 'rejected')) {
    notification.error({ message: t(`msg.platform_switch_failed`) })
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
  overflow-x: auto;
  overflow-y: hidden;
  min-width: 1024px;
  &__rightbox {
    position: relative;
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
