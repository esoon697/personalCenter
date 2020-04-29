<template>
  <div class="myCourse-wrapper">
    <div class="myCourse-left">
      <div class="myCourse-title">
        <div class="line"></div>
        <span>我的选课</span>
      </div>
      <div id="pie-box"></div>
    </div>
    <div class="myCourse-right">
      <div class="right-header">
        <div class="courseType">
          <span>课程分类：</span>
          <el-select v-model="courseTypeVal" placeholder="请选择">
            <el-option
              v-for="(item, index) in courseTypes"
              :key="index"
              :label="item.courTypeName"
              :value="item.courTypeId">
            </el-option>
          </el-select>
          <!-- <select class="typeSelect">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select> -->
        </div>
         <!-- 页码 -->
        <div class="page-num">
          <!-- <span class="demonstration">页数较少时的效果</span> -->
          <el-pagination
            layout="pager"
            :total="total"
            :page-size="pageSize"
            :hide-on-single-page="true"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
      <div class="right-table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="openName"
            label="课程信息"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="chapNum"
            label="共多少章节"
            min-width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="doneChapterNum"
            label="已学多少章节"
            min-width="110"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建日期"
            align="center">
          </el-table-column>
          <el-table-column
            prop="credit"
            label="课程分数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align="center"
            min-width="110"
            fixed="right">
            <template slot-scope="scope">
                <button class="table-btn" @click="startToLearn(scope.$index, scope.row)">开始学习</button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      echartPie: null,
      courseTypeVal: null, // 课程分类当前值
      courTypeId: null,
      courseTypes: [
        // {
        //   id: 1,
        //   value: '语文'
        // },
        // {
        //   id: 2,
        //   value: '数学'
        // },
        // {
        //   id: 3,
        //   value: '英语'
        // }
      ], // 课程分类列表
      // page: ['1', '2', '3'], // 页码
      // active: 0, // 当前页码
      currentPage: 1,
      pageSize: 5,
      total: 100,
      tableData: [], // 课程table数据
      echartData: {}
    }
  },
  created () {
    this.getCourseType()
    this.getCourseProgress()
  },
  mounted () {
    this.initEchart() // 初始化饼形图
  },
  computed: {},
  methods: {
    initEchart () {
      this.echartPie = this.$echarts.init(document.getElementById('pie-box'))
      this.echartPie.showLoading({
        text: '数据正在努力加载...',
        color: '#409EFF',
        textColor: '#666',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      })
      this.$api.getEchartInfo().then(res => {
        if (res.code == 200) {
          let xAxis = res.data.myCourseEventsRatio.xAxis
          let yAxis = res.data.myCourseEventsRatio.yAxis
          this.echartData = {
            horizontal: xAxis,
            vertical: yAxis
          }
          this.echartPie.hideLoading()
          this.echartPie.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              left: 10,
              // data: ['已完成', '未完成', '进行中']
              data: this.echartData.horizontal
            },
            series: [
              {
                name: '我的选课',
                type: 'pie',
                radius: ['15%', '60%'],
                left: 'center',
                // top: 'center',
                width: '70%',
                label: {
                  formatter: '{title|{b}} ({d}%)',
                  rich: {
                    title: {
                      color: '#989898',
                      lineHeight: 10
                    }
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                  }
                },
                data: [
                  {
                  // value: 335,
                  // name: '已完成',
                    value: this.echartData.vertical[0],
                    name: this.echartData.horizontal[0],
                    itemStyle: {
                      color: '#FF7A8E'
                    }
                  },
                  {
                  // value: 310,
                  // name: '未完成',
                    value: this.echartData.vertical[1],
                    name: this.echartData.horizontal[1],
                    itemStyle: {
                      color: '#FFCC33'
                    }
                  },
                  {
                  // value: 234,
                  // name: '进行中',
                    value: this.echartData.vertical[2],
                    name: this.echartData.horizontal[2],
                    itemStyle: {
                      color: '#1DEAAD'
                    }
                  }
                ]
              }
            ]
          })
        }
      })
      // echartPie.showLoading({
      //   text: '数据正在努力加载...',
      //   textStyle: { fontSize: 30, color: '#444' },
      //   effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
      // })
      window.addEventListener('resize', this.repaint) // 宽度改变resize饼形图
      this.echartPie.on('click', (params) => {
        console.log(params)
      })
      // echartPie.hideLoading()
    },
    // 选择页码
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCourseProgress()
    },
    // 获取课程类型
    getCourseType () {
      this.$api.getCourseType().then(res => {
        if (res.code == 200) {
          // console.log(res.data)
          this.courseTypes = res.data.list
          // this.courseTypeVal = res.data.list[0].courTypeId
        }
      })
    },
    // 课程表单信息
    getCourseProgress () {
      this.$api.getCourseProgress({
        courTypeId: this.courseTypeVal,
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }).then(res => {
        if (res.code == 200) {
          // console.log(res.data)
          this.tableData = res.data.list
          this.total = res.data.total
        }
      })
    },
    courseTypeChange (val) {
      console.log(val)
    },
    // 自适应饼形图方法
    repaint () {
      let echartPie = this.$echarts.init(document.getElementById('pie-box'))
      echartPie.resize()
    },
    startToLearn (index, row) {
      console.log(index, row)
    }
  },
  watch: {
    courseTypeVal (val) {
      this.getCourseProgress()
    }
  }
}
</script>
<style lang="less" scoped>
@media screen and (max-width: 1460px){
  table tr td{font-size: 14px!important;}
  table th{font-size: 14px!important;}
}
.myCourse-wrapper{
  display: flex;
  width: 100%;
  .myCourse-left{
    width: 45%;
    .myCourse-title{
      display: flex;
      align-items: center;
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:67px;
      .line{
        width: 4px;
        height: 18px;
        background:linear-gradient(0deg,rgba(1,232,216,1),rgba(78,177,229,1),rgba(0,148,224,1));
        border-radius:2px;
        margin-right: 10px;
      }
    }
    padding: 0 20px;
    box-sizing: border-box;
    background-color: #fff;
    #pie-box{
      width: 100%;
      height: 500px;
    }
  }
  .myCourse-right{
    width: 55%;
    margin-left: 15px;
    background-color: #fff;
    padding: 0 30px;
    box-sizing: border-box;
    .right-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 30px 0 10px;
      .courseType{
        margin-right: 10px;
        span{
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(102,102,102,1);
        }
        // .typeSelect{
        //   width:274px;
        //   height:40px;
        //   background:rgba(245,245,245,1);
        // }
      }
      .page-num{
        .page-num-item{
          color: #666;
          font-size: 16px;
          margin-left: 5px;
          cursor: pointer;
        }
        .page-num-item-active{
          color: #0094E0;
        }
      }
    }
    .right-table{
      width: 100%;
    }
    .table-btn{
      width: 93px;
      height: 35px;
      background: linear-gradient(0deg,rgba(0,148,224,1),rgba(78,177,229,1),rgba(1,232,216,1));
      border-radius: 5px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255,255,255,1);
      line-height: 35px;
    }
  }
}
</style>
