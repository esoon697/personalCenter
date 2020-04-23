<template>
  <div id="app">
    <Header/>
    <div class="app-main">
      <Nav/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header/Header'
import Nav from './components/nav/nav'
export default {
  name: 'App',
  components: {Header, Nav},
  created () {
    this.init()
  },
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
        // window.location.href = 'http://portal.yazhuokj.com/login' + '?orient=personalCenter'
      } else {
        this.$api.checkTk({
          jwt: token
        }).then(res => {
          if (res.code == 200 && res.data == 0) {
            this.$store.state.isLogin = true
            history.pushState({}, 'personalcenter', 'http://personal.yazhuokj.com/studyCenter/centerIndex')
            // history.pushState({}, 'personalcenter', 'http://10.10.10.213:8082/studyCenter/centerIndex')
          } else {
            // window.location.href = 'http://portal.yazhuokj.com/login' + '?orient=personalCenter'
            // window.location.href = 'http://10.10.10.213:4399/login' + '?orient=personalCenter'
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
@import url("./assets/css/common.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  font-size: 16px;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  .app-main{
    display: flex;
    background: #F4F5FC;
    // padding-top: 10px;
    // margin-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
    min-width: 1200px;
  }
}
</style>
