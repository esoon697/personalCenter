<template>
  <div class="initCourseEntrance-wrapper">
    <div class="main-box">
      <div class="banner"></div>
      <div class="inner-box">
        <div class="courseNum-box">
          <span><span>* </span>课程码：</span>
          <input type="text" name="" id="" placeholder="输入课程码">
        </div>
        <button class="import-btn" @click="importCourseNum">导入</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    importCourseNum () {
      this.$router.push({path: '/teacherManagement/InitCourse'})
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.initCourseEntrance-wrapper{
  .main-box{
      width: 500px;
      height: 360px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      overflow: hidden;
    .banner{
      width: 100%;
      height: 180px;
      background-color: #eee;
    }
    .inner-box{
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 40px 70px;
      box-sizing: border-box;
      .courseNum-box{
        font-size:24px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        margin-bottom: 30px;
        span{
          vertical-align: middle;
          span{
            font-size: 18px;
            color: #D91801;
            vertical-align: middle;
          }
        }
        input{
          width:240px;
          height:40px;
          border:1px solid rgba(223,223,223,1);
          border-radius:4px;
          text-indent: 13px;
          &::-webkit-input-placeholder{
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:300;
            color:rgba(170,170,170,1);
          }
          &:-moz-placeholder{
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:300;
            color:rgba(170,170,170,1);
          }
          &::-moz-placeholder{
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:300;
            color:rgba(170,170,170,1);
          }
          &:-ms-input-placeholder{
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:300;
            color:rgba(170,170,170,1);
          }
        }
      }
      .import-btn{
        width:240px;
        height:40px;
        background:rgba(0,122,183,1);
        border-radius:4px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        cursor: pointer;
        &:active{
          opacity: .7;
        }
      }
    }
  }
}
</style>
