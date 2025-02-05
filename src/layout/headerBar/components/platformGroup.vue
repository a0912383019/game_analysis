<script lang="ts" setup>
import { platformDict } from '@/../public/js/system_config'
import { useGlobalStore } from '@/stores'

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
      v-for="item in platformDict"
      class="border-[#E8E9EC] rounded-[20px] w-[100px] h-[36px] bg-[#E8E9EC] hover:!border-[var(--primary-color)]"
      :class="{
        '!bg-[var(--primary-color)] hover:!bg-[var(--primary-color)] hover:!text-[#fff]':
          selectPlatform === item.name.toLowerCase(),
        'hover:!text-[var(--primary-color)]': selectPlatform !== item.name.toLowerCase()
      }"
      :key="item.name.toLowerCase()"
      :type="selectPlatform === item.name.toLowerCase() ? 'primary' : 'default'"
      @click="onSelect(item.name.toLowerCase())"
    >
      {{ item.name }}
    </a-button>
  </div>
</template>
<style lang="scss" scoped></style>
