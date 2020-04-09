<template>
  <div class="nav-wrapper">
    <div class="nav-header">
      <img class="header-left" src="../../assets/photo.jpeg">
      <div class="header-right">
        <p class="uname">天高任鸟飞</p>
        <p class="uid">
          <span>ID:</span>
          <span>yzteacher100</span>
          </p>
      </div>
      <div></div>
    </div>
    <el-menu
    default-active="centerIndex"
    class="el-nav"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :default-openeds="openeds"
    router
    >
        <template v-for="(routerList, index) in routerLists">
            <el-submenu :index="index+''" :key="index" v-if="routerList.children.length">
                <template slot="title">
                    <i :class="routerList.icon"></i>
                    <span slot="title">{{routerList.title}}</span>
                </template>
                <template v-for="(routers, index) in routerList.children">
                    <el-submenu :index="index+''" :key="index" v-if="routers.children.length">
                        <span slot="title">{{routers.title}}</span>
                        <el-menu-item :index="routerItem.path" v-for="(routerItem, index) in routers.children" :key="index">{{routerItem.title}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item :index="routers.path" :key="index" v-else>
                        <span slot="title">{{routers.title}}</span>
                    </el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item :index="routerList.path" :key="index" v-else>
                <i :class="routerList.icon"></i>
                <span slot="title">{{routerList.title}}</span>
            </el-menu-item>
        </template>
    </el-menu>
    <div class="nav-btn" @click="isCollapse = !isCollapse">
        <i class="el-icon-arrow-right" v-if="isCollapse"></i>
        <i class="el-icon-arrow-left" v-else></i>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      openeds: ['0'],
      isCollapse: false,
      routerLists: [
        {
          title: '学习中心',
          path: '/studyCenter',
          name: 'StudyCenter',
          icon: 'el-icon-menu',
          children: [
            {
              title: '个人中心',
              path: 'centerIndex',
              name: 'CenterIndex',
              children: []
            },
            {
              title: '课前预习',
              path: '/studyCenter/preview',
              name: 'Preview',
              children: []
            },
            {
              title: '课堂互动',
              path: 'interaction',
              name: 'Interaction',
              children: []
            },
            {
              title: '课后任务',
              path: 'courseTask',
              name: 'CourseTask',
              children: []
            },
            {
              title: '课程评价',
              path: 'courseEvaluation',
              name: 'CourseEvaluation ',
              children: []
            },
            {
              title: '学习反馈',
              path: 'studyFeedback',
              name: 'StudyFeedback',
              children: []
            },
            {
              title: '我的作业',
              path: 'myWork',
              name: 'MyWork',
              children: []
            }
          ]
        },
        {
          title: 'Tree',
          path: '/tree',
          name: 'Tree',
          children: []
        }
      ]
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.nav-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 240px;
    .nav-header{
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(221,221,221,1);
      .header-left{
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .header-right{
        .uname{
          width:76px;
          height:15px;
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        .uid{
          width:108px;
          height:14px;
          font-size:12px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
      }
    }
    .el-nav:not(.el-menu--collapse) {
        width: 186px;
        min-height: 100vh;
    }
    .el-menu--collapse{
        min-height: 100vh;
    }
    .nav-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        opacity: 0;
        transition: all .2s linear;
        &:hover{
            background-color: #aaa;
            color: #fff;
            opacity: .75;
        }
    }
}
</style>
