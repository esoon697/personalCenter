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
  checkTk: data => get('http://api.yazhuokj.com/common/api/checkJWT', data),
  // 导入建课
  importCourse: data => get('/course/courseInfo/courseRecycledWithCopyright', data),
  // 自主建课-第一步-查询课程分类
  getAddCourseType: data => get('/course/courseType/listForAddCourseInfo', data),
  // 自主建课-第一步-上传封面
  uploadCover: data => post('/course/coverInfo/uploadCover', data),
  // 自主建课-第一步-创建
  addCourseFirst: data => post('/course/courseInfo/add', data),
  // 自主建课-第二步-获取树节点
  getTreeList: data => get('/course/courseChapter/listForBuilding', data),
  // 自主建课-第二步-新增同级目录/新增子级目录
  addTreeNode: data => post('/course/courseChapter/add', data),
  // 自主建课-第二步-编辑目录
  uploadTreeNode: data => post('/course/courseChapter/update', data),
  // 自主建课-第二步-删除目录
  deleteTreeNode: data => get('/course/courseChapter/delete', data),
  // 自主建课-第二步-查询素材库
  findSourceInfo: data => post('/course/processInfo/findSourceInfo', data),
  // 自主建课-第二步-课程内容编辑
  addBatch: data => get('/course/processInfo/addBatch', data),
  // 初始化试卷信息
  getInitPaperInfo: data => get('/paper/querymarkandtype', data),
  // 查询互动信息
  getaAtivelist: data => post('/paper/searchactive', data),
  // 创建考试
  creatExam: data => post('/exmple/createexmple', data),
  // 考试建设-查询课程信息
  getCourseInfo: data => get('/exmple/courselist', data),
  // 查询试卷
  // 创建考试
  creatPaper: data => post('/paper/create', data)
}

export default api
