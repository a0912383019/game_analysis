<script lang="ts" setup>
import { ref } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

const visible = ref(false)
const inputText = ref('')
const contentAreaRef = ref()
const textareaRef = ref()

const toggleChat = () => {
  visible.value = !visible.value
}

const closeChat = () => {
  visible.value = false
}

const handleContentAreaScroll = (event) => {
  if (!contentAreaRef.value) return

  const el = contentAreaRef.value
  // 判斷內容區塊是否可以滾動 (內容實際高度 > 可視高度)
  const isContentScrollable = el.scrollHeight > el.clientHeight

  if (!isContentScrollable) {
    // 如果內容不足以滾動，則阻止事件的默認行為，防止頁面滾動
    event.preventDefault()
  }
  // 如果內容可以滾動，則不preventDefault()，讓元素自身滾動。
  // overscroll-y-contain 會在滾到極限時阻止事件冒泡到頁面。
}

const handleChatWindowScroll = (event) => {
  const target = event.target

  // Check if the target of the scroll event is either the textarea or the content area
  // AND if that element is currently scrollable.
  // If it is, we do NOT prevent default here, letting the element scroll naturally.
  if (
    (target === textareaRef.value &&
      textareaRef.value.scrollHeight > textareaRef.value.clientHeight) ||
    (target === contentAreaRef.value &&
      contentAreaRef.value.scrollHeight > contentAreaRef.value.clientHeight)
  ) {
    // Let the element scroll naturally. overscroll-y-contain will handle containment.
    return
  }

  // If the scroll event originated from an element that is NOT scrollable
  // (e.g., textarea when empty, title bar, buttons, or content area when not overflowing)
  // OR if it's the main chat window itself, then we prevent default to stop page scroll.
  event.preventDefault()
}

const handleEnter = (e) => {
  e.preventDefault()
  if (inputText.value.trim() !== '') {
    sendMessage()
  }
}

// 模擬送出訊息
const sendMessage = () => {
  // console.log('送出訊息:', inputText.value)
  // inputText.value = ''
  const content = inputText.value.trim()
  if (!content) return

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content,
    time: now,
  })

  inputText.value = ''

  // 模擬 bot 回覆
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      role: 'bot',
      content: `這是機器人的回覆：\n你剛剛說了：${content}`,
      time: now,
    })
  }, 500)
}

// textarea 根據輸入調整高度
watch(
  () => inputText.value,
  () => {
    const el = textareaRef.value
    if (el && inputText.value === '') {
      el.style.height = '40px'
    } else if (el) {
      el.style.height = el.scrollHeight + 'px'
    }
  }
)

interface ChatMessage {
  id: string | number
  role: 'user' | 'bot'
  content: string
  time: string
}

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'user',
    content: '09/18 ～ 09/19 esb 會員 abc123 遊玩糖果派對 獲利最高的注單',
    time: '13:16 PM',
  },
  {
    id: 2,
    role: 'bot',
    content:
      '09/18 ～ 09/19 esb 會員 abc123 遊玩糖果派對 獲利最高的注單號為\n19399963107',
    time: '13:16 PM',
  },
])
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
      @wheel="handleChatWindowScroll"
      class="bg-white text-center !py-4 text-[#508BE5] !font-semibold shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
    >
      智能客服
      <button
        class="absolute cursor-pointer right-3 top-4 text-gray-400 hover:text-gray-600"
        @click="closeChat"
      >
        <CloseOutlined />
      </button>
    </div>
    <!-- 內容區塊 -->
    <div
      @wheel.prvent="handleContentAreaScroll"
      ref="contentAreaRef"
      class="p-4 flex flex-col items-center text-sm text-gray-600 h-[520px] max-h-[520px] overflow-y-auto overscroll-y-contain"
    >
      <!-- Icon -->
      <div class="w-15 bg-[#e3efff] rounded-full !mb-4 !mt-4">
        <cdp-icon name="robotHead" class="text-[37px] !ml-3 !h-15 !text-[#508BE5]" />
      </div>
      <!-- 提示文字 -->
      <p class="text-center mb-4 leading-5 text-base !mb-4">親，有什麼可以幫您的呢？</p>
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
      <div v-for="msg in messages" :key="msg.id" class="w-full flex flex-col items-start mb-4">
        <div class="w-full flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
          <!-- Bot Icon -->
          <div
            v-if="msg.role === 'bot'"
            class="flex-shrink-0 bg-[#e3efff] rounded-full w-[40px] h-[40px] flex items-center justify-center mr-2"
          >
            <cdp-icon name="robotHead" class="text-[22px] text-[#508BE5]" />
          </div>

          <!-- Message Bubble -->
          <div
            class="rounded-xl px-4 py-3 text-sm whitespace-pre-wrap max-w-[70%] shadow"
            :class="
              msg.role === 'user'
                ? 'bg-[#3c81f6] text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none'
            "
          >
            {{ msg.content }}
          </div>
        </div>
        <!-- Time -->
        <div
          class="text-[11px] mt-1 text-gray-400"
          :class="msg.role === 'user' ? 'text-right self-end pr-12' : 'text-left pl-12'"
        >
          {{ msg.time }}
        </div>
      </div>
    </div>
    <!-- 輸入欄 -->
    <div
      @wheel="handleChatWindowScroll"
      class="bg-white !py-3 shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.1)]"
    >
      <div class="w-full !px-3 flex">
        <textarea
          v-model="inputText"
          ref="textareaRef"
          @keydown.enter.exact.prevent="handleEnter"
          placeholder="您可以問任何問題..."
          class="resize-none flex-1 !max-h-[200px] leading-[20px] h-[40px] !mr-3 !px-3 !py-[10px] overflow-y-auto overscroll-y-contain text-sm bg-[#0611270A] placeholder-gray-400 rounded-[20px] focus:outline-none focus:ring-1 focus:ring-blue-300"
        ></textarea>
        <button
          @click="handleEnter"
          class="text-white bg-[#3c81f6] hover:bg-[#2c6edb] rounded-full w-10 h-10 flex items-center justify-center"
        >
          <cdp-icon name="talkPlane" class="text-[18px] !ml-1" />
        </button>
      </div>
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
  z-index: 99;
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
