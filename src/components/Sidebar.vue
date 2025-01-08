<script lang="ts" setup>
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
} from "@ant-design/icons-vue";
import { useSidebarStore } from "@/stores/sidebar";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();
const sidebarStore = useSidebarStore();

const state = reactive({
  selectedKeys: ["1"],
  openKeys: ["sub1"],
  preOpenKeys: ["sub1"],
});

const toggleCollapsed = () => {
  sidebarStore.isSidebarClose = !sidebarStore.isSidebarClose;
  state.openKeys = sidebarStore.isSidebarClose ? [] : state.preOpenKeys;
  // iconName.value = sidebarStore.isSidebarClose ? "UnionRight" : "UnionLeft";
};

const toggleIconName = computed(() =>
  sidebarStore.isSidebarClose ? "UnionRight" : "UnionLeft"
);

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal;
  }
);
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
  <div class="sidebar">
    <div v-show="!sidebarStore.isSidebarClose" class="sidebar__bbin"></div>
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :inline-collapsed="sidebarStore.isSidebarClose"
      theme="dark"
    >
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <router-link to="/home"></router-link>
        <span> {{ $t("sidebar.home") }} </span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>營運中心</template>
        <a-menu-item key="2">
          <router-link to="/total_m"> </router-link>
          <span> 總報表 </span>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/total_s"> </router-link>
          <span> 營運分析圖 </span>
        </a-menu-item>
        <a-menu-item key="4">地區貨量差異</a-menu-item>
        <a-menu-item key="5">裝置貨量差異</a-menu-item>
        <a-menu-item key="6">會員注單查詢</a-menu-item>
        <a-menu-item key="7">遊戲比較圖表</a-menu-item>
      </a-sub-menu>
      <a-menu-item key="8">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>風控中心</span>
      </a-menu-item>
      <a-menu-item key="9">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>會員中心</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<style lang="scss" scoped>
.sidebar-toggle-btn {
  position: absolute;
  top: 10px;
  left: 200px;
  z-index: 101;
  transition: all 0.2s ease;
  &.moved {
    left: 20px;
  }
}
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0px;
  top: 0px;
  bottom: 0;
  overflow-y: scroll;
  z-index: 100;
  &__bbin {
    top: 15px;
    left: 24px;
    position: absolute;
    width: 75px;
    height: 30px;
    flex-shrink: 0;
    z-index: 500;
    background: url("../assets/images/BBIN.png") var(--primary-color) 50% /
      contain no-repeat;
  }
  :deep(.ant-menu) {
    background: var(--primary-color);
    &.ant-menu-sub {
      background: none;
    }
    .ant-menu-item-selected {
      background-color: #ffffff1a;
      color: #ffe5aa;
    }
    .ant-menu-item:hover {
      color: #ffe5aa;
    }
  }
  > ul {
    padding-top: 60px;
    min-height: 100%;
    transform: translateZ(0);
    border-right: 0;
    ul li span::before {
      content: "";
      display: inline-block;
      margin-right: 5px;
      width: 8px;
      height: 8px;
      -moz-border-radius: 4px;
      -webkit-border-radius: 4px;
      border-radius: 4px;
      background-color: #ffffff1a;
    }
  }
  :deep(.ant-menu-dark .ant-menu-item-selected .ant-menu-item-icon) {
    color: #ffe5aa;
    + span {
      color: #ffe5aa;
    }
  }
  :deep(.ant-menu-submenu-selected) {
    color: #ffe5aa;
    .ant-menu-item-selected .ant-menu-title-content {
      span::before {
        background-color: #ffe5aa;
      }
    }
  }
}
</style>
