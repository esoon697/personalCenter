<template>
  <div class="openCourse-box">
    <div class="openCourse-inner">
      <div class="title">开设建课</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" label-position="right">
        <el-form-item label="选择课程：" prop="name">
          <div class="wrapper">
            <el-input class="lengthStyle" v-model="ruleForm.name" disabled></el-input>
            <button class="choose-btn">选择</button>
          </div>
        </el-form-item>
        <el-form-item label="课程名称：" prop="name">
          <el-input  class="lengthStyle" v-model="ruleForm.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="授课教师：" prop="name">
          <div class="wrapper">
            <el-input  class="lengthStyle" v-model="ruleForm.name" placeholder="请输入课程名称" disabled></el-input>
            <button class="choose-btn">选择</button>
          </div>
        </el-form-item>
        <el-form-item label="课程时间：" prop="name" disabled>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开课时间"
            end-placeholder="结课时间"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="学生可选：" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选课人数：" prop="name">
          <el-input class="lengthStyle" v-model="ruleForm.name" placeholder="请输入选课人数"></el-input>
        </el-form-item>
        <el-form-item label="选课时间：" prop="name">
          <div class="wrapper">
            <el-time-picker
              v-model="ruleForm.timeValue1"
              :picker-options="{
                selectableRange: '18:30:00 - 20:30:00'
              }"
              placeholder="开始时间">
            </el-time-picker>
            <el-time-picker
              arrow-control
              v-model="ruleForm.timeValue2"
              :picker-options="{
                selectableRange: '18:30:00 - 20:30:00'
              }"
              placeholder="结束时间">
            </el-time-picker>
          </div>
        </el-form-item>
        <el-form-item label="开课说明：" prop="desc">
          <el-input type="textarea" :rows="9" v-model="ruleForm.desc" maxlength="200" :show-word-limit="true"></el-input>
        </el-form-item>
        <el-form-item label="通过分数：" prop="name">
          <el-input class="lengthStyle" v-model="ruleForm.name" placeholder="请输入通过分数"></el-input>
        </el-form-item>
        <el-form-item label="视频观看比：" prop="name">
          <div class="wrapper">
            <el-input class="lengthStyle" v-model="ruleForm.name" placeholder=""></el-input>%
            <span class="annotation">（参加考试前，需要完成视频观看百分比）</span>
          </div>
        </el-form-item>
        <el-form-item label="视频考核比例：" prop="name">
          <div class="wrapper">
            <el-input class="lengthStyle" v-model="ruleForm.name" placeholder=""></el-input>%
          </div>
        </el-form-item>
        <el-form-item label="作业考核比例：" prop="name">
          <div class="wrapper">
            <el-input class="lengthStyle" v-model="ruleForm.name" placeholder=""></el-input>%
          </div>
        </el-form-item>
        <el-form-item label="考试考核比例：" prop="name">
          <div class="wrapper">
            <el-input class="lengthStyle" v-model="ruleForm.name" placeholder=""></el-input>%
          </div>
        </el-form-item>
        <el-form-item label="讨论考核比例：" prop="name">
          <div class="wrapper">
            <el-input class="lengthStyle" v-model="ruleForm.name" placeholder=""></el-input>%
          </div>
        </el-form-item>
        <el-form-item label="发布讨论次数：" prop="name">
          <el-input class="lengthStyle" v-model="ruleForm.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btn-group">
            <button class="create-btn" @click="submitForm('ruleForm')">创建</button>
            <button class="reset-btn" @click="resetForm('ruleForm')">重置</button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <myDialog v-show="false"></myDialog>
  </div>
</template>

<script>
import myDialog from '@/components/myDialog/myDialog'
export default {
  components: {myDialog},
  props: [],
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        timeValue1: new Date(2016, 9, 10, 18, 40),
        timeValue2: new Date(2016, 9, 10, 18, 40)
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
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
    }
  },
  watch: {}
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
}
</style>
