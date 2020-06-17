<template>
  <div class="ChosCourItem-box">
    <div class="left">
      <img :src="base+'card_eg.jpg'" alt="">
      <div class="item-info">
        <h2>{{myCourse.openName}}</h2>
        <p class="teacher">授课老师：{{myCourse.lectureName}}</p>
        <p class="time">开课时间：{{myCourse.startTime}}</p>
        <p class="count">学时数：{{myCourse.courHour}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['index', 'myCourse'],
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {},
  watch: {}
}
</script>
<style lang="less" scoped>
@theme: #007AB7;
.ChosCourItem-box{
  // flex: 1;
  width: 555px;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  margin: 20px;
  // &:last-child{
  //   margin-bottom: 0;
  // }
  .left{
    font-family:Microsoft YaHei;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 180px;
      height: 140px;
      margin-right: 30px;
    }
    .item-info{
      h2{
        font-size:18px;
        font-weight:bold;
        color:rgba(51,51,51,1);
        margin-bottom: 15px;
        width: 280px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
}
</style>
