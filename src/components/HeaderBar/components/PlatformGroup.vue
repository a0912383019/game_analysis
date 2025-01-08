<script lang="ts" setup>
import { platformDict } from "@/../public/js/system_config";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

const selectPlatform = ref<string>("bbin");

const onSelect = (value: string) => {
  selectPlatform.value = value;
  globalStore.currentPlatform = value;
};
</script>
<template>
  <div class="button-group">
    <a-button
      v-for="item in platformDict"
      :key="item.name.toLowerCase()"
      :type="selectPlatform === item.name.toLowerCase() ? 'primary' : 'default'"
      @click="onSelect(item.name.toLowerCase())"
    >
      {{ item.name }}
    </a-button>
  </div>
</template>
<style lang="scss" scoped>
.button-group {
  display: flex;
  gap: 15px;
}
</style>
