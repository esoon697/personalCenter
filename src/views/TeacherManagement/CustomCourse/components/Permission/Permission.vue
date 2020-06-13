<template>
  <div class="permission-box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="课程共享：" prop="isPublic">
        <!-- <el-select v-model="ruleForm.isPublic" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select> -->
        <el-radio-group v-model="ruleForm.isPublic">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
        <!-- <el-switch v-model="ruleForm.isPublic"></el-switch> -->
      </el-form-item>
      <el-form-item label="共享范围：" prop="shareType" v-if="ruleForm.isPublic">
        <el-select v-model="ruleForm.shareType" placeholder="请选择">
          <el-option label="全校" :value="1"></el-option>
          <el-option label="全网" :value="2"></el-option>
          <el-option label="选择特定人员" :value="3" @click.native="choosePerson"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="特定人员：" prop="shared" v-if="ruleForm.shared.length">
          <el-select class="lengthStyle" v-model="checkedPersonName" multiple collapse-tags disabled placeholder="请选择特定人员">
            <el-option
              v-for="item in ruleForm.shared"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="是否上传素材资源：" prop="shareResource">
        <el-radio-group v-model="ruleForm.shareResource">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
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
    <myDialog
    slot="dialog"
    :title="'选择特定人员'"
    :aside="true"
    node-key="id"
    @close="choosePersonClose"
    @confirm="choosePersonConfirm"
    v-show="isShowChoosePerson">
      <div class="choosePerson-btns" slot="dialog-btns">
        <div>
          <label for="per-input1">所属学校：</label>
          <input type="text" name="" id="per-input1">
          <label for="per-input2">人员名称：</label>
          <input type="text" name="" id="per-input2">
        </div>
        <button class="search-btn">查询</button>
      </div>
      <div class="choosePerson-box" slot="dialog-content">
        <el-tree
        ref="personTree"
        slot="dialog-content"
        :data="personData"
        :props="defaultProps"
        @node-click="personNodeClick"
        @check-change="personCheckChange"
        show-checkbox></el-tree>
      </div>
    </myDialog>
  </div>
</template>

<script>
import myDialog from '@/components/myDialog/myDialog'
export default {
  components: {myDialog},
  props: [],
  data () {
    var checkedvalidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请仔细阅读并同意协议'))
      } else {
        callback()
      }
    }
    return {
      isShowChoosePerson: false,
      ruleForm: {
        isPublic: '',
        shareType: '',
        shareResource: '',
        shared: [],
        checked: ''
      },
      rules: {
        isPublic: [
          { required: true, message: '请选择课程共享', trigger: 'change' }
        ],
        shareType: [
          { required: true, message: '请选择名称共享范围', trigger: 'change' }
        ],
        shareResource: [
          { required: true, message: '请选择是否共享素材资源', trigger: 'change' }
        ],
        shared: [
          { required: true, message: '请选择特定人员', trigger: 'change' }
        ],
        checked: [
          { required: true, validator: checkedvalidate, trigger: 'change' }
        ]
      },
      personData: [
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
        label: 'teacherName'
      },
      shared: []
    }
  },
  computed: {
    checkedPersonName () {
      return this.ruleForm.shared.map(e => e.teacherName)
    }
  },
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getTeacher()
    },
    getTeacher () {
      this.$api.getTeacher().then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.personData = res.data
        }
      })
    },
    choosePerson () {
      this.isShowChoosePerson = true
    },
    personNodeClick (data) {
      console.log(data)
      this.testPaper = data
    },
    personCheckChange () {},
    getCheckedPerson (refName) {
      console.log(this.$refs[refName].getCheckedNodes())
      let checkedNodes = this.$refs[refName].getCheckedNodes()
      this.shared = checkedNodes.filter(e => {
        return !e.children
      })
    },
    choosePersonConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.getCheckedPerson('personTree')
        console.log('this.shared', this.shared)
        this.ruleForm.shared = this.shared
        this.isShowChoosePerson = false
      }).catch((e) => {
        console.log(e)
        this.shared = null
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    choosePersonClose () {
      this.isShowChoosePerson = false
    },
    // 自主建课-第三步-设置课程权限
    setCourPermission () {
      this.ruleForm.courseId = 112
      this.$api.setCourPermission(this.ruleForm).then(res => {
        if (res.code === 200) {
          console.log('setCourPermission', res.data)
          this.$message({
            type: 'success',
            message: '恭喜您，创建成功！'
          })
          this.resetForm('ruleForm')
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
          alert('submit!')
          // this.clearFiles()
          this.setCourPermission()
        } else {
          console.log('error submit!!')
          this.$message.error('必填项不能为空')
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
  .choosePerson-btns{
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
  .choosePerson-box{
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
}
</style>
