import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { API_URL } from '@/constants/constant';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // 配置代理，目标地址为想访问的 API 地址
      '/api': {
        target: API_URL, // 后端API地址
        changeOrigin: true,  // 支持跨域请求
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，将 /api 去掉
      },
    },
  },
})
