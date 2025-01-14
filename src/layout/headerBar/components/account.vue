<script lang="ts" setup></script>
<template>
  <div class="flex cursor-pointer items-center mr-3.5">
    <div class="w-[30px] h-[30px] rounded-full overflow-hidden">
      <img
        src="https://lh3.googleusercontent.com/a/ACg8ocIAFgNm2IiozN9_8dbbzezYb_oNVtd2ufoVYG9vCjlkVRvx2Q=s96-c"
        alt=""
      />
    </div>
    <a-dropdown overlayClassName="cdp-box-shadow" :trigger="['click']">
      <a class="pl-2.5" @click.prevent>
        BI-CDP-Yu_Lan
        <cdp-icon name="downOutline" class="!w-[12px] ml-1.5 pb-0.5" />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="./login">{{ $t('common.logout') }}</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<style lang="scss" scoped></style>
