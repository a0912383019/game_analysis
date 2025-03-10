<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'

const { t } = useI18n()

const storeLogout = () => {
  sessionStorage.clear()
  localStorage.clear()
  notification['success']({
    message: t('msg.logout'),
    duration: 2
  })
  router.push({ name: 'Login' })
}

const { name, picture } = JSON.parse(sessionStorage.game_user_info)
</script>
<template>
  <a-dropdown overlayClassName="shadow-[0px_2px_12px_0px_rgba(0,0,0,0.14)]" :trigger="['hover']">
    <div class="flex cursor-pointer items-center !mr-5">
      <div class="w-[30px] h-[30px] rounded-full overflow-hidden">
        <img :src="picture" alt="" />
      </div>
      <a class="!pl-3">
        {{ name }}
        <cdp-icon name="downOutline" class="!w-[12px] !ml-2" />
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
