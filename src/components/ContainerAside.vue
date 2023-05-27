<script setup>
import { ref, reactive, computed } from 'vue'
import { systemStore } from '../store/system';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const system = systemStore()
const router = useRouter()
// 路由中的routes数据
const options = router.options.routes
const { show } = storeToRefs(system)
// 数据
const states = reactive({
    routesArray: [],
    noChildren: [],
    hasChildren: [],
    routersOptions: []
})
// 事件
const defaultActive = computed(()=>{
    return system.$state.currentMenu
})
const routes = () => {
    states.routesArray = options.filter(item => item.path == '/')[0].children
}
routes()
const noChildren = () => {
    states.noChildren = states.routesArray.filter(item => !item.children)
}
const hasChildren = () => {
    states.hasChildren = states.routesArray.filter(item => item.children)
}
noChildren()
hasChildren()
const selectMenu = (path, keyPath) => {
    states.routersOptions = []
    if (keyPath.length == 1) {
        states.routersOptions = states.noChildren.filter(item => item.path == path)[0]
        let optionsVal = {
            path: states.routersOptions.path,
            label: states.routersOptions.meta.label
        }
        system.selectMenu(optionsVal)
    } else {
        let fatherMune = states.hasChildren.filter(item => item.path == keyPath[0])
        let Menu = fatherMune[0].children.filter(item => item.path == path)
        let optionsVal = {
            fatherPath: fatherMune[0].path,
            fatherLabel: fatherMune[0].meta.label,
            path: Menu[0].path,
            label: Menu[0].meta.label
        }
        system.selectMenu(optionsVal)
    }
}
const seleNoChildren = (item) => {
    const defaultActive = JSON.parse(localStorage.getItem('currentMenu'))
    system.openBreadcrumb()
    if(item.path == defaultActive.path ){
        router.push(item.path)
    }
    
}
const seleHasChildren = (item) => {
    const defaultActive = JSON.parse(localStorage.getItem('currentMenu'))
    system.openBreadcrumb()
    if(item.path == defaultActive.path ){
        router.push(item.path)
    }
}
</script>

<template>
    <el-aside :width="show ? '64px' : '200px'">
        <el-menu background-color="#545c64" text-color="#fff" :collapse="show" @select="selectMenu"
            :collapse-transition="false" :default-active="defaultActive.path">
            <el-menu-item class="headerSize">
                <h4 v-show="!show">通用后台管理系统</h4>
                <h4 v-show="show">后台</h4>
            </el-menu-item>
            <el-menu-item :index="item.path" v-for="item in states.noChildren" :key="item.path"
                @click="seleNoChildren(item)">
                <component class="icons" :is="item.meta.icon"></component>
                <span>{{ item.meta.label }}</span>
            </el-menu-item>
            <el-sub-menu :index="item.path" v-for="item in states.hasChildren" :key="item.path">
                <template #title>
                    <component class="icons" :is="item.meta.icon"></component>
                    <span>{{ item.meta.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="childrenItem.path" v-for="(childrenItem, childrenIndex) in item.children"
                        :key="childrenIndex" @click="seleHasChildren(childrenItem)">
                        <component class="icons" :is="childrenItem.meta.icon"></component>
                        <span>{{ childrenItem.meta.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>

        </el-menu>
    </el-aside>
</template>

<style lang="less" scoped>
.headerSize {
    font-size: 20px;
    height: 60px;
    text-align: center;
    color: #fff;
    background-color: #3e434b;
    display: flex;
    align-items: center;
    justify-content: center;
}

.el-menu {
    border: 0 !important;
}

.icons {
    width: 18px;
    height: 18px;
    margin-right: 10px;
}

.logo {
    margin-top: 10px;
    width: 100%;
    height: 80%;
}
</style>
