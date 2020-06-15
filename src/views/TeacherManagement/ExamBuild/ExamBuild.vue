<template>
<TMContentBox>
  <span slot="content-title">考试建设</span>
  <el-form slot="main-content" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item class="ExamBuild-form" label="考试名称：" placeholder="请选择考试名称" prop="exmName">
      <el-input class="lengthStyle" v-model="ruleForm.exmName"></el-input>
    </el-form-item>
    <el-form-item label="所属课程：" prop="belongCourse">
      <div class="wrapper">
        <el-input class="lengthStyle" v-model="ruleForm.belongCourse.courTitle" placeholder="请选择所属课程" disabled></el-input>
        <button class="choose-btn" @click.prevent="chooseCourse">选择</button>
      </div>
    </el-form-item>
    <el-form-item label="选择试卷：" prop="testPaper">
      <div class="wrapper">
        <el-input class="lengthStyle" v-model="ruleForm.testPaper.paperName" placeholder="请选择试卷" disabled></el-input>
        <button class="choose-btn" @click.prevent="choosePaper">选择</button>
      </div>
    </el-form-item>
    <el-form-item label="考试时间：" prop="taskTime" required>
      <el-date-picker
        v-model="ruleForm.taskTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder="考试开始时间"
        end-placeholder="考试结束时间">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <div class="btn-group">
        <button class="create-btn" @click.prevent="submitForm('ruleForm')">提交</button>
        <button class="reset-btn" @click.prevent="resetForm('ruleForm')">重置</button>
      </div>
    </el-form-item>
  </el-form>
  <myDialog
  slot="dialog"
  :title="'选择课程'"
  :aside="true"
  @close="chooseCourClose"
  @confirm="chooseCourConfirm"
  v-show="isShowchooseCour">
    <div class="chooseCour-btns" slot="dialog-btns">
      <div>
        <label for="input1">课程类别：</label>
        <input type="text" name="" v-model="courseType" id="input1">
        <label for="input2">课程名称：</label>
        <input type="text" name="" v-model="courseName" id="input2">
      </div>
      <button class="search-btn" @click="getCourseInfo">查询</button>
    </div>
    <div class="chooseCour-box" slot="dialog-content">
      <el-tree
      slot="dialog-content"
      :data="courseData"
      :props="courseProps"
      @node-click="courNodeClick"
      ></el-tree>
    </div>
  </myDialog>
  <myDialog
  slot="dialog"
  :title="'选择试卷'"
  :aside="true"
  @close="choosePaperClose"
  @confirm="choosePaperConfirm"
  v-show="isShowChoosePaper">
    <div class="chooseCour-btns" slot="dialog-btns">
      <div>
        <label for="input3">所属标签：</label>
        <input type="text" name="" v-model="belongLabel" id="input3">
        <label for="input4">试卷名称：</label>
        <input type="text" name="" v-model="paperName" id="input4">
      </div>
      <button class="search-btn" @click="getExamList">查询</button>
    </div>
    <div class="chooseCour-box" slot="dialog-content">
      <el-tree
      slot="dialog-content"
      :data="paperData"
      :props="paperProps"
      @node-click="paperNodeClick"
      ></el-tree>
    </div>
  </myDialog>
</TMContentBox>
</template>

<script>
import myDialog from '@/components/myDialog/myDialog'
import TMContentBox from '@/components/TMContentBox/TMContentBox'
export default {
  components: {TMContentBox, myDialog},
  props: [''],
  data () {
    return {
      ruleForm: {
        exmName: '',
        belongCourse: '',
        testPaper: '',
        taskTime: ''
      },
      rules: {
        exmName: [
          { required: true, message: '请选择考试名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        belongCourse: [
          { required: true, message: '请选择所属课程', trigger: 'change' }
        ],
        testPaper: [
          { required: true, message: '请选择试卷', trigger: 'change' }
        ],
        taskTime: [
          { required: true, message: '请选择考试时间', trigger: 'change' }
        ]
      },
      courseData: [],
      paperData: [],
      courseProps: {
        children: 'children',
        label: 'courTitle'
      },
      paperProps: {
        children: 'children',
        label: 'paperName'
      },
      isShowchooseCour: false,
      isShowChoosePaper: false,
      testPaperOptions: [
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
      taskTime: null,
      belongLabel: null,
      paperName: null,
      courseType: null,
      courseName: null
    }
  },

  computed: {},

  created () {
    this.getCourseInfo()
  },

  mounted () {},

  methods: {
    init () {
      this.getCourseInfo()
    },
    getCourseInfo () {
      this.$api.getCourseInfo({
        courseType: this.courseType,
        courseName: this.courseName
      }).then(res => {
        if (res.code === 200) {
          this.courseData = res.data
        }
      })
    },
    getExamList () {
      this.$api.getExamList({
        belongLabel: this.belongLabel,
        paperName: this.paperName
      }).then(res => {
        if (res.code === 200) {
          console.log('getExamList', res.data)
          this.paperData = res.data
        }
      })
    },
    chooseCourse () {
      this.isShowchooseCour = true
    },
    courNodeClick (data) {
      console.log(data)
      this.belongCourse = data
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
        if (this.belongCourse.children && this.belongCourse.children.length) {
          this.$message.warning('请选择某一节课程')
          return
        }
        this.ruleForm.belongCourse = this.belongCourse
        this.isShowchooseCour = false
      }).catch((e) => {
        this.belongCourse = null
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    choosePaper () {
      this.getExamList()
      this.isShowChoosePaper = true
    },
    paperNodeClick (data) {
      console.log(data)
      this.testPaper = data
    },
    choosePaperClose () {
      this.isShowChoosePaper = false
    },
    choosePaperConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        if (this.testPaper.children && this.testPaper.children.length) {
          this.$message.warning('请选择某一张试卷')
          return
        }
        this.ruleForm.testPaper = this.testPaper
        this.isShowChoosePaper = false
      }).catch((e) => {
        console.log(e)
        this.testPaper = null
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 创建考试接口
    creatExam () {
      const ruleForm = this.ruleForm
      this.$api.creatExam({
        exmName: ruleForm.exmName,
        coursePojo: ruleForm.belongCourse,
        dates: ruleForm.taskTime,
        paperPojo: ruleForm.testPaper
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '创建考试成功！'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.creatExam()
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },

  watch: {}

}

</script>
<style lang='less' scoped>
@theme: #007AB7;
.el-form{
  width: 60%;
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
  .wrapper{
    display: flex;
  }
  .lengthStyle{
    width: 260px;
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
.chooseCour-box{
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
</style>
