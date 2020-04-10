<template>
  <div class="myWork">
    <!-- 顶部已完成和未完成 -->
    <div class="work-top flex-center-y">
      <div class="over-yes flex-col">
        <span>已完成：</span>
        <p class="flex-center">11</p>
      </div>
      <div class="over-no flex-col">
        <span>未完成：</span>
        <p class="flex-center">23</p>
      </div>
    </div>
    <!-- 课程内容展示 -->
    <div class="work-bottom flex-center-y">
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
              <td>{{item.title}}</td>
              <td>{{item.name}}</td>
              <td>{{item.time}}</td>
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
export default {
  data () {
    return {
      list: [],
      listOne: [
        {title: '职业道德与法律', name: '导言', time: '2099-12-03 12:00'},
        {title: '职业道德与法律', name: '导言', time: '2099-12-03 12:00'},
        {title: '职业道德与法律', name: '导言', time: '2099-12-03 12:00'}
      ],
      listTwo: [
        {title: '心理健康教育', name: '导言', time: '2099-12-03 12:00'},
        {title: '心理健康教育', name: '导言', time: '2099-12-03 12:00'},
        {title: '心理健康教育', name: '导言', time: '2099-12-03 12:00'}
      ],
      listThree: [
        {title: '哲学与人生', name: '导言', time: '2099-12-03 12:00'},
        {title: '哲学与人生', name: '导言', time: '2099-12-03 12:00'},
        {title: '哲学与人生', name: '导言', time: '2099-12-03 12:00'}
      ]
    }
  },
  props: ['page', 'workActive'],
  watch: {
    page () {
      if (this.workActive === 0) {
        switch (this.page) {
          case 0:
            this.list = this.listOne
            break
          case 1:
            this.list = this.listTwo
            break
          case 2:
            this.list = this.listThree
            break
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.workActive === 0) {
        switch (this.page) {
          case 0:
            this.list = this.listOne
            break
          case 1:
            this.list = this.listTwo
            break
          case 2:
            this.list = this.listThree
            break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .myWork{
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    .work-top{
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
    // 课程展示
    .work-bottom{
      width: 100%;
      height: 230px;
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
      // .study{
      //   width: 20%;
      //   height: 100%;
      //   p{
      //     text-align: center;
      //     font-weight: 700;
      //     padding: 10px 0;
      //     box-sizing: border-box;
      //   }
      //   a{
      //     display: inline-block;
      //     border-radius: 4px;
      //     width: 100px;
      //   }
      // }
    }
  }
</style>
