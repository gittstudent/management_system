<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue'
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
// 表单校验
const rules = reactive({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    authority: [{ required: true, message: '请输入权限', trigger: 'blur' }]
})
// 事件
const addInit = () => {
    states.dialogFormVisible = true

}
defineExpose({
    addInit
})
const emit = defineEmits(['refresh'])
// 表单校验
const submit = async () => {
    await form.value.validate((valid, fields) => {
        if (valid) {
            states.dialogFormVisible = false
            console.log('success submit!', states.form)
            emit('refresh', 'addForm')
            form.value.resetFields()
            // ElMessage.error('添加失败')

        } else {
            console.log('error submit!', fields)

        }
    })
}
const close = () => {
    states.dialogFormVisible = false
    form.value.resetFields()
}
</script>
<template>
    <div>
        <el-dialog v-model="states.dialogFormVisible" title="新增">
            <el-form ref="form" :rules="rules" :model="states.form" label-width="100px">
                <el-form-item prop="username" label="账号:">
                    <el-input v-model="states.form.username" placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="password" label="密码:">
                    <el-input v-model="states.form.password" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item prop="authority" label="权限:">
                    <el-input class="input" v-model="states.form.authority" placeholder="请输入权限" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close">取消</el-button>
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