import { createApp } from 'vue'
import './style.css'
import router from '../src/router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import './utils/rem/index'
import App from './App.vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(router)
app.use(store)
app.mount('#app')
