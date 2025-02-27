<script lang="ts" setup>
import { useSystemStore } from '@/stores'

const systemStore = useSystemStore()
const { storeLogout } = systemStore

const { name, picture } = JSON.parse(sessionStorage.user_info)
</script>
<template>
  <a-dropdown overlayClassName="shadow-[0px_2px_12px_0px_rgba(0,0,0,0.14)]" :trigger="['hover']">
    <div class="flex cursor-pointer items-center mr-3.5">
      <div class="w-[30px] h-[30px] rounded-full overflow-hidden">
        <img :src="picture" alt="" />
      </div>
      <a class="pl-2.5">
        {{ name }}
        <cdp-icon name="downOutline" class="!w-[12px] ml-1.5" />
      </a>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a @click="storeLogout">{{ $t('common.logout') }}</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<style lang="scss" scoped></style>
