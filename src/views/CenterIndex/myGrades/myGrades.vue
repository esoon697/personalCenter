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
        <div class="page-num" v-if="workActive == 0">
          <span
          v-for="(item, index) in page" :key="index"
          :class="['page-num-item', workPage == index ? 'page-num-item-active' : '']"
          @click="workPageChoose(index)"
          >
          {{item}}
          </span>
        </div>
        <!-- 考试页码 -->
        <div class="page-num" v-else>
          <span
          v-for="(item, index) in page" :key="index"
          :class="['page-num-item', testPage == index ? 'page-num-item-active' : '']"
          @click="testPageChoose(index)"
          >
          {{item}}
          </span>
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
      page: ['1', '2', '3'], // 页码
      work: ['我的作业', '我的考试'],
      leftActive: 0, // 左当前页码
      workPage: 0, // 我的作业当前页码
      testPage: 0, // 我的考试当前页码
      workActive: 0
    }
  },
  components: {
    echartBar,
    echartLine,
    myWork,
    myTest
  },
  mounted () {
  },
  methods: {
    // 左页码选择
    leftChoose (index) {
      this.leftActive = index
    },
    // 我的作业页码选择
    workPageChoose (index) {
      this.workPage = index
    },
    // 我的考试页码选择
    testPageChoose (index) {
      this.testPage = index
    },
    // 我的作业，我的考试选择
    workChoose (index) {
      this.workActive = index
      // 重置页码
      this.rightActive = 0
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
    height: 440px;
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
