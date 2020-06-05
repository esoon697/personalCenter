<template>
  <div class="ChosCourItem-box">
    <div class="left">
      <img :src="base+'card_eg.jpg'" alt="">
      <div class="item-info">
        <h2>班主任职业能力构建与提升线下培训</h2>
        <p class="teacher">授课老师：张三</p>
        <p class="time">开课时间：2020-3-26 10:00</p>
        <p class="count">学时数：30</p>
      </div>
    </div>
    <div class="right">
      <button class="btn-item choose-btn" @click.prevent="chooseCourse">选课</button>
      <button class="btn-item view-btn" @click.prevent="viewCourse">查看课程</button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['index'],
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    chooseCourse () {
      this.$message.info('选课成功' + this.index)
    },
    viewCourse () {
      this.$router.push({path: '/teacherManagement/myChooseCourse', query: {index: this.index}})
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
@theme: #007AB7;
.ChosCourItem-box{
  max-width: 1200px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 20px;
  &:last-child{
    margin-bottom: 0;
  }
  .left{
    font-family:Microsoft YaHei;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
    img{
      width: 180px;
      height: 140px;
      margin-right: 30px;
    }
    .item-info{
      h2{
        font-size:18px;
        font-weight:bold;
        line-height: 1.3;
        color:rgba(51,51,51,1);
        margin-bottom: 15px;
      }
      .teacher{
        font-size:16px;
        color:rgba(102,102,102,1);
        margin-bottom: 15px;
      }
      .time, .count{
        font-size:14px;
        color:rgba(102,102,102,1);
        margin-bottom: 15px;
      }
    }
  }
  .right{
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    .btn-item{
      width:100px;
      height:32px;
      border-radius:4px;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      box-sizing: border-box;
      overflow: hidden;
      margin: 0 30px 20px 0;
      &:last-child{
        margin-right: 0;
      }
    }
    .choose-btn{
      background-color: @theme;
      border: 1px solid @theme;
      color: #fff;
      &:hover{
        opacity: .8;
      }
      &:active{
        opacity: .6;
      }
    }
    .view-btn{
      background-color: #fff;
      border: 1px solid @theme;
      color: @theme;
      &:hover{
        background-color: @theme;
        border: 1px solid @theme;
        color: #fff;
      }
      &:active{
        opacity: .6;
      }
    }
  }
}
</style>
