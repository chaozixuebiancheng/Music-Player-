<script setup lang="ts">
import { Comment } from '@/api/interface'

const drawer = defineModel() // 获取抽屉的状态
let props = defineProps({
  direction: {
    type: String as PropType<'rtl' | 'ltr' | 'ttb' | 'btt'>,
    default: 'rtl',
  },
  // 获取评论的数据
  data: {
    type: Array as PropType<Comment[]>,
    default: () => [],
  },
})
const Emit = defineEmits(['DIntersect'])
// 每一项的高度
let itemHeight = 76
// 容器的高度
let containerHeight = 456
//获取容器的总高度
const totalHeight = computed(() => {
  const totalItemHeight = props.data.length * itemHeight
  return totalItemHeight
})
// 设置可见起始索引和可见结束索引
const visibleStart = ref(0)
const visibleEnd = ref(6)
// 监听滚动事件，设置可显示的索引
function handleScroll(event:Event) {
  const scrollTop = (event.target as HTMLElement).scrollTop
  // console.log(scrollTop)
  visibleStart.value = Math.floor(scrollTop/itemHeight)
  visibleEnd.value = Math.min(props.data.length - 1,Math.floor((scrollTop + containerHeight)/itemHeight))
  // console.log(visibleStart.value,visibleEnd.value)
}
// 使用计算属性，计算出可以显示的列表
const visibleComments = computed(() => {
  return props.data.slice(visibleStart.value,visibleEnd.value)
})
// 观测是否请求新的数据
let pageNum = 1
watch(visibleEnd,(val) => {
  if(val === (pageNum-1)*30+28) 
{
  pageNum++
  Emit('DIntersect',pageNum)
}
})
</script>
<template>
  <el-drawer v-model="drawer" :title="'评论'+  visibleStart+visibleEnd" :direction="direction" class="!w-[50%]">
      <!-- <div>
        <h2 class="text-3xl font-bold">Comments</h2>
        <p class="text-muted-foreground">
          Share your thoughts and feedback on this article.
        </p>
      </div> -->
      <!-- 这个容器内部，超出高度就可以滚动 -->
      <div class=" h-112 overflow-y-auto" @scroll="handleScroll">
        <div :style="{ height: totalHeight + 'px', position: 'relative' }">
          <div :style="{ position: 'absolute', top: visibleStart * itemHeight + 'px' }" class="space-y-3">
  <div class="flex items-start gap-4 h-16" v-for="item in visibleComments" :key="item.commentId" >
    <span class="relative flex shrink-0 overflow-hidden  rounded-full h-10 w-10 border">
      <el-avatar :src="item.user.avatarUrl + '?param=60y60'" :alt="item.user.nickname" />
    </span>
    <div class="grid gap-2">
      <div class="flex items-center gap-2">
        <div class="font-medium text-base">{{ item.user.nickname }}</div>
        <div class="text-xs text-muted-foreground">{{ item.timeStr }}</div>
        <div class="text-xs text-muted-foreground">IP: {{ item.ipLocation.location }}</div>
      </div>
      <p class="text-sm">{{ item.content }}</p>
    </div>
  </div>
  </div>
  </div>
</div>

  </el-drawer>
</template>
