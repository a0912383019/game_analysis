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
  globalStore.isLoading = true
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
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      globalStore.storeHandleApiError()
    } else {
      notification.error({ message: t(`msg.get_${storageKey}_failed`) })
    }
  } finally {
    globalStore.isLoading = false
  }
}

const refreshData = async () => {
  await Promise.all([
    queryApiData(apiHalls, 'platform_halls', { hall_id: undefined }),
    queryApiData(apiLobbies, 'platform_lobbies', { lobby: undefined })
  ])
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

onMounted(() => {
  refreshData()
})
</script>
<template>
  <div class="mainArea">
    <sidebar />
    <headerbar />
    <div class="mainArea__rightbox" :class="{ close: globalStore.isSidebarClose }">
      <div class="mainArea__container">
        <router-view :key="currentPlatform" />
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
  overflow: hidden;
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
