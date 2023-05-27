import { createRouter, createWebHashHistory } from 'vue-router'
// import { userStore } from '../store/user'
const routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/views/index.vue'),
        children: [
            {
                path: '/home',
                name: 'Home',
                meta: { label: '首页', icon: 'HomeFilled' },
                component: () => import('@/views/home/index.vue')
            },
            {
                path: '/user',
                name: 'user',
                meta: { label: '用户管理', icon: 'UserFilled' },
                children: [
                    {
                        path: '/user/list',
                        name: 'userList',
                        meta: { label: '用户列表', icon: 'user' },
                        component: () => import('@/views/user/index.vue'),
                    },
                ]
            },
            {
                path: '/table',
                name: 'table',
                meta: { label: '表格管理', icon: 'Tools' },
                children: [
                    {
                        path: '/table/list',
                        name: 'tableList',
                        meta: { label: '表格列表', icon: 'user' },
                        component: () => import('@/views/table/index.vue'),
                    }
                ]
            },
            {
                path: '/table2',
                name: 'table2',
                meta: { label: '时间表格管理', icon: 'Tools' },
                children: [
                    {
                        path: '/table2/list',
                        name: 'table2List',
                        meta: { label: '时间表格列表', icon: 'user' },
                        component: () => import('@/views/table2/index.vue'),
                    }
                ]
            },
        ]
    },
    // 404
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        component: () => import('@/views/404.vue')
    },
    // login
    {
        path: '/login',
        component: () => import('@/views/login/index.vue')
    },


]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
    // const store = userStore()
    if (to.path === '/login') return next();
    //获取token
    const tokenStr = window.localStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})


export default router