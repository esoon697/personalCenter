<template>
  <div class="grades-main flex">
    <!-- 成绩表 -->
    <div class="grades-left">
      <!-- 标题栏 -->
      <div class="title-item flex-between">
        <div class="my-grade flex-center-y">
          <span></span>
          <p>我的成绩</p>
        </div>
        <!-- 页码 -->
        <div class="page-num">
          <span
          v-for="(item, index) in page" :key="index"
          :class="['page-num-item', leftActive == index ? 'page-num-item-active' : '']"
          @click="leftChoose(index)"
          >
          {{item}}
          </span>
        </div>
      </div>
      <!-- echarts图表展示 -->
      <echart-bar v-show="leftActive == 0"  :leftActive="leftActive"></echart-bar>
      <echart-line v-show="leftActive == 1" :leftActive="leftActive"></echart-line>
    </div>
    <!-- 我的作业、我的考试 -->
    <div class="grades-right">
      <div class="title-item flex-between">
        <!-- 我的作业和我的考试选择区域 -->
        <div class="work-test">
          <span
            v-for="(item, index) in work" :key="index"
            :class="['work-item', workActive == index ? 'work-item-active' : '']"
            @click="workChoose(index)"
          >
            {{item}}
          </span>
        </div>
        <!-- 作业页码 -->
        <!-- <div class="page-num" v-if="workActive == 0">
          <span
          v-for="(item, index) in page1" :key="index"
          :class="['page-num-item', workPage == index ? 'page-num-item-active' : '']"
          @click="workPageChoose(index)"
          >
          {{item}}
          </span>
        </div> -->
        <div class="page-num"  v-if="workActive == 0">
          <!-- <span class="demonstration">页数较少时的效果</span> -->
          <el-pagination
            layout="pager"
            :total="workTotal"
            :page-size="pageSize"
            :hide-on-single-page="true"
            :current-page.sync="workPage"
            @current-change="workPageChoose">
          </el-pagination>
        </div>
        <!-- 考试页码 -->
        <!-- <div class="page-num" v-else>
          <span
          v-for="(item, index) in page2" :key="index"
          :class="['page-num-item', testPage == index ? 'page-num-item-active' : '']"
          @click="testPageChoose(index)"
          >
          {{item}}
          </span>
        </div> -->
        <div class="page-num"  v-else>
          <el-pagination
            layout="pager"
            :total="testTotal"
            :page-size="pageSize"
            :hide-on-single-page="true"
            :current-page.sync="testPage"
            @current-change="testPageChoose">
          </el-pagination>
        </div>
      </div>
      <!-- 作业和考试内容展示区域 -->
      <my-work :page="workPage" :workActive="workActive" v-if="workActive == 0"></my-work>
      <my-test :page="testPage" :workActive="workActive" v-else></my-test>
    </div>
  </div>
</template>

<script>
import echartBar from './components/echartBar'
import echartLine from './components/echartLine'
import myWork from './components/myWork'
import myTest from './components/myTest'
export default {
  data () {
    return {
      page: ['科目', '月份'], // 页码
      page1: 0, // 页码
      page2: 0, // 页码
      work: ['我的作业', '我的考试'],
      leftActive: 0, // 左当前页码
      workPage: 1, // 我的作业当前页码
      testPage: 1, // 我的考试当前页码
      workActive: 0, // 作业\考试类型
      pageSize: 5, // 单页显示数据条数
      workTotal: 100, // 我的作业数据总条数
      testTotal: 20 // 我的考试数据总条数
    }
  },
  components: {
    echartBar,
    echartLine,
    myWork,
    myTest
  },
  created () {
    this.getHomeworkInfo()
    this.getExamInfo()
  },
  mounted () {
  },
  methods: {
    // 左页码选择
    leftChoose (index) {
      this.leftActive = index
    },
    // 我的作业页码选择
    workPageChoose (val) {
      this.workPage = val
      this.getHomeworkInfo()
    },
    // 我的考试页码选择
    testPageChoose (val) {
      this.testPage = val
      this.getExamInfo()
    },
    // 我的作业，我的考试选择
    workChoose (index) {
      this.workActive = index
      // 重置页码
      this.rightActive = 0
    },
    getHomeworkInfo () {
      this.$api.getHomeworkInfo({
        pageNum: this.workPage,
        pageSize: 5
      }).then(res => {
        if (res.code == 200) {
          // console.log('getHomeworkInfooooooo', res.data)
          this.$store.state.doneHomeworkCounts = res.data.doneHomeworkCounts
          this.$store.state.notDoneHomeworkCounts = res.data.notDoneHomeworkCounts
          this.$store.state.homeworkList = res.data.myHomework.list
          // console.log(res.data.myHomework.total)
          // this.total = res.data.myHomework.total
        }
      })
    },
    getExamInfo () {
      this.$api.getExamInfo({
        pageNum: this.testPage,
        pageSize: 5
      }).then(res => {
        if (res.code == 200) {
          // console.log('getExamInfoooooooo', res.data)
          this.$store.state.doneExamCounts = res.data.doneExamCounts
          this.$store.state.notDoneExamCounts = res.data.notDoneExamCounts
          this.$store.state.examList = res.data.myExams.list
          // console.log(res.data.myExams.pages)
          // this.page2 = res.data.myExams.pages
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 1460px){
  table tr td{font-size: 14px!important;}
  table th{font-size: 14px!important;}
}
  .grades-main{
    background: #fff;
    // height: 440px;
    margin-bottom: 20px;
  }
  .grades-left {
    width: 50%;
    height: 100%;
    padding: 30px 20px;
    box-sizing: border-box;
  }
  .grades-right{
    width: 50%;
    height: 100%;
    padding: 30px 20px;
    box-sizing: border-box;
  }
  /* 左边我的成绩 */
  .title-item{
    width: 100%;
    margin-bottom: 15px;
    display: flex;
    align-items: flex-start;
    padding-right: 20px;
    box-sizing: border-box;
    .work-test{
      flex: 1;
    }
    .page-num{
      flex: 2;
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
  }
  .my-grade span{
    display: inline-block;
    width: 4px;
    height: 18px;
    border-radius: 2px;
    background-image: linear-gradient(to bottom, #01E8D8,#4EB1E5,#0094E0);
    margin-right: 10px;
  }
  .my-grade p{
    font-size: 18px;
    color: #333;
    font-weight: 700;
  }
  .page-num-item{
    color: #666;
    font-size: 16px;
    margin-left: 5px;
    cursor: pointer;
  }
  .page-num-item-active{
    color: #0094E0;
  }
  /* 左边我的成绩end */
  .work-item{
    font-size: 16px;
    color: #666666;
    cursor: pointer;
  }
  .work-item::after{
    content: '/';
    font-size: 16px;
  }
  .work-item:last-child::after{
    content: ''
  }
  .work-item-active{
    color: #0094E0;
  }
</style>
