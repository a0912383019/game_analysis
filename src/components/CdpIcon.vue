<script lang="ts" setup>
interface Props {
  name: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: ''
})

const iconName = computed<string>(() => `#icon-${props.name}`)
</script>
<template>
  <svg
    class="fill-current w-[1em] h-[1em] align-[-0.125em] inline-block"
    v-bind="$attrs"
    :style="{ color: color }"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>
<style lang="scss"></style>
