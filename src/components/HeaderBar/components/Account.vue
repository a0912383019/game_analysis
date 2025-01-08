<script lang="ts" setup>
import { DownOutlined } from '@ant-design/icons-vue'
// const systemStore = useSystemStore()

// const { user_name, picture } = JSON.parse(sessionStorage.user_info)

const dropdownMenu = ref<HTMLElement | null>(null) // 明確類型
const dropdownVisible = ref(false)

// 開啟下拉
const handleDocumentClick = (e: Event) => {
  const target = e.target as HTMLElement

  if (target.closest('.targetDropDown')) {
    dropdownVisible.value = !dropdownVisible.value
  } else if (dropdownMenu.value && !dropdownMenu.value.contains(target)) {
    dropdownVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})
onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>
<template>
  <div class="flex">
    <a-dropdown :trigger="['click']">
      <a class="ant-dropdown-link" @click.prevent>
        Click me
        <DownOutlined />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <a href="http://www.alipay.com/">1st menu item</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a href="http://www.taobao.com/">2nd menu item</a>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">3rd menu item</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<style lang="scss" scoped>
.accountbox {
  display: flex;
  align-items: center;
  margin-left: auto;
  color: #fff;
  &__img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
    }
  }
  &__rightbox {
    position: relative;
    cursor: pointer;
  }
  &__name {
    cursor: pointer;
    padding-left: 10px;
  }
  &__icon {
    margin-left: 15px;
    font-size: 14px;
  }
  &__dropdown {
    position: absolute;
    right: 0;
    top: 140%;
    width: 140px;
    border: 1px solid #edf2fa;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background-color: #fff;
    font-size: 14px;
    a,
    button {
      display: block;
      width: 100%;
      padding: 10px 12px;
      color: #444;
      font-weight: 500;
      text-align: left;
      transition: all 0.5s;
      &:hover {
        color: #4f84cf;
        background-color: rgba(79, 132, 207, 0.1);
      }
    }
    .border-bottom {
      border-bottom: 1px solid #e9ecef;
    }
  }
}
</style>
