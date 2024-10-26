<!-- 这是侧边栏界面 -->

<script setup lang="ts">
import { userPlaylistRes } from '@/api/interface' // 导入定义歌单结构的接口
import { MenuData } from './data' //菜单栏对象
import { userPlaylist } from '@/api' // 获取用户歌单api
import { Icon } from '@iconify/vue' // 获取图标
const menuStore = useMenuStore() //左侧菜单当前所在的索引仓库
const router = useRouter() 
const userStore = useUserStore()
const playlists = ref<userPlaylistRes[]>([]) //歌单

// 监听按键按下事件
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

// 使用箭头函数精准监听userStore中的某个属性，
watch(
  () => userStore.userInfo,
  () => {
    if (Object.keys(userStore.userInfo).length > 0) {
      userPlaylist<{ playlist: userPlaylistRes[] }>({
        id: userStore.userInfo.userId,
      }).then(({ playlist }) => {
        playlists.value = playlist
      })
    }
    else playlists.value = []
  },
  {
    immediate: true,
  }
)

// 监听快捷键 使用快捷键快速跳转
const handleKeyDown = (event: KeyboardEvent): void => {
  // 监听 Ctrl + D
  if (event.ctrlKey && event.key === 'd') {
    event.preventDefault()
    router.push('/discover')
    menuStore.setMenuIndex('2-0')
  }
  // 监听 Ctrl + Q
  if (event.ctrlKey && event.key === 'q') {
    event.preventDefault()
    router.push('/theme')
    menuStore.setMenuIndex('3-3')
  }
}
</script>


<template>
  <aside
    class="w-64 dark:border-gray-600 h-full border-r box-border flex flex-col overflow-x-hidden"
  >
    <!-- 个人信息界面 -->
    <div class="flex flex-col items-center p-4 gap-2">
      <span class="relative flex h-24 w-24 shrink-0">
        <img
          class="aspect-square h-full w-full rounded-full"
          src="@/assets/gthub-avatar.png"
        />
      </span>
      <a href="https://github.com/chaozixuebiancheng" target="_blank">
        <div
          class="flex items-center bg-black text-white gap-1 text-xs p-1 rounded-lg"
        >
          <img
            alt="GitHub User's stars"
            src="https://img.shields.io/github/stars/chaozixuebiancheng?style=flat&logo=github&label=Chaozi&labelColor=%2523000&color=%2523000"
          />
        </div>
      </a>
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
        Kuriyama Mirai Player
      </h2>
    </div>
    <nav
      class="flex flex-col p-4 space-y-4 flex-1 h-full box-border overflow-x-hidden"
    >
      <div
        v-for="(item, index) in MenuData"
        :key="index"
        class="w-full flex flex-col gap-1"
      >
        <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {{ item.title }}
        </h3>
        <router-link
          class="rounded-lg w-full py-2 px-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-[#414243] transition ease-in-out duration-200"
          :to="item2.router"
          v-for="(item2, index2) in item.children"
          :data-index="index + '-' + index2"
          :key="index2"
          :class="
            menuStore.menuIndex == index + '-' + index2
              ? 'bg-gray-200 dark:bg-[#414243]'
              : ''
          "
          @click="menuStore.setMenuIndex(index + '-' + index2)"
        >
          <Icon :icon="item2.icon" />
          <span class="text-sm">{{ item2.title }}</span>
          <span
            v-if="item2.shortcut"
            class="!ml-auto text-[10px] text-muted-color bg-emphasis border-surface p-1 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            {{ item2.shortcut }}
          </span>
        </router-link>
      </div> 
      <!-- 登陆后将会显示我的歌单-->
      <div class="w-full flex flex-col gap-1 ">
        <h3 class="text-xs font-semibold text-gray-500 dark:text-gray-400">
          我的歌单
        </h3>
        <el-scrollbar class="flex-1 overflow-x-hidden">
          <router-link
            class="rounded-lg w-full py-2 px-2 flex items-center space-x-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition ease-in-out duration-200"
            v-for="(item, index) in playlists"
            :to="`/songlist?id=${item.id}`"
            :key="index"
          >
            <el-image
              class="w-7 h-7 rounded-lg"
              :src="item.coverImgUrl + '?param=50y50'"
              :alt="item.name"
            />
            <span class="text-sm line-clamp-1">{{ item.name }}</span>
          </router-link>
        </el-scrollbar>
      </div>
    </nav>
  </aside>
</template>
