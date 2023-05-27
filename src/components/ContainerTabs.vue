<script setup>
import { ref, reactive } from 'vue'
import { systemStore } from '@/store/system';
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const syetem = systemStore()
const tags = syetem.$state.tabsList
const states = reactive({
})
// 事件
const clickTabs = (tag) => {
    router.push(tag.path)
    syetem.selectMenu(tag)

}
const closeTabs = (tag, index) => {
    let length = tags.length - 1
    syetem.closeTabs(tag)
    if (tag.path !== route.path) {
        return
    }
    if (index === length) {
        syetem.selectMenu(tags[index - 1])
        router.push({
            path: tags[index - 1].path
        })
    } else {
        syetem.selectMenu(tags[index])
        router.push({
            path: tags[index].path
        })
    }
}
</script>
<template>
    <el-card class="tabs">
        <el-space wrap>
            <el-tag v-for="(tag, index) in tags" :key="tag.path" :closable="tag.path !== '/home'"
                :effect="$route.path === tag.path ? 'dark' : 'plain'" @click="clickTabs(tag)"
                @close="closeTabs(tag, index)">
                {{ tag.label }}
            </el-tag>
        </el-space>
    </el-card>
</template>

<style lang="less" scoped></style>
