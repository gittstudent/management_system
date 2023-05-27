<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts';

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
const tableLable = {
    name: '慢性4',
    date: '时间',
    address: '地址'
}
// 数据
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log(userInfo,"-s-df");
let chart_line = ref()
let chart_bar = ref()
let chart_pie = ref()
const states = reactive({
    // 线图表数据
    chart_line: {
        dom: null,
        title: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
        ],
        data: [
            5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36,
            10, 10, 20,
        ],
    },
    // 圆柱图表数据
    chart_bar: {
        dom: null,
        title: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
        ],
        data: [
            5, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36, 10, 10, 20, 20, 36,
            10, 10, 20,
        ],
    },
    // 饼图表数据
    chart_pie: {
        dom: null,
        data: [
        { value: 1048, name: '第一项' },
        { value: 735, name: '第二项' },
        { value: 580, name: '第三项' },
        { value: 484, name: '第四项' },
        { value: 300, name: '第五项' }
      ]
    },
})
// 事件
const userList = () =>{
  if(userInfo.username == 'admin' && userInfo.password == '123456'){
    userInfo.authority = '超级管理员'
  }
}
userList()
onMounted(() => {
    setTimeout(() => {
        draw_line()
        draw_bar()
        draw_pie()
    }, 800)
    window.addEventListener('resize', () => {
        states.chart_line.dom.resize()
        states.chart_bar.dom.resize()
        states.chart_pie.dom.resize()
    })
})
// 线图表事件
const draw_line = () => {
    let myChart = echarts.init(chart_line.value);
    states.chart_line.dom = myChart
    //配置图表
    let option = {
        title: {
            text: '线性图趋势',
        },
        grid:{
            left:'3%',
            right:'3%',
            containLabel:true
        },
        tooltip: {},
        xAxis: {
            data: states.chart_line.title,
        },
        yAxis: {},
        series: [
            {
                type: 'line',
                data: states.chart_line.data,
            },
        ],
    }
    myChart.setOption(option)
}
// 圆柱图表事件
const draw_bar = () => {
    let myChart = echarts.init(chart_bar.value);
    states.chart_bar.dom = myChart
    //配置图表
    let option = {
        title: {
            text: '圆柱图趋势',
        },
        tooltip: {},
        xAxis: {
            data: states.chart_bar.title,
        },
        yAxis: {},
        series: [
            {
                type: 'bar',
                data: states.chart_bar.data,
            },
        ],
    }
    myChart.setOption(option)
}
// 饼图表事件
const draw_pie = () => {
    let myChart = echarts.init(chart_pie.value);
    states.chart_pie.dom = myChart
    //配置图表
    myChart.setOption({
        legend: {
          top: 'top',
          textStyle: {
            color: '#ccc'
          },
        },
        series: [
          {
            type: 'pie',
            radius: [20, 120],
            center: ['50%', '50%'],
            roseType: 'area',
            data: states.chart_pie.data,
          },
        ],
    })
    
}
</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="6">
            <el-card style="height:280px">
                <div class="user">
                    <img src="@/assets/img/user/userIcon.png" alt="">
                    <div class="userInfo">
                        <p class="name">{{ userInfo.username }}</p>
                        <p class="role">{{ userInfo.authority }}</p>
                    </div>
                </div>
                <el-divider />
                <div class="loginInfo">
                    <p class="time">最近登录时间：<span>2023-5-24</span></p>
                    <p class="address">最近登录地址：<span>石家庄</span></p>
                </div>
            </el-card>
            <el-card style="margin-top: 20px;" class="height-auto">
                <el-table :data="tableData" size="default">
                    <el-table-column v-for="(item, index) in tableLable" :key="index" :prop="index" :label="item" />
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="18">
            <el-card class="card">
                <div ref="chart_line" class="chartHeight"></div>
            </el-card>
            <div class="bottom" style="margin-top: 20px;">
                <el-card class="height-auto">
                    <div ref="chart_bar" class="chartHeightAuto"></div>
                </el-card>
                <el-card class="height-auto">
                    <div ref="chart_pie" class="chartHeightAuto"></div>
                </el-card>
                
            </div>
        </el-col>
    </el-row>
</template>
<style lang="less" scoped>
.card {
    height: 280px;
}

.chartHeight {
    height: 280px;
}
.bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-card{
        width: 49%;
    }
}
.user {
    display: flex;
    align-items: center;

    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;

    }

    .userInfo {
        margin-left: 20px;
        .name{
            // font-size: 0.5rem;
        }

    }
}

.loginInfo {}
.chartHeightAuto{
    height: calc(100vh - 530px);
}
.height-auto {
    height: calc(100vh - 530px);
}
</style>