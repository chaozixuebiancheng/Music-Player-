<script setup lang="ts">
import Header from './components/Header/Header.vue'
import Menu from './components/Menu/Menu.vue'
import Main from './components/Main/Main.vue'
import Footer from './components/Footer/Footer.vue'

// 创建了一个响应式对象，并且该对象中有一个show方法，返回值为void
const PlayerDrawerRef = ref<{ show: () => void }>()

// 共享播放器状态
provide('MusicPlayer', useMusicPlayer())

const handleShow = () => {
  if (PlayerDrawerRef.value) {
    // console.log(PlayerDrawerRef.value)
    // 控制歌词界面的显示与隐藏
    PlayerDrawerRef.value.show()
  }
}
</script>
<template>
  <div class="flex flex-col bg-[#dde2eb] dark:bg-[#333333] h-full w-full items-center justify-center py-6 px-10">
    <div
      class="flex backdrop-blur-lg flex-col justify-center rounded-3xl shadow-xl h-full w-full overflow-hidden bg-white dark:bg-[--el-bg-color]">
      <Header />
      <section class="flex flex-1 overflow-x-hidden">
        <Menu />
        <Main />
      </section>
      <!-- 接受footer传过来的事件（如果点击了图片，则显示出歌词界面） -->
      <Footer @show="handleShow" />
      <!-- DrawerPlayer是组件中的，是歌词的界面 -->
      <DrawerPlayer ref="PlayerDrawerRef" />
    </div>
  </div>
</template>
