<script setup>
import { ref, reactive, computed } from 'vue'
import { systemStore } from '@/store/system'
import { useRouter } from 'vue-router'
const system = systemStore()
const router = useRouter()
// 数据
const imgSrc = new URL('@/assets/img/user/userIcon.png', import.meta.url).href;
const current = computed(() => {
    system.selectMenu(system.$state.currentMenu)
    return system.$state.currentMenu
})

// 事件
const backLogin = () => {
    ElMessageBox.confirm(
        '确定要退出登录吗？',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            localStorage.clear()
            router.push('/login')
        })
        .catch(() => {

        })
}

const toUser = () => {
    let optionsVal = {
        fatherPath: '/user',
        fatherLabel: '用户管理',
        path: '/user/list',
        label: '用户列表'
    }
    system.selectMenu(optionsVal)
    router.push('/user/list')
}
</script>
<template>
    <el-header class="header">
        <div class="l-content">
            <el-button size="small" style="margin-right: 20px;" @click="system.changeShow">
                <el-icon :size="20" v-if="system.show == false">
                    <Fold />
                </el-icon>
                <el-icon :size="20" v-else>
                    <Expand />
                </el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item v-if="current.fatherLabel">{{ current.fatherLabel }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="current" :to="current.path">{{ current.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="img flex items-center">
                    <img class="userIcon" :src="imgSrc" alt="">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="toUser">个人中心</el-dropdown-item>
                        <el-dropdown-item @click="backLogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<style lang="less" scoped>
.bread /deep/ span {
    color: #fff !important;
}

.header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #545c64;

    .l-content {
        padding-left: 20px;
        display: flex;
        align-items: center;
    }

    .r-content {
        padding-right: 20px;
    }

}

.userIcon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.img:hover {
    border: none;
}
</style>
