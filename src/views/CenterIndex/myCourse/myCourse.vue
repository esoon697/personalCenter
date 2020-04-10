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
              v-for="item in courseTypes"
              :key="item.id"
              :label="item.label"
              :value="item.value">
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
          <span
          v-for="(item, index) in page" :key="index"
          :class="['page-num-item', active == index ? 'page-num-item-active' : '']"
          @click="choosePage(index)"
          >
          {{item}}
          </span>
        </div>
      </div>
      <div class="right-table">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="courseInfo"
            label="课程信息"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="courseCount"
            label="共多少章节"
            align="center">
          </el-table-column>
          <el-table-column
            prop="studiedCount"
            label="已学多少章节"
            align="center">
          </el-table-column>
          <el-table-column
            prop="date"
            label="创建日期"
            align="center">
          </el-table-column>
          <el-table-column
            prop="score"
            label="课程分数"
            align="center">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align="center">
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
      courseTypeVal: '',
      courseTypes: [
        {
          id: 1,
          value: '语文'
        },
        {
          id: 2,
          value: '数学'
        },
        {
          id: 3,
          value: '英语'
        }
      ],
      page: ['1', '2', '3'], // 页码
      active: 0,
      tableData: [{
        courseInfo: '职业生涯规划',
        courseCount: '10',
        studiedCount: '2',
        date: '2019-12-04',
        score: '20分',
        state: '开始学习'
      }, {
        courseInfo: '职业生涯规划',
        courseCount: '10',
        studiedCount: '2',
        date: '2019-12-04',
        score: '20分',
        state: '开始学习'
      }, {
        courseInfo: '职业生涯规划',
        courseCount: '10',
        studiedCount: '2',
        date: '2019-12-04',
        score: '20分',
        state: '开始学习'
      }, {
        courseInfo: '职业生涯规划',
        courseCount: '10',
        studiedCount: '2',
        date: '2019-12-04',
        score: '20分',
        state: '开始学习'
      }]
    }
  },
  created () {},
  mounted () {
    var echartPie = this.$echarts.init(document.getElementById('pie-box'))
    var pieOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        left: 10,
        data: ['已完成', '未完成', '进行中']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['15%', '60%'],
          // right: 30,
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
              value: 335,
              name: '已完成',
              itemStyle: {
                color: '#FF7A8E'
              }
            },
            {
              value: 310,
              name: '未完成',
              itemStyle: {
                color: '#FFCC33'
              }
            },
            {
              value: 234,
              name: '进行中',
              itemStyle: {
                color: '#1DEAAD'
              }
            }
          ]
        }
      ]
    }
    echartPie.setOption(pieOption)
  },
  computed: {},
  methods: {
    choosePage (index) {
      this.active = index
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.myCourse-wrapper{
  display: flex;
  width: 100%;
  .myCourse-left{
    width: 600px;
    height: 600px;
    .myCourse-title{
      display: flex;
      // justify-content: center;
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
    padding: 0 15px;
    box-sizing: border-box;
    background-color: #fff;
    #pie-box{
      width: 570px;
      height: 500px;
    }
  }
  .myCourse-right{
    flex: 1;
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
