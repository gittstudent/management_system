import axios from 'axios'
import config from '../config'
let baseURL = config.baseApi // 这里是 vite.config.ts 做代理 将http://localhost:5080/ 赋值给/api 那么 /api就是http://localhost:5080/
const service = axios.create({
  baseURL, // 后台接口相同地址
  timeout:10000 // 请求时间 超时 不可请求
})

// 发起请求之前的拦截器 作用是简化了前端发送请求 并在请求头存放token
service.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) {
      // 不能用中文['xxxx']
      config.headers['x-access-token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  } 
  
)

// 响应拦截器 是发送请求后 后端返回的数据 前端修改返回的数据（封装）
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.status !== 200) {
      return Promise.reject(new Error(res.success || 'Error'))
    } else {
      if (res.code == 200) {
        return res.result
      } else {
        ElMessage.error(res.success)
        
      }
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service