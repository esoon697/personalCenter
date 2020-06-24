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
  // 查询作业/试卷
  queryHomework: data => get('/course/homeworkChapter/queryHomework', data),
  // 自主建课第二步——新增作业
  addTest: data => post('/course/homeworkChapter/addBatch', data),
  // 自主建课-第二步-获取课程内容类型
  // getCourContentType: data => post('/course/processType/list', data),
  getCourContentType: data => get('/course/processInfo/listInnerProcessType', data),
  // 自主建课-第二步-查询素材库
  findSourceInfo: data => post('/course/processInfo/findSourceInfo', data),
  // 自主建课-第二步-课程内容本地上传
  uploadLocal: data => post('/course/processInfo/uploadSourceInfo', data),
  // 自主建课-第二步-课程内容更新
  // addBatch: data => post('/course/processInfo/addBatch', data),
  uploadBatch: data => post('/course/processInfo/updateBatch', data),
  // 自主建课-第二步-资源库选择新增
  addResourseBatch: data => post('/course/processInfo/addBatch', data),
  // 自主建课-第二步-查询可下载编辑资源包列表
  getLoadPerms: data => post('/course/courseResource/list', data),
  // 自主建课-第二步-批量更新可下载编辑资源包列表
  uploadLoadPerms: data => post('/course/courseResource/updateBatch', data),
  // 自主建课-第二步-查询下载资源包
  getLoadPackage: data => post('/course/resourcePackage/list', data),
  // 自主建课-第二步-查询资源包类型
  getLoadPackageType: data => post('/course/resourcePackageType/list', data),
  // 自主建课-第二步-选择可下载资源包
  addPackage: data => post('/course/courseResource/addBatch', data),
  // 自主建课-第二步-可下载资源本地上传
  uploadLocalPackage: data => post('/course/resourcePackage/uploadPackage', data),
  // 自主建课-第三步-查询特定人员/老师
  getTeacher: data => get('/course/courseEvent/queryTeacher', data),
  // 自主建课-第三步-设置课程权限
  setCourPermission: data => post('/course/courseInfo/updateForLastStepBuilding', data),
  // 初始化试卷信息
  getInitPaperInfo: data => get('/education/paper/querymarkandtype', data),
  // 查询互动信息
  getaAtivelist: data => post('/education/paper/searchactive', data),
  // 创建试卷
  creatPaper: data => post('/education/paper/create', data),
  // 考试建设-查询课程信息
  getCourseInfo: data => get('/education/exmple/courselist', data),
  // 查询试卷
  getExamList: data => post('/education/exmple/paperlist', data),
  // 创建考试
  creatExam: data => post('/education/exmple/initexample', data),
  // 开课-查询学生
  getStudent: data => get('/course/courseEvent/queryStudent', data),
  // 开课
  openCourse: data => post('/course/courseEvent/add', data),
  // 开课-课程列表
  getCourseList: data => post('/course/courseInfo/listForPersonnelCenter', data),
  // 学生选课-查询选课列表
  getStuCourseList: data => post('/course/courseEvent/listForStudentsSelecting', data),
  // 学生选课-学生选课
  stuSelectCourse: data => post('/course/studentCourseInfo/courseSelectionForStu', data),
  // 学生选课-我的选课
  selectMyCourse: data => post('/course/studentCourseInfo/list', data),
  // 学生选课-课程详情
  getStuCourseDetail: data => get('/course/courseEvent/detail', data),
  // 课程管理-查询/搜索
  getCourManageInfo: data => post('/course/courseInfo/list', data),
  // 课程管理-新增
  // 课程管理-编辑
  uploadCourManageInfo: data => post('/course/courseInfo/update', data),
  // 课程管理-删除
  delCourManageInfo: data => get('/course/courseInfo/delete', data),
  // 课程类别管理-查询/搜索
  getCourTypeManageInfo: data => post('/course/courseType/list', data),
  // 课程类别管理-新增
  addCourTypeManageInfo: data => post('/course/courseType/add', data),
  // 课程类别管理-编辑
  uploadCourTypeManageInfo: data => post('/course/courseType/update', data),
  // 课程类别管理-删除
  delCourTypeManageInfo: data => get('/course/courseType/delete', data),
  // 钉钉code免登
  postDingLogin: data => get('/dinglogin/login/ding', data)
}

export default api
