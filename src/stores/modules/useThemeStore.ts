//主题设置


import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { themeState } from '../interface'

/**
 * 主题设置s
 */
export const useThemeStore = defineStore({
    id: 'useThemeStore',
    state: (): themeState => ({
        isDark: false, // 是否是暗黑模式
        primary: '#000000', // 设置主色
        language: 'Chinese' // 设置语言
    }),
    actions: {
        setDark(isDark: string | number | boolean) {
            this.isDark = isDark
        },
        setPrimary(primary: string) {
            // console.log(primary)
            this.primary = primary
        },
        setLanguage(language: string) {
            this.language = language
        },
    },
    persist: piniaPersistConfig('ThemeStore'),
})