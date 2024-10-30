//使用路由的懒加载

import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      redirect: "/home",
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/index.vue')
        },
        {
          path: '/animation',
          name: 'animation',
          component: () => import('@/views/animation/index.vue')
        },
        {
          path: '/discover',
          name: 'discover',
          component: () => import('@/views/discover/index.vue')
        },
        {
          path: '/discover/songlist',
          name: 'disonglist',
          component: () => import('@/views/discover/songlist/index.vue')
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('@/views/search/index.vue')
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('@/views/video/index.vue')
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/views/setting/index.vue')
        },

        {
          path: '/songlist',
          name: 'songlist',
          component: () => import('@/views/songlist/index.vue')
        },
        {
          path: '/test',
          name: 'test',
          component: () => import('@/views/test/index.vue')
        },
        {
          path: '/theme',
          name: 'theme',
          component: () => import('@/views/theme/index.vue')
        }
      ]
    },
  ]
})

export default router