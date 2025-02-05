<script lang="ts" setup>
interface ButtonItem {
  name: string
  value: number | string
}

interface ButtonGroupProps {
  itemObj?: ButtonItem[]
}

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  itemObj: () => [
    { name: '聽主', value: 1 },
    { name: '遊戲', value: 2 },
    { name: '玩法', value: 3 }
  ]
})

const selectedItems = ref<number | string>(props.itemObj[0].value)

const emit = defineEmits(['update:modelValue'])

const onSelect = (value: string | number) => {
  selectedItems.value = value
  emit('update:modelValue', value)
}
</script>
<template>
  <div class="flex gap-2">
    <a-button
      v-for="item in props.itemObj"
      class="border-[#E8E9EC] rounded w-[70px] h-[30px] hover:!border-[var(--primary-color)]"
      :class="{
        '!bg-[var(--primary-color)] hover:!bg-[var(--primary-color)] hover:!text-[#fff]':
          selectedItems === item.value,
        'hover:!text-[var(--primary-color)]': selectedItems !== item.value
      }"
      :key="item.value"
      :type="selectedItems === item.value ? 'primary' : 'default'"
      @click="onSelect(item.value)"
    >
      {{ item.name }}
    </a-button>
  </div>
</template>
<style lang="scss" scoped></style>
