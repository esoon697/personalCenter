import Vue from 'vue'
import Router from 'vue-router'
import StudyCenter from '@/views/StudyCenter/StudyCenter'
import CenterIndex from '@/views/CenterIndex/CenterIndex'
import Preview from '@/views/Preview/Preview'
import Interaction from '@/views/Interaction/Interaction'
import CourseTask from '@/views/CourseTask/CourseTask'
import CourseEvaluation from '@/views/CourseEvaluation/CourseEvaluation'
import StudyFeedback from '@/views/StudyFeedback/StudyFeedback'
import MyWork from '@/views/MyWork/MyWork'
import TeacherManagement from '@/views/TeacherManagement/TeacherManagement'
import InitCourseEntrance from '@/views/TeacherManagement/InitCourseEntrance/InitCourseEntrance'
import Tree from '@/views/tree/tree'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/centerIndex' },
    {
      title: '首页',
      path: '/centerIndex',
      name: 'CenterIndex',
      component: CenterIndex,
      children: []
    },
    {
      title: '学习中心',
      path: '/studyCenter',
      name: 'StudyCenter',
      component: StudyCenter,
      children: [
        { path: '/studyCenter', redirect: '/studyCenter/interaction' },
        {
          title: '课前预习',
          path: 'preview',
          name: 'Preview',
          component: Preview,
          children: []
        },
        {
          title: '课堂互动',
          path: 'interaction',
          name: 'Interaction',
          component: Interaction,
          children: []
        },
        {
          title: '课后任务',
          path: 'courseTask',
          name: 'CourseTask',
          component: CourseTask,
          children: []
        },
        {
          title: '课程评价',
          path: 'courseEvaluation',
          name: 'CourseEvaluation ',
          component: CourseEvaluation,
          children: []
        },
        {
          title: '学习反馈',
          path: 'studyFeedback',
          name: 'StudyFeedback',
          component: StudyFeedback,
          children: []
        },
        {
          title: '我的作业',
          path: 'myWork',
          name: 'MyWork',
          component: MyWork,
          children: []
        }
      ]
    },
    {
      title: '教师管理',
      path: '/teacherManagement',
      name: 'TeacherManagement',
      component: TeacherManagement,
      children: [
        { path: '/teacherManagement', redirect: '/teacherManagement/initCourseEntrance' },
        {
          title: '导入建课',
          path: 'initCourseEntrance',
          name: 'InitCourseEntrance',
          component: InitCourseEntrance,
          children: []
        }
      ]
    },
    {
      title: '讨论中心',
      path: '/discussionCenter',
      name: 'DiscussionCenter',
      children: []
    },
    {
      title: '我的考试',
      path: '/',
      name: 'MyExam',
      children: []
    },
    {
      title: '个人设置',
      path: '/',
      name: 'MySitting',
      children: []
    },
    {
      title: 'Tree',
      path: '/tree',
      name: 'Tree',
      component: Tree,
      children: []
    }
  ]
})
