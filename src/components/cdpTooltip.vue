<script lang="ts" setup>
interface TooltipProps {
  text?: string
}

const props = withDefaults(defineProps<TooltipProps>(), {
  text: ''
})
</script>
<template>
  <a-tooltip placement="topLeft" :title="props.text" color="#585d65">
    <cdp-icon name="info" class="text-[16px] !mr-1" />
  </a-tooltip>
</template>
<style lang="scss" scoped></style>
