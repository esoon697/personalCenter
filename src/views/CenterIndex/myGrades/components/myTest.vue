<template>
  <div class="myTest">
    <!-- 顶部已完成和未完成 -->
    <div class="test-top flex-center-y">
      <div class="over-yes flex-col">
        <span>已完成：</span>
        <p class="flex-center">{{doneExamCounts}}</p>
      </div>
      <div class="over-no flex-col">
        <span>未完成：</span>
        <p class="flex-center">{{notDoneExamCounts}}</p>
      </div>
    </div>
    <!-- 课程内容展示 -->
    <div class="test-bottom flex-center-y">
      <div class="table-wrap">
        <table>
          <thead>
            <th>课程</th>
            <th>作业名称</th>
            <th>学习截至日期</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr v-for="(item, index) in list" :key="index">
              <td>{{item.courseEventName}}</td>
              <td>{{item.description}}</td>
              <td>{{item.endTime}}</td>
              <td>
                <a href="javascript:void(0);">马上学习</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 课程内容end -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      list: []
    }
  },
  props: ['page', 'workActive'],
  watch: {
    page () {
      if (this.workActive === 1) {
        this.list = this.examList
      }
    },
    examList (val) {
      this.list = this.examList
    }
  },
  computed: {
    ...mapState(['examList', 'doneExamCounts', 'notDoneExamCounts'])
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.workActive === 1) {
        this.list = this.examList
      }
    }
  }
}
</script>

<style lang="less" scoped>
@media screen and (max-width: 1460px){
  table tr td{font-size: 14px!important;}
  table th{font-size: 14px!important;}
}
  .myTest{
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    .test-top{
      width: 100%;
      .over-yes{
        width: 50%;
        span{
          font-size: 16px;
          color: #333;
          margin-bottom: 5px;
        }
        p{
          width: 95%;
          height: 45px;
          background-color: #ECECEC;
          font-size: 20px;
          color: #666;
          border-radius: 5px;
        }
      }
      .over-no{
        width: 50%;
        span{
          font-size: 16px;
          color: #333;
          margin-bottom: 5px;
        }
        p{
          width: 95%;
          height: 45px;
          background-image: linear-gradient(to bottom, #FF6C82,#E32835,#DC1826);
          font-size: 20px;
          color: #fff;
          border-radius: 5px;
        }
      }
    }
    /* 课程展示 */
    .test-bottom{
      width: 100%;
      // height: 230px;
      margin-top: 20px;
      .table-wrap{
        width: 100%;
        height: 100%;
        table{
          width: 100%;
          border-collapse: collapse;
          th{
            text-align: center;
            border-bottom: 1px solid #ccc;
            padding: 10px 0;
            box-sizing: border-box;
            width: 25%;
          }
          th:nth-child(4){
            border: none;
            padding-left: 40px;
          }
          tr{
            text-align: center;
          }
          td{
            padding: 18px 0;
            font-size: 16px;
            width: 25%;
            border-bottom: 1px solid #ccc;
          }
          td:nth-child(4n){
            border: none;
            padding: 0;
            text-align: right;
            a{
              display: inline-block;
              padding: 5px 10px;
              margin: 0 auto;
              text-decoration: none;
              border-radius: 4px;
              background-image: linear-gradient(to bottom, #01E8D8,#4EB1E5,#0094E0);
              color: #fff;
            }
          }
        }
      }
      .study{
        width: 20%;
        height: 100%;
        p{
          text-align: center;
          font-weight: 700;
          padding: 10px 0;
          box-sizing: border-box;
        }
        a{
          display: inline-block;
          border-radius: 4px;
          width: 100px;
        }
      }
    }
  }
</style>
