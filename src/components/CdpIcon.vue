<script lang="ts" setup>
interface Props {
  name: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: ''
})

const iconName = computed<string>(() => `#icon-${props.name}`)
const svgClass = computed<string>(() => {
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
</script>
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
    <use :xlink:href="iconName" />
  </svg>
</template>
<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: -0.125em;
  display: inline-block;
}
</style>
