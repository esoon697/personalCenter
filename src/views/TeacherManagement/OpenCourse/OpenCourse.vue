<template>
  <div class="openCourse-box">
    <div class="openCourse-inner">
      <div class="title">开设建课</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" label-position="right">
        <el-form-item label="选择课程：" prop="course">
          <div class="wrapper">
            <el-input class="lengthStyle" v-model="ruleForm.course.label" placeholder="请选择课程" disabled></el-input>
            <button class="choose-btn" @click.prevent="chooseCourse">选择</button>
          </div>
        </el-form-item>
        <el-form-item label="课程名称：" prop="courseName">
          <el-input  class="lengthStyle" v-model="ruleForm.courseName" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="授课教师：" prop="teacher">
          <div class="wrapper">
            <el-select class="lengthStyle" v-model="ruleForm.teacher" filterable placeholder="请选择授课教师">
              <el-option
                v-for="item in teacherOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-input  class="lengthStyle" v-model="ruleForm.name" placeholder="请选择授课教师" disabled></el-input>
            <button class="choose-btn" @click="chooseTeacher">选择</button> -->
          </div>
        </el-form-item>
        <el-form-item label="课程时间：" prop="courseTime" disabled>
          <el-date-picker
            v-model="ruleForm.courseTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开课时间"
            end-placeholder="结课时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学生可选：" prop="isChoice">
          <el-radio-group v-model="ruleForm.isChoice">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="ruleForm.isChoice===0" label="选课学生：" prop="student">
          <div class="wrapper" @click="chooseStu">
            <el-select class="lengthStyle" v-model="checkedStuName" multiple collapse-tags disabled placeholder="请选择选课学生">
              <!-- <el-option
                v-for="item in ruleForm.student"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option> -->
            </el-select>
            <button class="choose-btn" @click.prevent="chooseStu">选择</button>
          </div>
        </el-form-item>
        <el-form-item label="选课人数：" prop="chooseNum">
          <el-input class="lengthStyle" v-model.number="ruleForm.chooseNum" placeholder="请输入选课人数"></el-input>
        </el-form-item>
        <el-form-item label="选课时间：" required>
          <el-col :span="11.5">
            <el-form-item prop="timeValue1">
              <el-time-picker
                v-model="ruleForm.timeValue1"
                :picker-options="{
                  selectableRange: '18:30:00 - 20:30:00'
                }"
                placeholder="开始时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11.5">
            <el-form-item prop="timeValue2">
              <el-time-picker
                arrow-control
                v-model="ruleForm.timeValue2"
                :picker-options="{
                  selectableRange: '18:30:00 - 20:30:00'
                }"
                placeholder="结束时间">
              </el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="开课说明：" prop="desc">
          <el-input type="textarea" :rows="9" v-model="ruleForm.desc" maxlength="200" :show-word-limit="true"></el-input>
        </el-form-item>
        <el-form-item label="通过分数：" prop="passVal">
          <el-input class="lengthStyle1" v-model="ruleForm.passVal" oninput = "value=value.replace(/[^\d]/g,'')" placeholder="请输入通过分数"></el-input>
        </el-form-item>
        <el-form-item label="视频观看比：" prop="watched">
          <div class="wrapper">
            <el-input class="lengthStyle1" v-model="ruleForm.watched" oninput = "value=value.replace(/[^\d]/g,'')" placeholder="请输入视频观看比"></el-input>%
            <span class="annotation">（参加考试前，需要完成视频观看百分比）</span>
          </div>
        </el-form-item>
        <el-form-item label="视频考核比例：" prop="videoAssess">
          <div class="wrapper">
            <el-input class="lengthStyle1" v-model="ruleForm.videoAssess" oninput = "value=value.replace(/[^\d]/g,'')" placeholder=""></el-input>%
          </div>
        </el-form-item>
        <el-form-item label="作业考核比例：" prop="workAssess">
          <div class="wrapper">
            <el-input class="lengthStyle1" v-model="ruleForm.workAssess" oninput = "value=value.replace(/[^\d]/g,'')" placeholder=""></el-input>%
          </div>
        </el-form-item>
        <el-form-item label="考试考核比例：" prop="taskAssess">
          <div class="wrapper">
            <el-input class="lengthStyle1" v-model="ruleForm.taskAssess" oninput = "value=value.replace(/[^\d]/g,'')" placeholder=""></el-input>%
          </div>
        </el-form-item>
        <div class="wrapper">
          <el-form-item label="讨论考核比例：" prop="discussAssess">
            <div class="wrapper">
              <el-input class="lengthStyle1" v-model="ruleForm.discussAssess" oninput = "value=value.replace(/[^\d]/g,'')" placeholder=""></el-input>%
            </div>
          </el-form-item>
          <el-form-item label="发布讨论次数：" prop="discussCount">
            <el-input class="lengthStyle1" v-model="ruleForm.discussCount" oninput = "value=value.replace(/[^\d]/g,'')" placeholder=""></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <div class="btn-group">
            <button class="create-btn" @click.prevent="submitForm('ruleForm')">创建</button>
            <button class="reset-btn" @click.prevent="resetForm('ruleForm')">重置</button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <myDialog
    :title="'选择课程'"
    :aside="true"
    @close="chooseCourClose"
    @confirm="chooseCourConfirm"
    v-show="isShowchooseCour">
      <div class="chooseCour-btns" slot="dialog-btns">
        <div>
          <label for="input1">资源类别：</label>
          <input type="text" name="" id="input1">
          <label for="input2">资源名称：</label>
          <input type="text" name="" id="input2">
        </div>
        <button class="search-btn">查询</button>
      </div>
      <div class="chooseCour-box" slot="dialog-content">
        <el-tree
        slot="dialog-content"
        :data="courseData"
        :props="defaultProps"
        @node-click="courNodeClick"
        ></el-tree>
      </div>
    </myDialog>
    <myDialog
    :title="'选择学生'"
    :aside="true"
    @close="chooseStuClose"
    @confirm="chooseStuConfirm"
    v-show="isShowchooseStu">
      <div class="chooseStu-btns" slot="dialog-btns">
          <div class="select-box">
            <label>专业：</label>
            <el-select class="lengthStyle1" v-model="stuProfessionVal" placeholder="请选择">
              <el-option
                v-for="item in professionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="select-box">
            <label>班级：</label>
            <el-cascader
              class="lengthStyle1"
              v-model="CascVal"
              :options="CascOptions"
              @change="CascChange"></el-cascader>
          </div>
          <div class="select-box">
            <label>姓名：</label>
              <el-input class="lengthStyle1" v-model="stuNameVal" placeholder="请输入内容"></el-input>
          </div>
          <div class="select-box">
            <label>学号：</label>
              <el-input class="lengthStyle1" v-model="stuNumVal" placeholder="请输入内容"></el-input>
          </div>
        <button class="search-btn">查询</button>
      </div>
      <div class="chooseStu-box" slot="dialog-content">
        <el-tree
        ref="stuTree"
        slot="dialog-content"
        :data="studentData"
        :props="defaultProps"
        @node-click="stuNodeClick"
        @check-change="stuCheckChange"
        show-checkbox></el-tree>
      </div>
    </myDialog>
  </div>
</template>

<script>
import TMContentBox from '@/components/TMContentBox/TMContentBox'
import myDialog from '@/components/myDialog/myDialog'
export default {
  components: {myDialog, TMContentBox},
  props: [],
  data () {
    return {
      ruleForm: {
        course: '',
        courseName: '',
        teacher: '',
        courseTime: '',
        isChoice: '',
        student: [],
        chooseNum: '',
        timeValue1: '',
        timeValue2: '',
        desc: '',
        passVal: '',
        watched: '',
        videoAssess: '',
        workAssess: '',
        taskAssess: '',
        discussAssess: '',
        discussCount: ''
      },
      rules: {
        course: [
          { required: true, message: '请输入活动名称', trigger: 'change' }
        ],
        courseName: [
          { required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '请选择授课教师', trigger: 'change' }
        ],
        courseTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        isChoice: [
          { required: true, message: '请选择学生是否可选', trigger: 'change' }
        ],
        chooseNum: [
          { required: true, message: '请输入选课人数', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              if (Number.isInteger(Number(value)) && Number(value) > 0) {
                callback()
              } else {
                callback(new Error('请输入大于0的整数'))
              }
            },
            trigger: 'blur'
          }
        ],
        passVal: [
          { required: true, message: '请输入通过分数', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              if (Number(value) > 0) {
                callback()
              } else {
                callback(new Error('请输入大于0的数字'))
              }
            },
            trigger: 'blur'
          }
        ],
        watched: [
          { required: true, message: '请输入视频观看比', trigger: 'blur' },
          {
            validator (rule, value, callback) {
              if (Number(value) > 0 && Number(value) <= 100) {
                callback()
              } else {
                callback(new Error('请输入0-100的数字'))
              }
            },
            trigger: 'blur'
          }
        ]
      },
      courseData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  id: 11,
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      studentData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  id: 11,
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isShowchooseCour: false,
      course: null,
      teacherOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      isShowchooseStu: false,
      professionOptions: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      CascOptions: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      stuProfessionVal: '',
      CascVal: '',
      stuNameVal: '',
      stuNumVal: '',
      checkedStu: []
    }
  },
  computed: {
    checkedStuName () {
      return this.ruleForm.student.map(e => e.label)
    }
  },
  created () {},
  mounted () {},
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    chooseCourse () {
      this.isShowchooseCour = true
    },
    courNodeClick (data) {
      console.log(data)
      this.course = data
    },
    chooseCourClose () {
      this.isShowchooseCour = false
    },
    chooseCourConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        if (this.course.children && this.course.children.length) {
          this.$message.warning('请选择某一节课程')
          return
        }
        this.ruleForm.course = this.course
        this.isShowchooseCour = false
      }).catch((e) => {
        console.log(e)
        this.course = null
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    chooseTeacher () {},
    chooseStu () {
      this.isShowchooseStu = true
    },
    CascChange (value) {
      console.log(value)
    },
    stuNodeClick () {},
    stuCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    getCheckedStu () {
      console.log(this.$refs.stuTree.getCheckedNodes())
      let checkedNodes = this.$refs.stuTree.getCheckedNodes()
      this.checkedStu = checkedNodes.filter(e => {
        return !e.children
      }).map(e => {
        return {
          value: e.$treeNodeId,
          label: e.label
        }
      })
      console.log(this.checkedStu)
    },
    chooseStuClose () {
      this.isShowchooseStu = false
    },
    chooseStuConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.getCheckedStu()
        this.ruleForm.student = this.checkedStu
        // this.checkedStuName = this.checkedStu.map(e => e.label)
        this.isShowchooseStu = false
        console.log('this.checkedStu', this.checkedStu)
        console.log('this.ruleForm.student', this.ruleForm.student)
      }).catch((e) => {
        this.checkedStu = []
        console.log(e)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  watch: {
    'ruleForm.isChoice' (val) {
      console.log(val)
    }
  }
}
</script>
<style lang="less" scoped>
@theme: #007AB7;
.openCourse-box{
  padding: 80px;
  box-sizing: border-box;
  .openCourse-inner{
    .title{
      display: inline-block;
      padding: 0 0 13px 20px;
      border-bottom: 4px solid @theme;
      margin-bottom: 40px;
      font-size:20px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(51,51,51,1);
    }
    .el-form{
      // width: 60%;
      .wrapper{
        display: flex;
      }
      .lengthStyle{
        width: 260px;
      }
      .lengthStyle1{
        width: 150px;
      }
      .el-input{
        // width: 90%;
      }
      .el-date-editor{
        margin-right: 20px;
      }
      .el-textarea{
        width: 460px;
      }
      .annotation{
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,0,0,1);
        padding-left: 20px;
      }
      .choose-btn, .create-btn{
        padding: 5px 30px;
        background:@theme;
        border-radius:4px;
        font-size:15px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        white-space: nowrap;
        &:hover{
          opacity: .8;
        }
        &:active{
          opacity: .6;
        }
      }
      .btn-group{
        padding-top: 50px;
        .create-btn{
          margin-right: 30px;
        }
        .reset-btn{
          border:1px solid @theme;
          border-radius:4px;
          font-size:15px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:@theme;
          background-color: #fff;
          padding: 5px 30px;
          &:hover{
            opacity: .8;
            background-color: #eee;
          }
          &:active{
            opacity: .6;
          }
        }
      }
    }
  }
  .chooseCour-btns{
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(51,51,51,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    input{
      border:1px solid rgba(221,221,221,1);
      border-radius:4px;
      text-indent: 10px;
      padding: 7px 0;
      margin-right: 30px;
    }
    .search-btn{
      background:rgba(202,56,66,1);
      border-radius:4px;
      font-size:18px;
      color:rgba(255,255,255,1);
      padding: 5px 20px;
      &:hover{
        opacity: .8;
      }
      &:active{
        opacity: .6;
      }
    }
  }
  .chooseCour-box, .chooseStu-box{
    width: 750px;
    height: 470px;
    border: 1px solid #DFDFE0;
    box-sizing: border-box;
    overflow: auto;
    .el-tree-node__label{
      font-size:18px;
      font-family:Microsoft YaHei;
      font-weight:400;
      // color:rgba(51,51,51,1);
    }
  }
  .chooseStu-btns{
    max-width: 750px;
    display: flex;
    flex-wrap: wrap;
    .select-box{
      margin: 0px 20px 20px 0;
    }
    .search-btn{
      height: 40px;
      background:rgba(202,56,66,1);
      border-radius:4px;
      font-size:18px;
      color:rgba(255,255,255,1);
      padding: 5px 20px;
      &:hover{
        opacity: .8;
      }
      &:active{
        opacity: .6;
      }
    }
  }
  .lengthStyle{
    width: 260px;
  }
  .lengthStyle1{
    width: 150px;
  }
}
</style>
