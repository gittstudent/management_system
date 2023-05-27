# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

# 项目运行命令
npm run dev

# 项目打包命令
npm run build

## 后台管理系统项目搭建

# 工具
1. npm init vite                                                // 使用vite创建项目
2. npm install element-plus --save                              // 安装element-plus
3. npm i -D vite-plugin-windicss windicss                       // 安装windicss
4. npm i pinia -S                                               // 安装pinia状态管理（基于vuex）
5. npm i @vueuse/core --save                                    // 安装api插件
6. npm i axios --save                                           // 安装axios

# 初始化配置
1. vite.config.js  中
    import WindiCSS from 'vite-plugin-windicss'
    export default defineConfig({
        resolve:{
            alias:{
            "@":path.resolve(__dirname,"src")
        }
    },
    plugins: [vue(),WindiCSS()],
    })

2. main.js 中
import { createApp } from 'vue'
import './style.css'
import router from '../src/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import store from './store'
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')

3. 创建router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
    {
    path: '/',
    component: () => import('@/views/index.vue')
 },
 // 404
 {
    path:'/:pathMatch(.*)*',
    name:"NotFound",
    component: () => import('@/views/404.vue')
 }

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router

4. 创建 views/index.vue


# api接口 
api
   user.ts                                      // 登录模块api
   my.ts                                        // 我的模块api

# 静态资源
assest
   img                                          // 图片资源
      tabBar                                    // 底部导航栏图片
      home                                      // 首页图片
      interrogation                             // 问诊图片
      my                                        // 我的图片
      login                                     // 登录图片
   css                                          // 样式资源
      style.css                                 // 公共样式
// 创建好文件后 修改main.ts css的导入和vant中css的导入   

# 项目公共组件
components
    FooterTabber.vue                            // 底部导航组件
    PaySuccess.vue                              // 支付成功组件


# 项目页面结构
views
    index                                           // 项目首页
    404                                             // 404页面
    login    
        index.vue                                   // 登录页


