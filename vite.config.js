import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    // 端口号
    // port: 8002,
    // 接口名称替换代理
    proxy: {
      '/api':'http://localhost:5080/'
    }
    // cors:true // 允许跨域
  },
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"src")
    }
  },
})
