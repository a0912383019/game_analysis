<script lang="ts" setup>
import { notification } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()

const router = useRouter()

const storeLogout = () => {
  sessionStorage.clear()
  localStorage.clear()
  notification['success']({
    message: t('msg.logout'),
    duration: 2
  })
  router.push({ name: 'Login' })
}

const { name, picture } = JSON.parse(localStorage.game_user_info)
</script>
<template>
  <a-dropdown overlayClassName="!min-w-[100px]" :trigger="['hover']" placement="bottom">
    <div class="flex cursor-pointer items-center !mr-6">
      <div class="w-[30px] h-[30px] rounded-full overflow-hidden">
        <img :src="picture" alt="" />
      </div>
      <a class="!pl-3 show-on-desktop">
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
<style lang="scss" scoped>
.show-on-desktop {
  display: inline;
}

@media (max-width: 1023px) {
  .show-on-desktop {
    display: none;
  }
}
</style>