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
  methods: {},
  watch: {}
}
</script>
<style lang="less" scoped>
@theme: #007AB7;
.ChosCourItem-box{
  max-width: 600px;
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
