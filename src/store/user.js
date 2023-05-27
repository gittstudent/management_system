import { defineStore } from 'pinia'
// 用户数据
export const userStore = defineStore({
    id:"user",
    state: () => {
        return{
            token:localStorage.getItem('token') || '',
            userInfo:localStorage.getItem('userInfo') || {},
        }
    },
    actions:{
        setUserinfo(data){
            this.token = data.token
            this.userInfo = data.userInfo
            localStorage.setItem('token',this.token)
            localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
        },
        clearToken(){
            this.token = ''
        }
       
    }
})