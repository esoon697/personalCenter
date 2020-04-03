<template>
  <div class="nav-wrapper">
    <el-menu default-active="/home"
    class="el-nav"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :default-openeds="openeds"
    router
    >
        <template v-for="(routerList, index) in routerLists">
            <el-submenu :index="index+''" :key="index" v-if="!routerList.path">
                <template slot="title">
                    <i :class="routerList.icon"></i>
                    <span slot="title">{{routerList.title}}</span>
                </template>
                <template v-for="(routers, index) in routerList.children">
                    <el-submenu :index="index+''" :key="index" v-if="!routers.path">
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
          title: '首页',
          //   path: '/',
          icon: 'el-icon-menu',
          name: 'Home1',
          children: [
            {
              title: '首页1',
              path: '/home',
              name: 'Home',
              children: []
            },
            {
              title: '首页2',
              //   path: '/home/2',
              name: 'Home2',
              children: [
                {
                  title: '首页2-1',
                  path: '/home/2/1',
                  name: 'Home',
                  children: []
                }
              ]
            }
          ]
        },
        {
          title: 'Echart',
          icon: 'el-icon-document',
          path: '/echart',
          name: 'Echart',
          children: []
        },
        {
          title: 'Tree',
          icon: 'el-icon-location',
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
    .el-nav:not(.el-menu--collapse) {
        width: 200px;
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
