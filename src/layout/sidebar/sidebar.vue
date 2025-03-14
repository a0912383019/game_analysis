<script lang="ts" setup>
import { useGlobalStore, useSystemStore } from '@/stores'
import { sidebarIcon, SidebarIconType } from '@/../public/js/system_config'
import { useRoute } from 'vue-router'

const route = useRoute()

const globalStore = useGlobalStore()
const systemStore = useSystemStore()

const selectedKeys = ref<string[]>([])

const openKeys = ref<string[]>([])

const findMenuItemAndParentKey = (path: string) => {
  if (!systemStore.menuList) {
    return { activeItem: null, parentKey: null } // 確保有回傳值
  }

  for (const item of systemStore.menuList) {
    if (item.urlPath === path) {
      return { activeItem: item, parentKey: null }
    }
    if (item.child) {
      const child = item.child.find((c) => c.urlPath === path)
      if (child) {
        return { activeItem: child, parentKey: item.key }
      }
    }
  }

  return { activeItem: null, parentKey: null } // 確保總是有回傳值
}

const toggleCollapsed = () => {
  globalStore.isSidebarClose = !globalStore.isSidebarClose
}

const toggleIconName = computed<string>(() =>
  globalStore.isSidebarClose ? 'unionRight' : 'unionLeft'
)

// 刷新頁面取得當前要高亮的 sidebar
watchEffect(() => {
  const { activeItem } = findMenuItemAndParentKey(route.path)
  selectedKeys.value = activeItem ? [activeItem.key] : []
})

onMounted(() => {
  // 第一次載入或是刷新頁面會根據路由高亮選單並展開
  const { parentKey } = findMenuItemAndParentKey(route.path)
  openKeys.value = parentKey ? [parentKey] : []
})
</script>
<template>
  <a-button
    size="large"
    class="sidebar-toggle-btn"
    :class="{ moved: globalStore.isSidebarClose }"
    @click="toggleCollapsed"
  >
    <template #icon>
      <cdp-icon class="!align-middle" :name="toggleIconName" />
    </template>
  </a-button>
  <a-layout class="sidebar">
    <a-layout-sider v-model:collapsed="globalStore.isSidebarClose" collapsible>
      <transition name="fade">
        <div v-show="!globalStore.isSidebarClose" class="logo"></div>
      </transition>
      <a-menu
        theme="dark"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        v-model:openKeys="openKeys"
      >
        <template v-for="menuItem in systemStore.menuList">
          <template v-if="menuItem.child">
            <a-sub-menu :popupClassName="'sidebar__sub-menu'" :key="menuItem.key">
              <template #title>{{ $t(`sidebar.${menuItem.name}`) }}</template>
              <template #icon>
                <cdp-icon :name="sidebarIcon[menuItem.name as SidebarIconType]" />
              </template>
              <a-menu-item v-for="child in menuItem.child" :key="child.key">
                <router-link :to="child.urlPath || '/'"></router-link>
                <span> {{ $t(`sidebar.${child.name}`) }} </span>
              </a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="menuItem.key">
              <template #icon>
                <cdp-icon :name="sidebarIcon[menuItem.name as SidebarIconType]" />
              </template>
              <router-link :to="menuItem.urlPath || '/'"></router-link>
              <span> {{ $t(`sidebar.${menuItem.name}`) }} </span>
            </a-menu-item>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
  </a-layout>
</template>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.sidebar-toggle-btn {
  position: fixed;
  top: 10px;
  left: 200px;
  z-index: 101;
  color: #fff;
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  transition: all 0.2s ease;
  svg {
    width: 1.275em;
    height: 1.275em;
  }
  &:hover {
    color: #ffe5aa;
    border-color: var(--primary-color);
  }
  &.moved {
    left: 20px;
  }
}
.logo {
  top: 15px;
  left: 24px;
  position: absolute;
  width: 75px;
  height: 30px;
  flex-shrink: 0;
  z-index: 500;
  background: url('@/assets/images/BBIN.png') var(--primary-color) 50% / contain no-repeat;
}
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  :deep(.ant-menu-root) {
    height: calc(100vh - 85px); // 限制選單最大高度
    overflow-y: auto; // 允許滾動
  }
  :deep(.ant-layout-sider) {
    transition: all 0.2s ease;
  }
  :deep(.ant-layout-sider) {
    background: var(--primary-color);
    width: 250px !important;
    min-width: 250px !important;
    max-width: 250px !important;
    flex: 0 0 250px !important;
    &.ant-layout-sider-collapsed {
      flex: 0 0 80px !important;
      max-width: 80px !important;
      min-width: 80px !important;
      width: 80px !important;
    }
    .ant-layout-sider-trigger {
      display: none;
    }
    .ant-menu.ant-menu-root {
      margin-top: 70px;
    }
    .ant-menu-item {
      height: 44px !important;
      line-height: 44px !important;
    }
    .ant-menu {
      font-size: 16px;
      background: var(--primary-color);
      &.ant-menu-sub {
        background: none;
      }
      .ant-menu-item {
        margin: 0;
        border-radius: 0px 60px 60px 0px;
        &-selected {
          background-color: #ffffff1a;
          color: #ffe5aa;
        }
        &:hover {
          color: #ffe5aa;
          background-color: unset;
        }
        &:not(.ant-menu-item-selected):active {
          background-color: unset;
        }
        svg {
          font-size: 16px;
        }
      }
      .ant-menu-submenu {
        .ant-menu-item {
          margin-left: -20px;
          > span::before {
            content: '';
            display: inline-block;
            margin-right: 14px;
            width: 8px;
            height: 8px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            border-radius: 4px;
            background-color: #ffffff1a;
          }
        }
        .ant-menu-submenu-title {
          margin-inline: 0;
          border-radius: 0px 60px 60px 0px;
          &:hover {
            color: #ffe5aa;
            background-color: unset;
          }
          &:active {
            background-color: #ffffff1a;
          }
          .ant-menu-title-content:active {
            background-color: unset;
          }
          .ant-menu-submenu-arrow {
            display: none !important;
          }
          svg {
            font-size: 16px;
          }
        }
        &.ant-menu-submenu-selected {
          .ant-menu-submenu-title {
            background-color: #ffffff1a;
            .ant-menu-title-content {
              color: #ffe5aa;
            }
            svg {
              color: #ffe5aa;
            }
          }
          .ant-menu-item-selected {
            background-color: unset;
            > span::before {
              background-color: #ffe5aa;
            }
            color: #ffe5aa;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
// 縮小後的 hover 樣式
.ant-menu-submenu > .ant-menu {
  border-radius: 2px;
}
.sidebar__sub-menu {
  .ant-menu-item {
    height: 44px !important;
    line-height: 44px !important;
  }
  .ant-menu {
    font-size: 16px;
    background-color: var(--primary-color) !important;
    .ant-menu-item {
      > span::before {
        content: '';
        display: inline-block;
        margin-right: 14px;
        width: 8px;
        height: 8px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        background-color: #ffffff1a;
      }
      &:hover {
        color: #ffe5aa !important;
      }
    }
    .ant-menu-item-selected {
      color: #ffe5aa;
      background-color: #ffffff1a;
      > span::before {
        background-color: #ffe5aa;
      }
    }
    .ant-menu-item:not(.ant-menu-item-selected):active {
      background-color: #ffffff1a;
    }
  }
}
</style>
