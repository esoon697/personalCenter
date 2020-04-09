<template>
  <div class="header-wrapper">
    <div class="header-left">
      yazhuojiaoyu
    </div>
    <div class="header-right">
      <div class="search-wrap">
        <input type="text" placeholder="请输入关键词" class="search-input">
        <i class=" el-icon-search"></i>
      </div>
      <img class="avatar" src="../../assets/photo.jpeg">
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {},
  watch: {}
}
</script>
<style lang="less" scoped>
.header-wrapper{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0;
  box-shadow:0px 5px 17px 1px rgba(230,239,253,1);
  .header-left{
    width:440px;
    height:29px;
  }
  .header-right{
    display: flex;
    justify-content: center;
    align-items: center;
    .search-wrap {
      width: 400px;
      height: 30px;
      line-height: 30px;
      border-radius: 20px;
      background-color: #ECECEC;
      padding: 0 10px;
      box-sizing: border-box;
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
    }
  }
}
</style>
