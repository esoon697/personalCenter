<template>
  <div id="app">
    <Header/>
    <div class="main">
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
  components: {Header, Nav}
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  .main{
    display: flex;
  }
}
</style>
