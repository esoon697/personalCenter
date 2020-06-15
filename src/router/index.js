import Vue from 'vue'
import Router from 'vue-router'
import StudyCenter from '@/views/StudyCenter/StudyCenter'
import CenterIndex from '@/views/CenterIndex/CenterIndex'
import Preview from '@/views/StudyCenter/Preview/Preview'
import Interaction from '@/views/StudyCenter/Interaction/Interaction'
import CourseTask from '@/views/StudyCenter/CourseTask/CourseTask'
import CourseEvaluation from '@/views/StudyCenter/CourseEvaluation/CourseEvaluation'
import StudyFeedback from '@/views/StudyCenter/StudyFeedback/StudyFeedback'
import MyWork from '@/views/StudyCenter/MyWork/MyWork'
import TeacherManagement from '@/views/TeacherManagement/TeacherManagement'
import InitCourseEntrance from '@/views/TeacherManagement/InitCourseEntrance/InitCourseEntrance'
import CustomCourse from '@/views/TeacherManagement/CustomCourse/CustomCourse'
import OpenCourse from '@/views/TeacherManagement/OpenCourse/OpenCourse'
import ExamBuild from '@/views/TeacherManagement/ExamBuild/ExamBuild'
import TestPaperBuild from '@/views/TeacherManagement/TestPaperBuild/TestPaperBuild'
import CourseManage from '@/views/TeacherManagement/CourseManage/CourseManage'
import CourseTypeManage from '@/views/TeacherManagement/CourseTypeManage/CourseTypeManage'
import StuChooseCourse from '@/views/TeacherManagement/StuChooseCourse/StuChooseCourse'
import MyChooseCourse from '@/views/TeacherManagement/MyChooseCourse/MyChooseCourse'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: '/personal',
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
        },
        {
          title: '自主建课',
          path: 'customCourse',
          name: 'CustomCourse',
          component: CustomCourse,
          children: []
        },
        {
          title: '开课管理',
          path: 'openCourse',
          name: 'OpenCourse',
          component: OpenCourse,
          children: []
        },
        {
          title: '考试建设',
          path: 'examBuild',
          name: 'ExamBuild',
          component: ExamBuild,
          children: []
        },
        {
          title: '试卷建设',
          path: 'testPaperBuild',
          name: 'TestPaperBuild',
          component: TestPaperBuild,
          children: []
        },
        {
          title: '课程管理',
          path: 'courseManage',
          name: 'CourseManage',
          component: CourseManage,
          children: []
        },
        {
          title: '课程类型管理',
          path: 'courseTypeManage',
          name: 'CourseTypeManage',
          component: CourseTypeManage,
          children: []
        },
        {
          title: '学生选课',
          path: 'stuChooseCourse',
          name: 'StuChooseCourse',
          component: StuChooseCourse,
          children: []
        },
        {
          title: '我的选课',
          path: 'myChooseCourse',
          name: 'MyChooseCourse',
          component: MyChooseCourse,
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
    }
  ]
})
