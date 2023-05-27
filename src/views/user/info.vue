<script setup>
import { ref, reactive, defineExpose } from 'vue'
// 数据
const states = reactive({
    dialogFormVisible: false,
    form: {
        username: '',
        password: '',
        authority: ''
    }
})
const form = ref(null)
// 事件
const infoInit = (scope) => {
    states.dialogFormVisible = true
    states.form = scope

}
defineExpose({
    infoInit
})
// 确认事件
const submit = () => {
    states.dialogFormVisible = false
    form.value.resetFields()
}
</script>
<template>
    <div>
        <el-dialog v-model="states.dialogFormVisible" title="详情">
            <el-form ref="form" :rules="rules" :model="states.form" label-width="100px">
                <el-form-item prop="username" label="账号:">
                   <span>{{ states.form.username }}</span>
                </el-form-item>
                <el-form-item prop="password" label="密码:">
                    <span>{{ states.form.password }}</span>
                </el-form-item>
                <el-form-item prop="authority" label="权限:">
                    <span>{{ states.form.authority }}</span>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="submit">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<style scoped>
/* .input{
    width: 200px;
} */
</style>