<template>
  <div class="initCourse-wrapper">
    <div class="main-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane name="1">
          <span slot="label"  class="teb-item" :class="{'teb-item-active':activeName === '1'}"><span class="circle-icon" :class="{'circle-icon-active':activeName === '1'}">1</span> <span>课程基本信息</span></span>
          <BasicInfo/>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label"  class="teb-item" :class="{'teb-item-active':activeName === '2'}"><span class="circle-icon" :class="{'circle-icon-active':activeName === '2'}">2</span> <span>目录内容编辑</span></span>
          <MenuTree/>
        </el-tab-pane>
        <el-tab-pane name="3">
          <span slot="label"  class="teb-item" :class="{'teb-item-active':activeName === '3'}"><span class="circle-icon" :class="{'circle-icon-active':activeName === '3'}">3</span> <span>课程权限设置</span></span>
          <Permission/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import BasicInfo from './components/BasicInfo/BasicInfo'
import MenuTree from './components/MenuTree/MenuTree'
import Permission from './components/Permission/Permission'
export default {
  components: {BasicInfo, MenuTree, Permission},
  props: [],
  data () {
    return {}
  },
  computed: {
    // ...mapState(['activeName'])
    activeName: {
      get () {
        return this.$store.state.activeName
      },
      set (val) {
        this.$store.state.activeName = val
      }
    }
  },
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let activeName = sessionStorage.getItem('activeName')
      if (activeName) {
        this.$store.state.activeName = activeName
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  watch: {
    activeName (val) {
      sessionStorage.setItem('activeName', val)
    }
  }
}
</script>
<style lang="less">
.initCourse-wrapper{
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 80px 80px 0;
  box-sizing: border-box;
  .main-box{
    max-width: 1350px;
    margin: 0 auto;
    // overflow: hidden;
    .el-tabs__nav-scroll{
      display: flex;
      justify-content: center;
    }
    .teb-item{
      padding: 0 70px;
      display: flex;
      align-items: center;
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:#666666;
      .circle-icon{
        display: inline-block;
        width:34px;
        height:34px;
        background:#DDDDDD;
        border-radius:50%;
        margin-right: 10px;
        font-size:24px;
        line-height: 34px;
        text-align: center;
        color:rgba(255,255,255,1)
      }
    }
    @media screen and (max-width: 1200px) {
      .teb-item{
        padding: 0 50px;
      }
    }
    @media screen and (max-width: 980px) {
      .teb-item{
        padding: 0 20px;
      }
    }
    .teb-item-active{
      color:rgba(51,51,51,1);
      .circle-icon-active{
        background:rgba(0,122,183,1);
      }
    }
    .el-tabs__item{
      padding: 0;
      height: 50px;
    }
  }
}
</style>
