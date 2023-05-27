<script setup>
import { ref, reactive } from 'vue'
import { systemStore } from '@/store/system'
const system = systemStore()
// 数据
const imgSrc = new URL('@/assets/img/user/userIcon.png', import.meta.url).href;


// 事件

</script>
<template>
    <el-footer class="footer">
        <div class="footerSize">
            版权
        </div>
    </el-footer>
</template>

<style lang="less" scoped>
.footer {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footerSize{
        margin: 0 auto;
    }

}

</style>
