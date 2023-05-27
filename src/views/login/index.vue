<script setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { systemStore } from '@/store/system'
import { userStore } from '@/store/user'
import { login } from '@/api/user'
const router = useRouter()
const system = systemStore()
const user = userStore()
// 数据
const states = reactive({
    formLabelAlign: {
        username: 'admin',
        password: '123456'
    }
})
// 表单校验
const rules = reactive({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})
const form = ref(null)
// 事件
// 表单校验
const submitForm = async () => {
    await form.value.validate((valid, fields) => {
        if (valid) {
            if (states.formLabelAlign.username == 'admin' && states.formLabelAlign.password == '123456') {
                console.log('submit!', states.formLabelAlign)
                //    login({
                //     phone:states.formLabelAlign.username,
                //     code:'917049'
                //   }).then(result =>{
                //     console.log(result,"-sdf");
                //   })
                let data = {
                    token:'已登录',
                    userInfo:states.formLabelAlign
                }
                user.setUserinfo(data)
                system.defaultMenu()
                system.defaultTabs()
                router.push('/home')
            } else {
                ElMessage.error('账号密码不正确')
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>
<template>
    <el-row class="box">
        <el-col class="login-box">
            <h2 class="title">通用后台管理系统</h2>
            <div class="smallTitle">
                <span class="">账号密码登录</span>
            </div>
            <el-form ref="form" :rules="rules" :model="states.formLabelAlign">
                <el-form-item prop="username">
                    <el-input v-model="states.formLabelAlign.username" class="input" :prefix-icon="User"
                        placeholder="请输入账号" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" show-password class="input" v-model="states.formLabelAlign.password"
                        :prefix-icon="Lock" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round class="button" @click="submitForm(ruleFormRef)">
                        登录
                    </el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>
<style lang="less" scoped>
.box {
    text-align: center;
    min-height: 100vh;

    .login-box {
        margin-top: 20vh;
        display: flex;
        flex-direction: column;
        align-items: center;

        .smallTitle {
            margin-bottom: 20px;

            h1 {
                color: #ccc;
            }
        }

        .button {
            width: 300px;
        }
    }
}

.input {
    width: 300px;
}
</style>