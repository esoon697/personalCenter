<template>
  <div class="basicInfo-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程类别：" prop="courseType">
        <el-select v-model="ruleForm.courseType" placeholder="请选择类别">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程名称：" prop="courseName">
        <el-input v-model="ruleForm.courseName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="学 时 数：" prop="courseTime">
        <el-input v-model="ruleForm.courseTime" placeholder="请输学时数"></el-input>
      </el-form-item>
      <el-form-item label="封 面 图：" prop="fileList">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          ref="upload"
          list-type="picture-card"
          :limit=3
          :file-list="ruleForm.fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-exceed="handleExceed">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <div class="tips-box">
          <span>注：</span>
          <span>1、图片不小不超过1M;</span>
          <span>2、图片像素大小。</span>
        </div>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data () {
    var checkFileList = (rule, value, callback) => {
      if (!this.hasFile) {
        return callback(new Error('请至少选择一张封面'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        courseName: '',
        courseType: '',
        courseTime: '',
        fileList: []
      },
      hasFile: false,
      rules: {
        courseType: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        courseName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在 2 到 9 个字符', trigger: 'blur' }
        ],
        courseTime: [
          { required: true, message: '请输入学时数', trigger: 'blur' }
        ],
        fileList: [
          { required: true, validator: checkFileList, trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    fileList () {
      return this.ruleForm.fileList
    }
  },
  created () {},
  mounted () {},
  methods: {
    submitForm (formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          // this.clearFiles()
        } else {
          console.log('error submit!!')
          this.$message.error('必填项不能为空')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.ruleForm.fileList = fileList
    },
    handlePictureCardPreview (file) {
      console.log(file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleChange (file, fileList) {
    },
    handleSuccess (response, file, fileList) {
      console.log('fileList', fileList)
      this.ruleForm.fileList = fileList
    },
    handleExceed () {
      this.$message.warning('最多能够上传三张封面图')
    },
    clearFiles () {
      this.$refs.upload.clearFiles()
    }
  },
  watch: {
    'ruleForm.fileList': {
      handler: function () {
        if (this.ruleForm.fileList.length) {
          console.log('this.ruleForm.fileList', this.ruleForm.fileList)
          this.hasFile = true
        } else {
          console.log('this.ruleForm.fileList', this.ruleForm.fileList)
          this.hasFile = false
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.basicInfo-box{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  box-sizing: border-box;
  form{
    width: 415px
  }
  .el-select{
    width: 100%;
  }
  .el-button--primary{
    width: 100%;
    background-color: #007AB7;
    border-color: #007AB7;
  }
  .tips-box{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    span{
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      &:first-child{
        font-size: 18px;
        line-height: 1;
      }
    }
  }
}
</style>
