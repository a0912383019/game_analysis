<template>
  <div>
    <div class="chat-button-bg">
      <cdp-icon name="chat" class="text-[27px] !ml-2 !mt-3 !text-[#ffffff]"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

function toggleChat() {
  //   isOpen.value = !isOpen.value
}
</script>
<style lang="scss" scoped>
.chat-button-bg {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background-color: #508be5;
  border-top-left-radius: 60px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.chat-button-bg:hover {
  transform: scale(1.2);
}
</style>
