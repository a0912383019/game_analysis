<script lang="ts" setup>
import { platformDict } from '@/../public/js/system_config'
import { useGlobalStore } from '@/stores/global'

const globalStore = useGlobalStore()

const selectPlatform = ref<string>('bbin')

const onSelect = (value: string) => {
  selectPlatform.value = value
  globalStore.currentPlatform = value
}
</script>
<template>
  <div class="flex gap-4">
    <a-button
      class="rounded-[20px] w-[100px] h-[36px] bg-[#E8E9EC] hover:!border-[var(--primary-color)] hover:!text-[var(--primary-color)]"
      :class="{
        '!bg-[var(--primary-color)] hover:!bg-[var(--primary-color)] hover:!text-[#fff]':
          selectPlatform === item.name.toLowerCase()
      }"
      v-for="item in platformDict"
      :key="item.name.toLowerCase()"
      :type="selectPlatform === item.name.toLowerCase() ? 'primary' : 'default'"
      @click="onSelect(item.name.toLowerCase())"
    >
      {{ item.name }}
    </a-button>
  </div>
</template>
<style lang="scss" scoped></style>
