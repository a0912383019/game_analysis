<script lang="ts" setup>
interface ButtonIconProps {
  name?: string
  icon?: string
  size?: string
  color?: string
}

const props = withDefaults(defineProps<ButtonIconProps>(), {
  size: 'medium',
  color: 'blue'
})

const buttonClass = computed(() => {
  let className = ''
  className += `button__${props.size} `
  className += `button__${props.color}`

  return className
})
</script>
<template>
  <button class="!rounded-sm" :class="buttonClass">
    <cdp-icon v-if="props.icon" :name="props.icon" class="text-[15px] !ml-[-2px]" />
    <span class="ml-2 text-sm font-normal">
      {{ props.name }}
    </span>
  </button>
</template>
<style lang="scss" scoped>
button {
  border-width: 1px;
  border-style: solid;
  color: #fff;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  &:disabled {
    background-color: #cdd0dd !important;
    border-color: #cdd0dd !important;
    color: #fff !important;
  }
  &.button {
    &__medium {
      padding: 6px 8px;
      font-size: 13px;
      line-height: 1.2;
      border-radius: 5px;
      min-width: 86px;
      min-height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    &__blue {
      background-color: #508be5;
      border-color: #508be5;
    }
  }
  &:hover {
    &.button {
      &__blue {
        background-color: #1890ff;
        border-color: #1890ff;
      }
    }
  }
}
</style>
