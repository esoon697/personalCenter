<template>
  <div class="footer-box">
    <div class="up-box">
      <ul>
        <li>
          <img :src="base+'header-logo.png'" alt="">
        </li>
        <li>
          <i class="el-icon-phone"></i>
          <span>400-0867-229</span>
          <span>(周一至周五：9:00-17:30)</span>
        </li>
        <li>
          <span>官方链接：</span>
          <a href="http://portal.yazhuokj.com">亚卓官网</a>
          <a href="">微信公众号</a>
        </li>
      </ul>
    </div>
    <div class="down-box">
      <span>四川亚卓教育科技股份有限公司 Copyright ©2018 亚卓教育 All RIGHTS RESERVED. 蜀ICP备13026910号-2</span>
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
  methods: {},
  watch: {}
}
</script>
<style lang="less" scoped>
@theme: #007AB7;
.footer-box{
  width: 100%;
  height: 180px;
  font-size:18px;
  font-family:Microsoft YaHei;
  .up-box{
    width: 100%;
    height: 120px;
    background-color: #F5F5F5;
    display: flex;
    justify-content: center;
    align-items: center;
    ul{
      display: flex;
      li{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 40px;
        height: 40px;
        list-style: none;
        border-right: 1px solid #9A9A9A;
        &:last-child{
          span{
            font-size: 18px;
            font-weight: bold;
            color: #323232;
          }
          a{
            font-size: 14px;
            color: @theme;
            margin-right: 10px;
            text-decoration:none;
            &:last-child{
              margin-right: 0;
            }
          }
        }
        img{
          width:410px;
          height:26px;
        }
        i{
          font-size: 20px;
          margin-right: 10px;
        }
        span{
          font-size:18px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:#323232;
          &:last-child{
            font-size:14px;
            color:#666666;
            margin-left: 20px;
          }
        }
      }
    }
  }
  .down-box{
    width: 100%;
    height: 60px;
    background-color: @theme;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      font-size:18px;
      font-weight:400;
      color:rgba(245,245,245,1);
      line-height:45px;
    }
  }
}
</style>
