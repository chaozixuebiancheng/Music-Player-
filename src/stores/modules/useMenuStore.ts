//左侧菜单当前所在的索引仓库


import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { menuState } from '../interface'

/**
 * 主题设置s
 */
export const useMenuStore = defineStore({
    id: 'useMenuStore',
    state: (): menuState => ({
        menuIndex: '1-0',
    }),
    actions: {
        setMenuIndex(menuIndex: string) {
            this.menuIndex = menuIndex
        },

    },
    persist: piniaPersistConfig('MenuStore'),
})