<template>
<TMContentBox>
  <span slot="content-title">考试建设</span>
  <el-form slot="main-content" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item class="ExamBuild-form" label="考试名称：" placeholder="请选择考试名称" prop="examName">
      <el-input class="lengthStyle" v-model="ruleForm.examName"></el-input>
    </el-form-item>
    <el-form-item label="所属课程：" prop="belongCourse">
      <div class="wrapper">
        <el-input class="lengthStyle" v-model="ruleForm.belongCourse.label" placeholder="请选择所属课程" disabled></el-input>
        <button class="choose-btn" @click.prevent="chooseCourse">选择</button>
      </div>
    </el-form-item>
    <el-form-item label="选择试卷：" prop="testPaper">
      <div class="wrapper">
        <el-select class="lengthStyle" v-model="ruleForm.testPaper" filterable placeholder="请选择试卷">
          <el-option
            v-for="item in testPaperOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </el-form-item>
    <el-form-item label="考试时间" prop="taskTime" required>
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
        examName: '',
        belongCourse: '',
        testPaper: '',
        taskTime: ''
      },
      rules: {
        examName: [
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
          { type: 'array', required: true, message: '请选择考试时间', trigger: 'change' }
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      isShowchooseCour: false,
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
      taskTime: null
    }
  },

  computed: {},

  created () {},

  mounted () {},

  methods: {
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
        console.log(e)
        this.belongCourse = null
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
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
