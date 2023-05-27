<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
    <div>
        <el-result
        icon="warning"
        title="404提示"
        sub-title="你找的页面走丢了~"
      >
        <template #extra>
          <el-button type="primary" @click="router.push('/')">返回首页</el-button>
        </template>
      </el-result>
    </div>
</template>