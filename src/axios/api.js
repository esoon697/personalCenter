import {get, post} from './axios'

const api = {
  // getIndex: data => post('/api/index/index', data) 示例
  // 学生选课详细进度情况查询
  getCourseProgress: data => post('/course/studentCourseInfo/queryStuCourseEventByCourType', data),
  // 课程类型
  getCourseType: data => post('/course/courseType/list', data),
  // 我的作业
  getHomeworkInfo: data => post('/course/studentCourseInfo/queryHomework', data),
  // 我的考试
  getExamInfo: data => post('/course/studentCourseInfo/queryExam', data),
  // 学习中心图表
  getEchartInfo: data => post('/course/studentCourseInfo/chartQuery', data),
  // 学习地图
  getLearningMap: data => post('/course/studentCourseInfo/courseSelectionForLearningMap', data),
  // 验证token是否失效
  checkTk: data => get('http://api.yazhuokj.com/common/api/checkJWT', data)
}

export default api
