<script setup>
import ContainerHeader from '@/components/ContainerHeader.vue'
import ContainerTabs from '@/components/ContainerTabs.vue'
import ContainerAside from '@/components/ContainerAside.vue'
import ContainerFooter from '@/components/ContainerFooter.vue'
</script>

<template>
    <div class="common-layout">
        <el-container>
            <ContainerAside />
            <el-container>
                <ContainerHeader />
                <ContainerTabs/>
                <el-main>
                    <RouterView />
                </el-main>
                <ContainerFooter/>
            </el-container>
        </el-container>
    </div>
</template>
<style lang="less" scoped>
.common-layout {
    height: 100%;
    &>.el-container {
        height: 100%;
        &>.el-aside {
            height: 100%;
            background: #545c64;
        }
        &>.el-container {
            flex-direction: column;
            &>.el-header {
                padding: 0%;
            }
        }
    }
}


</style>