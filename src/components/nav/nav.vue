<template>
  <div class="nav-wrapper">
    <div class="nav-box">
      <div class="nav-header" v-if="!isCollapse">
        <img class="header-left" :src="isLogin&&headImgUrl?headImgUrl:base+'default-avatar.jpg'">
        <div class="header-right">
          <p class="uname">天高任鸟飞</p>
          <p class="uid">
            <span>ID:</span>
            <span>yzteacher100</span>
            </p>
        </div>
        <div></div>
      </div>
      <div class="nav-header" v-else>
          <img class="header-left" :src="isLogin&&headImgUrl?headImgUrl:base+'default-avatar.jpg'">
      </div>
      <el-menu
      :default-active="currentPath"
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
                      <!-- <i :class="routerList.icon"></i> -->
                      <img :src="routerList.icon" alt="">
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
                  <img :src="routerList.icon" alt="">
                  <span slot="title">{{routerList.title}}</span>
              </el-menu-item>
          </template>
      </el-menu>
    </div>
    <div class="nav-btn" @click="isCollapse = !isCollapse">
        <i class="el-icon-arrow-right" v-if="isCollapse"></i>
        <i class="el-icon-arrow-left" v-else></i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  props: {},
  data () {
    return {
      currentPath: '',
      openeds: ['0'],
      isCollapse: false,
      routerLists: [
        {
          title: '首页',
          path: '/centerIndex',
          name: 'CenterIndex',
          icon: 'http://182.148.48.236:54321/source/personalCenter/nav_icon0.png',
          children: []
        },
        // {
        //   title: '学习中心',
        //   path: '/studyCenter',
        //   name: 'StudyCenter',
        //   // icon: 'el-icon-menu',
        //   icon: 'http://182.148.48.236:54321/source/personalCenter/nav_icon1.png',
        //   children: [
        //     // {
        //     //   title: '个人中心',
        //     //   path: '/studyCenter/centerIndex',
        //     //   name: 'CenterIndex',
        //     //   children: []
        //     // },
        //     {
        //       title: '课前预习',
        //       path: '/studyCenter/preview',
        //       name: 'Preview',
        //       children: []
        //     },
        //     {
        //       title: '课堂互动',
        //       path: '/studyCenter/interaction',
        //       name: 'Interaction',
        //       children: []
        //     },
        //     {
        //       title: '课后任务',
        //       path: '/studyCenter/courseTask',
        //       name: 'CourseTask',
        //       children: []
        //     },
        //     {
        //       title: '课程评价',
        //       path: '/studyCenter/courseEvaluation',
        //       name: 'CourseEvaluation ',
        //       children: []
        //     },
        //     {
        //       title: '学习反馈',
        //       path: '/studyCenter/studyFeedback',
        //       name: 'StudyFeedback',
        //       children: []
        //     },
        //     {
        //       title: '我的作业',
        //       path: '/studyCenter/myWork',
        //       name: 'MyWork',
        //       children: []
        //     }
        //   ]
        // },
        {
          title: '教师管理',
          path: '/teacherManagement',
          name: 'TeacherManagement',
          icon: 'http://182.148.48.236:54321/source/personalCenter/nav_icon1.png',
          children: [
            {
              title: '导入建课',
              path: '/teacherManagement/initCourseEntrance',
              name: 'initCourseEntrance',
              children: []
            },
            {
              title: '自主建课',
              path: '/teacherManagement/customCourse',
              name: 'CustomCourse',
              children: []
            },
            {
              title: '开课管理',
              path: '/teacherManagement/OpenCourse',
              name: 'OpenCourse',
              children: []
            },
            {
              title: '考试管理',
              path: '/teacherManagement/examBuild',
              name: 'ExamBuild',
              children: []
            },
            {
              title: '试卷管理',
              path: '/teacherManagement/testPaperBuild',
              name: 'TestPaperBuild',
              children: []
            },
            {
              title: '课程管理',
              path: '/teacherManagement/courseManage',
              name: 'CourseManage',
              children: []
            },
            {
              title: '课程类别管理',
              path: '/teacherManagement/courseTypeManage',
              name: 'CourseTypeManage',
              children: []
            },
            {
              title: '学生选课',
              path: '/teacherManagement/stuChooseCourse',
              name: 'StuChooseCourse',
              children: []
            },
            {
              title: '我的选课',
              path: '/teacherManagement/myChooseCourse',
              name: 'MyChooseCourse',
              children: []
            }
          ]
        }
        // {
        //   title: '讨论中心',
        //   path: '/',
        //   name: 'DiscussionCenter',
        //   icon: 'http://182.148.48.236:54321/source/personalCenter/nav_icon2.png',
        //   children: [
        //     {
        //       title: '讨论中心',
        //       path: '/',
        //       name: 'DiscussionCenter',
        //       children: []
        //     }
        //   ]
        // },
        // {
        //   title: '我的考试',
        //   path: '/',
        //   name: 'MyExam',
        //   icon: 'http://182.148.48.236:54321/source/personalCenter/nav_icon3.png',
        //   children: [
        //     {
        //       title: '我的考试',
        //       path: '/',
        //       name: 'MyExam',
        //       children: []
        //     }
        //   ]
        // },
        // {
        //   title: '个人设置',
        //   path: '/',
        //   name: 'MySitting',
        //   icon: 'http://182.148.48.236:54321/source/personalCenter/nav_icon4.png',
        //   children: [
        //     {
        //       title: '个人设置',
        //       path: '/',
        //       name: 'MySitting',
        //       children: []
        //     }
        //   ]
        // }
      ]
    }
  },
  created () {},
  mounted () {},
  computed: {
    ...mapState(['headImgUrl', 'isLogin'])
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        console.log(val)
        this.currentPath = val.path
      },
      // 深度观察监听
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.nav-wrapper{
    display: flex;
    // flex-direction: column;
    justify-content: center;
    // align-items: center;
    // width: 240px;
    .nav-box{
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      background-color: #fff;
      box-shadow: 0px 5px 17px -2px rgba(240,240,240,1);
      .nav-header{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
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
          width: 200px;
          // min-height: 100vh;
      }
      .el-menu--collapse{
          // min-height: 100vh;
      }
      .el-menu{
        border-right: none;
      }
    }
    .nav-btn{
        height: 100%;
        cursor: pointer;
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
