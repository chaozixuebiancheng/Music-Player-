<script setup lang="ts">
import MaterialSymbolsWbSunnyOutlineRounded from '~icons/material-symbols/wb-sunny-outline-rounded'
import MaterialSymbolsDarkModeOutlineRounded from '~icons/material-symbols/dark-mode-outline-rounded'
import axios from 'axios'

// 定义颜色列表的类型
interface ColorItem {
  hex: string;
  name: string;
  pinyin: string;
}

const themeStore = useThemeStore();
const { switchDark, changePrimary } = useTheme(); // 导入切换暗黑模式和修改主题颜色方法

const state = reactive({
  colorList: [] as ColorItem[], // 使用类型注解定义颜色列表
});

const { colorList } = toRefs(state);

// 利用调色板更改颜色
const changePrimarys = (e: string) => {
  const resultHex = rgbaToHex(e);
  // console.log(resultHex)
  changePrimary(resultHex);
};

// 更改颜色
function changeColor(color: string): void {
  // themeStore.setPrimary(color);
  changePrimary(color);
}

// 重置
const reset = (): void => {
  // themeStore.setPrimary('#000000');
  changePrimary('#000000');
};

/**
 * Rgba 转换 hex
 * @param rgba 颜色的字符串
 * @returns 返回处理后的颜色值
 */
function rgbaToHex(rgba: string): string {
  const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/;
  const match = rgba.match(regex);
  if (!match) {
    throw new Error('Invalid RGBA string');
  }
  console.log(match)
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  // console.log(r,g,b)
  const toHex = (value: number) => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex; // 确保每个分量都是两位
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

onMounted(() => {
  axios({
    method: 'get',
    url: 'https://mock.mengxuegu.com/mock/634f6425369a770d74bbf7b9/example/colorsList',
  }).then(({ data }: { data: ColorItem[] }) => {
    state.colorList = data;
  });
});

</script>
<template>
  <div class="w-full">
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2 dark:text-white">黑暗模式</h2>
      <el-switch v-model="themeStore.isDark" :active-action-icon="MaterialSymbolsWbSunnyOutlineRounded"
        :inactive-action-icon="MaterialSymbolsDarkModeOutlineRounded" @change="switchDark" />
    </div>
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2 dark:text-white">主题</h2>
      <el-scrollbar height="400px" class="rounded-lg dark:bg-gray-800">
        <div class="grid grid-cols-auto-fill gap-4">
          <a href="javascript:;" v-for="item in colorList" :key="item.name" @click="changeColor(item.hex)"
            class="bg-lightblue text-center rounded-md transition-transform duration-200 ease-in-out hover:scale-105 ">
            <div class="w-full h-32 rounded-lg" :style="{ backgroundColor: item.hex }"></div>
            <span class="text-sm line-clamp-1 text-gray-600 dark:text-gray-300">
              {{ item.name }} ({{ item.pinyin }})
            </span>
          </a>
        </div>
      </el-scrollbar>
    </div>
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2 dark:text-white">自定义</h2>
      <div class="flex items-center space-x-2">
        <el-color-picker v-model="themeStore.primary" show-alpha @change="changePrimarys" />
        <el-button color="#000" @click="reset">重置默认</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 定义 grid-cols-auto-fill 的 CSS 类 */
.grid-cols-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
</style>
