import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

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
      // 配置代理，目标地址为你想访问的 API 地址
      '/api': {
        target: 'https://openapi.youdao.com', // 后端API地址
        changeOrigin: true,  // 支持跨域请求
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写路径，将 /api 去掉
      },
    },
  },
})
