<script setup>
import { ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

const visible = ref(false)

function toggleChat() {
  visible.value = !visible.value
}

const closeChat = () => {
  visible.value = false
}

const handleTitleBarScroll = (event) => {
  // 阻止滾輪事件的默認行為，即阻止頁面滾動
  event.preventDefault()
}
</script>
<template>
  <div>
    <div v-show="!visible" class="chat-button-bg" @click="toggleChat">
      <cdp-icon name="chat" class="text-[27px] !ml-2 !mt-3 !text-[#ffffff]" />
    </div>
  </div>
  <div
    v-show="visible"
    class="fixed bottom-4 right-4 w-[450px] bg-white rounded-xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)] z-50 overflow-hidden"
  >
    <!-- 標題列 -->
    <div
      @wheel.prevent="handleTitleBarScroll"
      class="bg-[#FFFFFF] text-center !py-4 text-[#508BE5] !font-semibold shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
    >
      智能客服
      <button class="absolute cursor-pointer right-3 top-4 text-gray-400 hover:text-gray-600" @click="closeChat">
        <CloseOutlined />
      </button>
    </div>

    <!-- 內容區塊 -->
    <div
      class="p-4 flex flex-col items-center text-sm text-gray-600 h-[520px] overflow-y-auto max-h-[520px] overscroll-y-contain"
    >
      <!-- Icon -->
      <div class="w-15 bg-[#e3efff] rounded-full !mb-4 !mt-4">
        <cdp-icon name="robotHead" class="text-[37px] !ml-3 !h-15 !text-[#508BE5]" />
      </div>
      <!-- 提示文字 -->
      <p class="text-center mb-4 leading-5 text-base !mb-4">
        親，有什麼可以幫您的呢？
      </p>
      <div class="w-5/6">
        <button
          class="w-full text-white bg-[#3c81f6] hover:bg-[#2c6edb] rounded-full !py-2 !px-4 text-sm transition !my-3"
        >
          09/18 ～ 09/19 esb 會員 abc123 遊玩糖果派對，損益跟獲利比最高的會員
        </button>
        <button
          class="w-full text-white bg-[#3c81f6] hover:bg-[#2c6edb] rounded-full !py-2 !px-4 text-sm transition"
        >
          09/18 ～ 09/19 esb 會員 yy9001 遊玩梯子遊戲
        </button>
      </div>
    </div>

    <!-- 輸入欄 -->
    <div
      @wheel.prevent="handleTitleBarScroll"
      class="bg-[#FFFFFF] text-center !py-4 text-[#508BE5] !font-semibold shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
    >
      <input
        type="text"
        placeholder="您可以問任何問題..."
        class="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        class="ml-2 text-white bg-[#3c81f6] hover:bg-[#2c6edb] rounded-full w-9 h-9 flex items-center justify-center"
      >
        <svg class="w-5 h-5 rotate-45" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M2.94 2.94a1.5 1.5 0 012.12 0l12 12a1.5 1.5 0 01-2.12 2.12L3.06 5.06a1.5 1.5 0 010-2.12z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
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
<style lang="scss">
// .chat-robot {
//   .ant-modal {
//     position: absolute;
//     right: 15px;
//     top: auto;
//     bottom: 15px;
//     width: 360px;
//     padding-bottom: 0px;
//   }
//   .ant-modal-content {
//     height: 600px;

//   }
// }
</style>
