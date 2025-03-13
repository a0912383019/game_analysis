<script lang="ts" setup>
import { platformDict } from '@/config/systemConfig'
import { useGlobalStore } from '@/stores'

const globalStore = useGlobalStore()

const currentPlatform = computed<string>(() => globalStore.currentPlatform)

const handleChangePlatform = (value: string) => {
  globalStore.currentPlatform = value
}
</script>
<template>
  <div class="flex gap-4">
    <a-button
      v-for="item in platformDict"
      class="!border-[#E8E9EC] !rounded-[20px] w-[100px] h-[36px] !bg-[#E8E9EC] hover:!border-[var(--primary-color)]"
      :class="{
        '!bg-[var(--primary-color)] hover:!bg-[var(--primary-color)] hover:!text-[#fff]':
          currentPlatform === item.key,
        'hover:!text-[var(--primary-color)]': currentPlatform !== item.key
      }"
      :key="item.key"
      :type="currentPlatform === item.key ? 'primary' : 'default'"
      @click="handleChangePlatform(item.key)"
    >
      {{ item.name }}
    </a-button>
  </div>
</template>
<style lang="scss" scoped></style>
