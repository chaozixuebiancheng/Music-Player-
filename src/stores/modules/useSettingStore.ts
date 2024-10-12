//设置


import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
import { SettingState } from '../interface'

/**
 * 设置
 */
export const useSettingStore = defineStore({
    id: 'useSettingStore',
    state: (): SettingState => ({
        isDrawerCover: true,      // 抽屉封面背景
        isOriginalParsed: true,   // 歌词
        isRomaParsed: true,       // 罗马音
        isTranslatedParsed: true, // 翻译
    }),
    actions: {
        setOriginalParsed(isOriginalParsed: boolean) {
            this.isOriginalParsed = isOriginalParsed
        },
        setRomaParsed(isRomaParsed: boolean) {
            this.isRomaParsed = isRomaParsed
        },
        setTranslatedParsed(isTranslatedParsed: boolean) {
            this.isTranslatedParsed = isTranslatedParsed
        },
        setDrawerCover(isDrawerCover: boolean) {
            this.isDrawerCover = isDrawerCover
        },

    },
    persist: piniaPersistConfig('SettingStore'),
})