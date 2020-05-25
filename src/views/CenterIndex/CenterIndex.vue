<template>
  <div class="main">
    <!-- 我的成绩 -->
      <my-grades></my-grades>
    <!-- 学习地图 -->
      <study-map></study-map>
    <!-- 我的选课 -->
      <my-course></my-course>
  </div>
</template>

<script>
import myGrades from './myGrades/myGrades'
import myCourse from './myCourse/myCourse'
import studyMap from './studyMap/studyMap'
// let currentURL = null
// let targetURL = null
// let orient = window.location.href
// if (process.env.NODE_ENV == 'development') {
//   // dev开发环境
//   currentURL = 'http://10.10.10.213:8080/centerIndex'
//   targetURL = 'http://10.10.10.213:5000/login'
// } else if (process.env.NODE_ENV == 'production') {
//   // build生产环境
//   currentURL = 'http://personal.yazhuokj.com/centerIndex'
//   targetURL = 'http://portal.yazhuokj.com/login'
// }
export default {
  components: {
    myGrades,
    myCourse,
    studyMap
  },
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {
    this.init()
  },
  mounted () {},
  methods: {
    init () {
      // 获取token
      let token = this.$route.query.token
      // 获取用户头像
      let headImgUrl = this.$route.query.headImgUrl
      if (token) {
        localStorage.setItem('token', token)
      }
      if (headImgUrl) {
        localStorage.setItem('headImgUrl', headImgUrl)
      }
      headImgUrl = localStorage.getItem('headImgUrl')
      this.$store.state.headImgUrl = headImgUrl
      // token验证接口
      this.checkToken()
    },
    // 验证token是否失效
    checkToken () {
      let token = localStorage.getItem('token')
      if (this.isblank(token)) {
        console.log(token)
        this.$confirm('暂未登录，是否重新登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.location.href = this.targetURL + '?orient=' + this.orient
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$api.checkTk({
          jwt: token
        }).then(res => {
          if (res.code == 200 && res.data == 0) {
            this.$store.state.isLogin = true
            history.replaceState({}, 'personalcenter', this.currentURL)
          } else {
            this.$confirm('登录已失效，是否重新登录', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              window.location.href = this.targetURL + '?orient=' + this.orient
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .main{
    width: 100%;
    background: #F4F5FC;
  }
</style>
