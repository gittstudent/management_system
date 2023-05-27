<script setup>
import { ref, reactive } from 'vue'
import AddFrom from './addForm.vue'
import EditFrom from './editForm.vue'

// 数据
const form = ref(null)
const addForm = ref(null)
const editForm = ref(null)
const states = reactive({
  advanced: false,
  formInline: {
    input: '',
    select: ''
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
  deleteData: {},
  // 时间类型
  dateType: [
    {
      label: '年',
      value: 1
    },
    {
      label: '月',
      value: 2
    },
    {
      label: '日',
      value: 3
    },
    {
      label: '年区间',
      value: 4
    },
    {
      label: '月区间',
      value: 5
    },
    {
      label: '日区间',
      value: 6
    },
  ],
  dateTypeVal: 1,
  dateLabel: '时间',
  disabled: true,
  placeholder: '请先选择时间类型',
  is_showInterval: false,
  showYear: true,
  showDate: {
    showMonth: false,
    showDate: false,
    showYearInterval: false,
    showMonthInterval: false,
    showDateInterval: false,
  },
  date: {
    year: null,
    month: null,
    date: null,
    yearInterval: null,
    monthInterval: null,
    dateInterval: null,
  }
})
// 表格数据
const allTableData = [
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  }, {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },
  {
    title1: 'Tom',
    title2: '2016-05-03',
    title3: 'No. 189, Grove St, Los Angeles',
  },

]
// 表格头
const tableLable = {
  title1: '标题1',
  title2: '标题2',
  title3: '标题3'
}
// 分页数据
const paginationData = reactive({
  currentPage: 1,
  pageSize: 10,
  total: allTableData.length
})
// 事件
// 查询事件
const onSubmit = () => {
  console.log(states.date, '查询事件');

}
// 重置事件
const clear = () => {
  states.dateTypeVal = 1;
  states.dateLabel = '时间';
  states.is_showInterval = false;
  states.showDate = {}
  states.showYear = true;
  states.showDate = {}
  states.date = {}
  states.formInline = {}
}
// 自定义分页事件
const tableData = () => {
  return allTableData.filter((item, index) =>
    index < paginationData.currentPage * paginationData.pageSize &&
    index >= paginationData.pageSize * (paginationData.currentPage - 1)
  );
}
// 一页多少条并改变分页数据的pageSize
const handleSizeChange = (val) => {
  paginationData.pageSize = val
}
// 当前页并改变分页数据的currentPage
const handleCurrentChange = (val) => {
  paginationData.currentPage = val
}
// 新增按钮事件
const toAddForm = () => {
  addForm.value.addInit()
}
// 刷新事件
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
// 编辑事件
const handleEdit = (index, scope) => {
  editForm.value.editInit(scope)
}
// 删除事件
const handleDelete = (index, scope) => {
  states.deleteData = scope
}
const yesDelete = () => {
  console.log(states.deleteData);
  handleOk()
}
const noDelete = () => {

}
// 展开收起事件
const toggleAdvanced = () => {
  states.advanced = !states.advanced
}
// 选择时间类型事件
const seletDateType = () => {
  states.dateLabel = '时间';
  states.is_showInterval = false;
  states.showDate = {}
  states.showYear = true;
  states.date = {}
  switch (states.dateTypeVal) {
    case 1:
      states.dateLabel = '时间';
      states.is_showInterval = false;
      states.showYear = true;
      states.showDate.showMonth = false;
      states.showDate.showDate = false;
      break;
    case 2:
      states.dateLabel = '时间';
      states.is_showInterval = false;
      states.showYear = false;
      states.showDate.showMonth = true;
      states.showDate.showDate = false;
      break;
    case 3:
      states.dateLabel = '时间';
      states.is_showInterval = false;
      states.showYear = false;
      states.showDate.showMonth = false;
      states.showDate.showDate = true;
      break;
    case 4:
      states.dateLabel = '开始时间';
      states.is_showInterval = true;
      states.showYear = true;
      states.showDate.showMonth = false;
      states.showDate.showDate = false;
      states.showDate.showYearInterval = true;
      states.showDate.showMonthInterval = false;
      states.showDate.showDateInterval = false;
      break;
    case 5:
      states.dateLabel = '开始时间';
      states.is_showInterval = true;
      states.showYear = false;
      states.showDate.showMonth = true;
      states.showDate.showDate = false;
      states.showDate.showYearInterval = true;
      states.showDate.showMonthInterval = false;
      states.showDate.showDateInterval = false;
      break;
    case 6:
      states.dateLabel = '开始时间';
      states.is_showInterval = true;
      states.showYear = false;
      states.showDate.showMonth = false;
      states.showDate.showDate = true;
      states.showDate.showYearInterval = true;
      states.showDate.showMonthInterval = false;
      states.showDate.showDateInterval = false;
      break;
    default:
      ElMessage.error('选择有误')
  }


}
</script>

<template>
  <el-row>
    <el-card style="width:100%">
      <el-form ref="form" :inline="true" :model="states.formInline" class="demo-form-inline">
        <el-form-item label="时间类型:">
          <el-select v-model="states.dateTypeVal" placeholder="请选择时间类型" @change="seletDateType">
            <el-option v-for="item in states.dateType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="states.dateLabel">
          <el-date-picker v-if="states.showYear" v-model="states.date.year" type="year" format="YYYY" value-format="YYYY"
            placeholder="请选择年" />
          <el-date-picker v-if="states.showDate.showMonth" v-model="states.date.month" type="month" format="YYYY-MM"
            value-format="YYYY-MM" placeholder="请选择月" />
          <el-date-picker v-if="states.showDate.showDate" v-model="states.date.date" type="date" format="YYYY-MM-DD"
            value-format="YYYY-MM-DD" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="结束时间:" v-if="states.is_showInterval">
          <el-date-picker v-if="states.showDate.showYearInterval" v-model="states.date.yearInterval" type="year"
            format="YYYY" value-format="YYYY" placeholder="请选择年" />
          <el-date-picker v-if="states.showDate.showMonthInterval" v-model="states.date.monthInterval" type="month"
            format="YYYY-MM" value-format="YYYY-MM" placeholder="请选择月" />
          <el-date-picker v-if="states.showDate.showDateInterval" v-model="states.date.dateInterval" type="date"
            format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="请选择日期" />
        </el-form-item>
        <el-form-item label="设备名称:">
          <el-select v-model="states.formInline.select" placeholder="请选择设备">
            <el-option v-for="item in states.selectOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <template v-if="states.advanced">
          <el-form-item label="输入框名称:">
            <el-input v-model="states.formInline.input" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="输入框名称:">
            <el-input v-model="states.formInline.input" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="输入框名称:">
            <el-input v-model="states.formInline.input" placeholder="请输入名称" />
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="clear">重置</el-button>
          <el-button link type="primary" @click="toggleAdvanced" style="margin-left: 10px"> {{ states.advanced ? '收起' :
            '展开' }}
            <el-icon v-if="states.advanced">
              <ArrowUp />
            </el-icon>
            <el-icon v-else>
              <ArrowDown />
            </el-icon>
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="width:100%;margin-top: 20px;">
      <el-button type="primary" @click="toAddForm">
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
            <el-divider direction="vertical" />
            <el-button size="small" link type="danger" @click="handleDelete(scope.$index, scope.row)">
              <el-popconfirm title="确定删除此数据吗" @confirm="yesDelete" @cancel="noDelete">
                <template #reference>
                  删除
                </template>
              </el-popconfirm>
            </el-button>
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
  </el-row>
</template>
<style scoped>
.pagination {
  display: flex;
  justify-content: right;
  margin-top: 20px;
}
</style>