<template>
  <div class="basicInfo-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程类别：" prop="courseType">
        <el-select v-model="ruleForm.courseType" placeholder="请选择类别">
          <el-option v-for="(item, index) in courseTypeOpts" :key="index" :label="item.courseTypeName" :value="item.courseTypeId"></el-option>
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
          action="http://api.yazhuokj.com/course/coverInfo/uploadCover"
          :headers="importHeaders"
          ref="upload"
          list-type="picture-card"
          :limit=1
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :on-success="handleSuccess"
          :on-exceed="handleExceed"
          :before-upload="beforeAvatarUpload">
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
let token = localStorage.getItem('token')
export default {
  components: {},
  props: [],
  data () {
    var checkFileList = (rule, value, callback) => {
      if (!this.fileList.length) {
        return callback(new Error('请选择一张封面'))
      } else {
        callback()
      }
    }
    return {
      importHeaders: {Authorization: token},
      ruleForm: {
        courseName: '',
        courseType: '',
        courseTime: '',
        coverId: ''
      },
      hasFile: false,
      fileList: [],
      rules: {
        courseType: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        courseName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        courseTime: [
          { required: true, message: '请输入学时数', trigger: 'blur' }
        ],
        fileList: [
          { required: true, validator: checkFileList, trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      courseTypeOpts: []
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let checkCourType = () => {
        if (!(this.courseTypeOpts && this.courseTypeOpts.length)) {
          this.$confirm('检查到当前没有课程类型，是否新建课程类型?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            showClose: false
          }).then(() => {
            this.$router.push({path: '/teacherManagement/courseTypeManage'})
          }).catch((e) => {
            console.log(e)
            this.belongCourse = null
            this.$message({
              type: 'info',
              message: '已取消'
            })
          })
        }
      }
      this.getAddCourseType(checkCourType)
    },
    // 查询课程分类
    getAddCourseType (fn) {
      this.$api.getAddCourseType().then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.courseTypeOpts = res.data
          fn()
        }
      })
    },
    // 自主建课第一步
    addCourseFirst () {
      this.$api.addCourseFirst({
        courHour: this.courseTime,
        courTitle: this.courseName,
        courTypeId: this.courseType, // o课程分类id
        coverId: this.coverId // 封面id
      }).then(res => {
        if (res.code === 200) {
          console.log('addCourseFirst', res.data)
          this.$store.state.activeName = '2'
          this.$store.state.courseId = res.data.courseId
          this.$message({
            type: 'success',
            message: '提交成功！'
          })
        } else {
          this.$message({
            type: 'warning',
            message: '提交失败，请稍后再试！'
          })
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.addCourseFirst()
          // this.resetForm(formName)
        } else {
          console.log('error submit!!')
          this.$message.error('必填项不能为空')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.clearFiles()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
      this.ruleForm.coverId = ''
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
      let res = fileList[0].response
      if (res.code === 200) {
        this.fileList = fileList
        this.ruleForm.coverId = res.data.coverId
      }
    },
    handleExceed () {
      this.$message.warning('最多能够上传1张封面图')
    },
    beforeAvatarUpload (file) {
      console.log(file.type)
      let allowType = ['image/jpeg', 'image/png']
      console.log(allowType.findIndex(e => e === file.type))
      const isAloow = allowType.findIndex(e => e === file.type) >= 0
      const isLt2M = file.size / 1024 / 1024 < 1

      if (!isAloow) {
        this.$message.error('上传封面图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传封面图片大小不能超过 1MB!')
      }
      return isAloow && isLt2M
    },
    clearFiles () {
      this.$refs.upload.clearFiles()
    }
  },
  watch: {}
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
