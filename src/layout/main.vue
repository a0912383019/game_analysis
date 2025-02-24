<script lang="ts" setup>
import { useSidebarStore, useGlobalStore } from '@/stores'
import { platformDict } from '@/config/systemConfig'

const sidebarStore = useSidebarStore()
const globalStore = useGlobalStore()

const currentPlatform = computed(() => {
  document.documentElement.style.setProperty(
    '--primary-color',
    getColorByName(globalStore.currentPlatform)
  )
  return globalStore.currentPlatform
})

const getColorByName = (name: string): string => {
  const platform = platformDict.find((item) => item.name.toLowerCase() === name)
  return platform?.pColor || '#000000' // 找不到時返回預設顏色
}
</script>
<template>
  <div class="mainArea">
    <sidebar />
    <headerbar />
    <div class="mainArea__rightbox" :class="{ close: sidebarStore.isSidebarClose }">
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
    width: calc(100% - 250px);
    margin-left: auto;
    padding: 60px 0px 0px 0px;
    transition: all 0.2s ease;
    &.close {
      width: calc(100% - 80px);
    }
  }
}
.loading {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(#000000, 0.8);
}
</style>
