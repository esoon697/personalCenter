<template>
  <div class="header-wrapper">
    <div class="header-left">
      <img :src="base + 'header-logo.png'" alt="">
    </div>
    <div class="header-right">
      <div class="search-wrap flex-center-y">
        <input type="text" placeholder="搜索功能" class="search-input">
        <img :src="base + 'header-search.png'" alt="">
      </div>
      <img class="avatar" v-if="isLogin" :src="headImgUrl?headImgUrl:base+'default-avatar.jpg'" @click="goEducationPlatform">
      <img class="avatar" v-else :src="base+'default-avatar.jpg'" @click="goLogin">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// let comeBackURL = null
// let targetURL = null
// let orient = window.location.href
// if (process.env.NODE_ENV == 'development') {
//   // dev开发环境
//   comeBackURL = 'http://nys.yazhuokj.com/home'
//   targetURL = 'http://10.10.10.213:5000/login'
// } else if (process.env.NODE_ENV == 'production') {
//   // build生产环境
//   comeBackURL = 'http://edu.yazhuokj.com/home'
//   targetURL = 'http://portal.yazhuokj.com/login'
// }
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  computed: {
    ...mapState(['headImgUrl', 'isLogin'])
  },
  methods: {
    goLogin () {
      window.location.href = this.targetURL + '?orient=' + this.orient
    },
    goEducationPlatform () {
      let token = localStorage.getItem('token')
      window.location.href = this.comeBackURL + '?token=' + token
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.header-wrapper{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  box-shadow:0px 5px 17px 1px rgba(230,239,253,1);
  z-index: 1;
  .header-left{
    width:440px;
    height:29px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .header-right{
    display: flex;
    justify-content: center;
    align-items: center;
    .search-wrap {
      width: 340px;
      height: 30px;
      line-height: 30px;
      border-radius: 20px;
      background-color: #ECECEC;
      padding: 0 10px;
      box-sizing: border-box;
      img{
        width: 21px;
        height: 21px;
        cursor: pointer;
      }
      .search-input {
        height: 30px;
        line-height: 30px;
        background-color: #ECECEC;
        border-radius: 30px;
        border: none;
        outline: none;
        width: 350px;
        font-size: 14px;
        padding-left: 5px;
        box-sizing: border-box;
        color: #333;
      }
      .search-icon{
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
    .avatar{
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin: 0 20px 0 70px;
      cursor: pointer;
    }
  }
}
</style>
