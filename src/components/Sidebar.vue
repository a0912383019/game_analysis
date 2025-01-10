<script lang="ts" setup>
import { useSidebarStore } from '@/stores/sidebar'
import { sidebarIcon, SidebarIconType } from '@/../public/js/system_config'
import type { MenuItem } from '@/types/entities/components/sidebar'

const sidebarStore = useSidebarStore()

const selectedKeys = ref<string[]>(['home'])

const toggleCollapsed = () => {
  sidebarStore.isSidebarClose = !sidebarStore.isSidebarClose
}

const toggleIconName = computed<string>(() =>
  sidebarStore.isSidebarClose ? 'unionRight' : 'unionLeft'
)

const menuList = ref<MenuItem[]>([
  {
    name: 'home',
    urlPath: '/home'
  },
  {
    name: 'operations_center',
    child: [
      { name: 'summary_report', urlPath: '/summary_report' },
      { name: 'operational_analysis_chart', urlPath: '/operational_analysis_chart' },
      { name: 'regional_volume_differences', urlPath: '/regional_volume_differences' },
      { name: 'device_volume_difference', urlPath: '/device_volume_difference' },
      { name: 'member_bet_inquiry', urlPath: '/member_bet_inquiry' },
      { name: 'game_comparison_chart', urlPath: '/game_comparison_chart' }
    ]
  },
  {
    name: 'risk_center',
    urlPath: '/home'
  },
  {
    name: 'member_center',
    urlPath: '/home'
  },
  {
    name: 'live_report',
    urlPath: '/home'
  },
  {
    name: 'prob_report',
    urlPath: '/home'
  },
  {
    name: 'user_management',
    urlPath: '/home'
  }
])
</script>
<template>
  <a-button
    size="large"
    class="sidebar-toggle-btn"
    :class="{ moved: sidebarStore.isSidebarClose }"
    @click="toggleCollapsed"
  >
    <template #icon>
      <cdp-icon :name="toggleIconName" />
    </template>
  </a-button>
  <a-layout class="sidebar">
    <a-layout-sider v-model:collapsed="sidebarStore.isSidebarClose" collapsible>
      <transition name="fade">
        <div v-show="!sidebarStore.isSidebarClose" class="logo"></div
      ></transition>
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <template v-for="menuItem in menuList">
          <a-sub-menu v-if="menuItem.child" :popupClassName="'sidebar__sub-menu'">
            <template #title>{{ $t(`sidebar.${menuItem.name}`) }}</template>
            <template #icon>
              <cdp-icon :name="sidebarIcon[menuItem.name as SidebarIconType]" />
            </template>
            <a-menu-item v-for="child in menuItem.child" :key="child.name">
              <router-link :to="child.urlPath || '/'"></router-link>
              <span> {{ $t(`sidebar.${child.name}`) }} </span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item v-else :key="menuItem.name">
            <template #icon>
              <cdp-icon :name="sidebarIcon[menuItem.name as SidebarIconType]" />
            </template>
            <router-link :to="menuItem.urlPath || '/'"></router-link>
            <span> {{ $t(`sidebar.${menuItem.name}`) }} </span>
          </a-menu-item>
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
  position: absolute;
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
  background: url('../assets/images/BBIN.png') var(--primary-color) 50% / contain no-repeat;
}
.sidebar {
  z-index: 100;
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
      margin-top: 60px;
    }
    .ant-menu {
      padding-right: 10px;
      background: var(--primary-color);
      &.ant-menu-sub {
        background: none;
      }
      .ant-menu-item {
        border-radius: 0px 60px 60px 0px;
        &-selected {
          background-color: #ffffff1a;
          color: #ffe5aa;
        }
        &:hover {
          color: #ffe5aa;
          background-color: #ffffff1a;
        }
        &:not(.ant-menu-item-selected):active {
          background-color: #ffffff1a;
        }
        svg {
          font-size: 14px;
        }
      }
      .ant-menu-submenu {
        .ant-menu-item {
          > span::before {
            content: '';
            display: inline-block;
            margin-right: 10px;
            width: 8px;
            height: 8px;
            -moz-border-radius: 4px;
            -webkit-border-radius: 4px;
            border-radius: 4px;
            background-color: #ffffff1a;
          }
        }
        .ant-menu-item:hover {
          color: #fff;
          background-color: #ffffff1a;
        }
        .ant-menu-submenu-title {
          border-radius: 0px 60px 60px 0px;
          &:hover {
            color: #ffe5aa;
            background-color: #ffffff1a;
          }
          &:active {
            background-color: #ffffff1a;
          }
          .ant-menu-title-content:active {
            background-color: unset;
          }
          svg {
            font-size: 14px;
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
            > span::before {
              background-color: #ffe5aa;
            }
            &:hover {
              background-color: #ffffff1a;
            }
            background-color: initial;
            color: #ffe5aa;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.sidebar__sub-menu {
  .ant-menu {
    background-color: var(--primary-color) !important;
    .ant-menu-item {
      > span::before {
        content: '';
        display: inline-block;
        margin-right: 10px;
        width: 8px;
        height: 8px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        background-color: #ffffff1a;
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
