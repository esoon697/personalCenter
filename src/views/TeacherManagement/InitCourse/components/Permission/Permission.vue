<template>
  <div class="permission-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="课程共享：" prop="courseShare">
        <el-select v-model="ruleForm.courseShare" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="共享范围：" prop="shareScope">
        <el-select v-model="ruleForm.shareScope" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否共享素材资源：" prop="isShareResource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="是"></el-radio>
          <el-radio label="否"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="checked">
        <div class="protocol-box">
          <el-checkbox v-model="ruleForm.checked"></el-checkbox>
          <span>我已阅读并同意</span>
          <a href="javascript:;">《分享素材资源协议》</a>
        </div>
      </el-form-item>
      <el-form-item>
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
    return {
      ruleForm: {
        courseShare: '',
        shareScope: '',
        isShareResource: '',
        checked: ''
      },
      rules: {
        courseShare: [
          { required: true, message: '请选择课程共享', trigger: 'change' }
        ],
        shareScope: [
          { required: true, message: '请选择名称共享范围', trigger: 'change' }
        ],
        isShareResource: [
          { required: true, message: '请选择是否共享素材资源', trigger: 'change' }
        ],
        checked: [
          { required: true, message: '请仔细阅读并同意协议', trigger: 'change' }
        ]
      }
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
.permission-box{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  box-sizing: border-box;
  form{
    width: 500px;
    .protocol-box{
        // font-size:18px;
        // font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
      span{
        margin-left: 10px;
      }
      a{
        text-decoration:none;
        line-height:45px;
        color: #007AB7;
        &:active{
          color: #e66;
        }
      }
    }
  }
  .el-select{
    width: 100%;
  }
  .el-button--primary{
    width: 100%;
    background-color: #007AB7;
    border-color: #007AB7;
  }
}
</style>
