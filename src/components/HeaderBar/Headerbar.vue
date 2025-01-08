<script lang="ts" setup>
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()
</script>
<template>
  <header :class="{ isClose: sidebarStore.isSidebarClose }">
    <platform-group />
    <ul class="list">
      <li class="list__account">
        <account />
      </li>
    </ul>
  </header>
</template>
<style lang="scss" scoped>
header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: 260px;
  color: black;
  background: #fff;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease;
  &.isClose {
    padding-left: 95px;
  }
}
.list {
  display: flex;
  align-items: center;
  margin-left: auto;
  li {
    list-style: none;
  }
  &__hall {
    margin-right: 10px;
  }
  &__lang {
    width: 150px;
    margin-right: 15px;
  }
}
</style>
