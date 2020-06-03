<template>
  <TMContentBox>
    <span slot="content-title">试卷建设</span>
    <el-form slot="main-content" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="试卷名称：" placeholder="请输入试卷名称" prop="testPaperName">
        <el-input v-model="ruleForm.testPaperName"></el-input>
      </el-form-item>
      <el-form-item label="是否新增标签：" prop="isAllowAdd">
        <el-radio-group v-model="ruleForm.isAllowAdd">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="ruleForm.isAllowAdd === 1" label="新增标签：" placeholder="请输入新增标签" prop="addLabel">
        <el-input v-model="ruleForm.addLabel"></el-input>
      </el-form-item>
      <el-form-item v-show="ruleForm.isAllowAdd === 0" label="所属标签：" placeholder="请选择所属标签" prop="belongLabel">
        <el-select v-model="ruleForm.belongLabel" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="随机生成试卷：" prop="isRandom">
        <el-radio-group v-model="ruleForm.isRandom">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="0px" v-for="(testObj, index) in ruleForm.testObjs" :key="index" required>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item label="题目类型：" prop="testType">
              <el-select v-model="testObj.testType" placeholder="请选择题型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="85px" label="题目数量：" prop="testCount">
              <el-input v-model="testObj.testCount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label-width="70px" label="总分数：" prop="grossScore">
              <el-input v-model="testObj.grossScore"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label-width="85px" label="选择题目：" prop="tests">
              <div v-if="!testObj.tests.length" class="uncheck-btn">选择</div>
              <div v-else class="checked-btn">已选</div>
            </el-form-item>
          </el-col>
          <el-col label-width="0px" :span="3">
            <button class="add-btn" v-if="ruleForm.testObjs.length === index+1" @click.prevent="addTestType">增添题型</button>
            <button class="add-btn" v-else @click.prevent="delTestType(testObj.id)">删除题型</button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <div class="btn-group">
          <button class="create-btn" @click.prevent="submitForm('ruleForm')">提交</button>
          <button class="reset-btn" @click.prevent="resetForm('ruleForm')">重置</button>
        </div>
      </el-form-item>
    </el-form>
  </TMContentBox>
</template>

<script>
import myDialog from '@/components/myDialog/myDialog'
import TMContentBox from '@/components/TMContentBox/TMContentBox'
let id = 1
export default {
  components: {myDialog, TMContentBox},
  props: [],
  data () {
    return {
      ruleForm: {
        testPaperName: '',
        belongCourse: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        testObjs: [
          {
            id: 1,
            testType: '',
            testCount: '',
            grossScore: '',
            tests: []
          }
        ]
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
      },
      testTypeCount: 1
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    addTestType () {
      id++
      this.ruleForm.testObjs.push({id: id, testType: '', testCount: id, grossScore: '', tests: []})
    },
    delTestType (id) {
      let index = this.ruleForm.testObjs.findIndex(e => e.id === id)
      this.ruleForm.testObjs.splice(index, 1)
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
<style lang="less" scoped>
@theme: #007AB7;
.el-form{
  // width: 60%;
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
    width: 100%;
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
  .uncheck-btn{
    width: 20px;
    padding: 5px 10px;
    background:rgba(202,56,66,1);
    border-radius:4px;
  }
  .checked-btn{}
}
</style>
