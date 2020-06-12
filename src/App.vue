<template>
  <div id="app">
    <Header/>
    <div class="app-main">
      <Nav/>
      <router-view class="content-box"/>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header/Header'
import Nav from './components/nav/nav'
import Footer from './components/footer/footer'
export default {
  name: 'App',
  components: {Header, Nav, Footer},
  created () {
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('messageStore', JSON.stringify(this.$store.state))
    })
    // 在页面加载时读取localStorage里的状态信息
    sessionStorage.getItem('messageStore') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem('messageStore'))))
  },
  methods: {
  }
}
</script>

<style lang="less">
@import url("./assets/css/common.css");
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
    box-sizing: border-box;
    overflow: hidden;
    // min-width: 1200px;
    // min-height: calc(100vh - 250px);
    .content-box{
      flex: 1;
      height: 100%;
      min-width: 600px;
      min-height: calc(100vh - 250px);
    }
  }
}
</style>
