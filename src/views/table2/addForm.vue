<script setup>
import { ref, reactive, defineExpose, defineEmits } from 'vue'
// 数据
const states = reactive({
    dialogFormVisible: false,
    form: {
        title1: '',
        title2: '',
        title3: ''
    },
    selectOptions: [
    {
      label: '选项1',
      value: '选项1值'
    },
    {
      label: '选项2',
      value: '选项2值'
    }
  ],
})
const form = ref(null)
// 表单校验
const rules = reactive({
    title1: [{ required: true, message: '请输入标题1', trigger: 'blur' }],
    title2: [{ required: true, message: '请选择标题2', trigger: 'blur' }],
    title3: [{ required: true, message: '请输入标题3', trigger: 'blur' }]
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
            emit('refresh','addForm')
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
const selectChange = () =>{
    console.log(states.form.title2,"--asf");
}
</script>
<template>
    <div>
        <el-dialog v-model="states.dialogFormVisible" title="新增">
            <el-form ref="form" :rules="rules" :model="states.form" label-width="100px">
                <el-form-item prop="title1" label="标题1:">
                    <el-input v-model="states.form.title1" class="input" placeholder="请输入标题1" />
                </el-form-item>
                <el-form-item prop="title2" label="标题2:">
                    <el-select v-model="states.form.title2" style="width:100%" placeholder="请选择标题2" @change="selectChange">
                        <el-option v-for="item in states.selectOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="title3" label="标题3:">
                    <el-input class="input" v-model="states.form.title3" placeholder="请输入标题3" />
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