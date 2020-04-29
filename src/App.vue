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
  },
  methods: {
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
    box-sizing: border-box;
    overflow: hidden;
    min-width: 1200px;
  }
  .el-pager li{
    color: #666;
    &:hover{
      color: #409EFF;
    }
    &:active{
      color: #409EFF;
    }
  }
  .el-pager li.active{
    color: #409EFF;
  }
}
</style>
