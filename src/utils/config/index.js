/*
配置环境
1.开发环境
2.测试环境
3.上线环境
*/

// 拿到当前环境
const env = import.meta.env.MODE || 'prod'

const EnvConfig = {
    development:{
        baseApi:'/api',
        mockApi:''
    },
    test:{
        baseApi:'/test.com/api',
        mockApi:''
    },
    prod:{
        baseApi:'/dqd.com/api',
        mockApi:''
    },
}

export default{
    env,
    // mock z总开关
    mock:true,
    ...EnvConfig[env]
}