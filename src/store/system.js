import { defineStore } from 'pinia'
// 用户数据
export const systemStore = defineStore({
    id: "system",
    state: () => {
        return {
            show: false,
            currentMenu: JSON.parse(localStorage.getItem('currentMenu')) || {},
            tabsList: JSON.parse(localStorage.getItem('tabsList')) || []

        }
    },
    actions: {
        changeShow() {
            this.show = !this.show
        },
        defaultMenu() {
            this.currentMenu.path = '/home'
            this.currentMenu.label = '/首页'
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu))
        },
        defaultTabs() {
            const defaultTabsList = [
                {
                    path: '/home',
                    label: '首页'
                }
            ]
            this.tabsList = defaultTabsList
            localStorage.setItem('tabsList', JSON.stringify(this.tabsList))
        },
        selectMenu(val) {
            this.currentMenu = val
            localStorage.setItem('currentMenu', JSON.stringify(this.currentMenu))
            let result = this.tabsList.findIndex(item => item.path === val.path)
            result == -1 ? this.tabsList.push(val) : ''
            localStorage.setItem('tabsList', JSON.stringify(this.tabsList))
        },
        openBreadcrumb() {
            this.currentMenu = JSON.parse(localStorage.getItem('currentMenu'))
        },
        openTabs() {
            this.tabsList = JSON.parse(localStorage.getItem('tabsList'))
        },
        closeTabs(val) {
            let result = this.tabsList.findIndex(item => item.path === val.path)
            this.tabsList.splice(result, 1)
            localStorage.setItem('tabsList', JSON.stringify(this.tabsList))
        }
    }
})