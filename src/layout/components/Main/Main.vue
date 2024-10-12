<template>
  <main
    class="bg-white dark:bg-[--el-bg-color] block w-full h-full flex-1 box-border overflow-x-hidden duration-300 ease-in-out dark:text-neutral-200"
  >
  <!-- Component是当前路由匹配的组件，route是路由信息对象 -->
    <router-view v-slot="{ Component, route }">
      <!-- 这里的Component是动态组件，用来渲染不同的组件 -->
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </router-view>
  </main>
</template>
