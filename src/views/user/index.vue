<script setup>
import { ref, reactive } from 'vue'
import AddFrom from './addForm.vue'
import EditFrom from './editForm.vue'
import Info from './info.vue'

// 数据
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log(userInfo,"--sdf");
const form = ref(null)
const addForm = ref(null)
const editForm = ref(null)
const info = ref(null)
const states = reactive({
  formInline: {
    username: '',
    password: ''
  },
  deleteData: {}
})
// 表格数据
const allTableData = []
// 表格头
const tableLable = {
  username: '账号',
  password: '密码',
  authority: '权限'
}
// 事件
const userList = () =>{
  if(userInfo.username == 'admin' && userInfo.password == '123456'){
    userInfo.authority = '超级管理员'
  }
  allTableData.push({
    username:userInfo.username,
    password:userInfo.password,
    authority:userInfo.authority,
  })
}
userList()
// 分页数据
const paginationData = reactive({
  currentPage: 1,
  pageSize: 10,
  total: allTableData.length
})
const onSubmit = () => {
  console.log('查询事件');

}
const clear = () => {
  states.formInline = {}
}
// 自定义分页事件
const tableData = () => {
  return allTableData.filter((item, index) =>
    index < paginationData.currentPage * paginationData.pageSize &&
    index >= paginationData.pageSize * (paginationData.currentPage - 1)
  );
}
const handleSizeChange = (val) => {
  paginationData.pageSize = val
  console.log(paginationData.pageSize, "--一页多少条")
}
const handleCurrentChange = (val) => {
  paginationData.currentPage = val
  console.log(paginationData.currentPage, "--当前页")
}

const toAddForm = () => {
  addForm.value.addInit()
}
const handleOk = (val) => {
  // 全屏加载事件
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  if (val == 'addForm') {
    var message = '添加成功'
  } else if (val == 'editForm') {
    var message = '编辑成功'
  } else {
    var message = '删除成功'
  }
  setTimeout(() => {
    loading.close()
    ElMessage({
      message: message,
      type: 'success',
    })
  }, 800)
}
const handleEdit = (index, scope) => {
  editForm.value.editInit(scope)
}
const handleInfo = (index, scope) => {
  info.value.infoInit(scope)
}
const handleDelete = (index, scope) => {
  states.deleteData = scope
}
const yesDelete = () => {
  console.log(states.deleteData);
  handleOk()
}
const noDelete = () => {

}
</script>

<template>
  <el-row>
    <el-card style="width:100%">
      <el-form ref="form" :inline="true" :model="states.formInline" class="demo-form-inline">
        <el-form-item label="账号:">
          <el-input v-model="states.formInline.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="states.formInline.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="width:100%;margin-top: 20px;">
      <el-button type="primary" @click="toAddForm" v-if="userInfo.authority == '超级管理员'">
        <el-space wrap>
          <el-icon color="#fff">
            <Plus />
          </el-icon>
          新增
        </el-space>
      </el-button>
      <el-table :data="tableData()" style="width: 100%;margin-top: 20px;" :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="(item, index) in tableLable" :key="index" :prop="index" :label="item" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" link type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <template v-if="scope.row.authority !== '超级管理员'">
              <el-divider direction="vertical" />
              <el-button size="small" link type="danger" @click="handleDelete(scope.$index, scope.row)">
                <el-popconfirm title="确定删除此数据吗" @confirm="yesDelete" @cancel="noDelete">
                  <template #reference>
                    删除
                  </template>
                </el-popconfirm>
              </el-button>
            </template>
            <el-divider direction="vertical" />
            <el-button size="small" link type="primary" @click="handleInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="paginationData.currentPage" v-model:page-size="paginationData.pageSize"
          :page-sizes="[10, 20, 30, 50]" layout="total, prev, pager, next,sizes" :total="paginationData.total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-card>
    <AddFrom ref="addForm" @refresh="handleOk" />
    <EditFrom ref="editForm" @refresh="handleOk" />
    <Info ref="info" />
  </el-row>
</template>
<style scoped>
.pagination {
  display: flex;
  justify-content: right;
  margin-top: 20px;
}
</style>