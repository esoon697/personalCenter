<template>
  <div class="ChosCourItem-box">
    <div class="left">
      <img :src="stuCourse.coverUri" alt="">
      <div class="item-info">
        <h2>{{stuCourse.openName}}</h2>
        <p class="teacher">授课老师：{{stuCourse.lectureName}}</p>
        <p class="time">开课时间：{{stuCourse.startTime}}</p>
        <p class="count">学时数：{{stuCourse.courHour}}</p>
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
  props: ['index', 'stuCourse'],
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    chooseCourse () {
      this.$api.stuSelectCourse({
        courEventId: this.stuCourse.openId
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '选课成功！'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message || '服务器内部错误，请稍后再试'
          })
        }
      })
    },
    viewCourse () {
      this.$router.push({path: '/teacherManagement/myChooseCourse', query: {openId: this.stuCourse.openId}})
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
