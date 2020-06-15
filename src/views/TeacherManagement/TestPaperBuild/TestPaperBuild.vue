<template>
  <TMContentBox>
    <span slot="content-title">试卷建设</span>
    <el-form slot="main-content" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
      <el-form-item label="试卷名称：" prop="testPaperName">
        <el-input class="lengthStyle" v-model="ruleForm.testPaperName" placeholder="请输入试卷名称"></el-input>
      </el-form-item>
      <el-form-item label="是否新增标签：" prop="isAllowAdd">
        <el-radio-group v-model="ruleForm.isAllowAdd">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="ruleForm.isAllowAdd" label="新增标签：" placeholder="请输入新增标签" prop="addLabel">
        <el-input class="lengthStyle" v-model="ruleForm.addLabel" placeholder="请输入新增标签"></el-input>
      </el-form-item>
      <el-form-item v-else label="所属标签：" prop="belongLabel">
        <el-select class="lengthStyle" v-model="ruleForm.belongLabel" placeholder="请选择所属标签">
          <el-option v-for="(labelOpt, index) in labelOpts" :key="index" :label="labelOpt.name" :value="labelOpt.tag_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="随机生成试卷：" prop="isRandom">
        <el-radio-group v-model="ruleForm.isRandom">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="0px" v-for="(testObj, index) in ruleForm.testObjs" :key="index" required>
        <!-- <el-row :gutter="20"> -->
          <el-col :sm="10" :lg="7">
            <el-form-item label="题目类型：" :prop="'testObjs.'+index+'.type'" :rules="[{required: true, message: '请选择题目类型', trigger: 'change'}]">
              <el-select v-model="testObj.type" placeholder="请选择题型">
                <el-option v-for="(paperTypeOpt, index) in paperTypeOpts" :key="index" :label="paperTypeOpt.name" :value="paperTypeOpt.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="7" :lg="5">
            <el-form-item label="题目数量：" :prop="'testObjs.'+index+'.num'" :rules="[{required: true, message: '请选择题目数量', trigger: 'blur'}]">
              <el-input v-model.number="testObj.num" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="7" :lg="5">
            <el-form-item label="总分数：" :prop="'testObjs.'+index+'.score'" :rules="[{required: true, message: '请选择总分数', trigger: 'blur'}]">
              <el-input v-model.number="testObj.score" oninput = "value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="8" :lg="4">
            <el-form-item v-if="!ruleForm.isRandom" label="选择题目：" :prop="'testObjs.'+index+'.questionlist'" :rules="[{ type: 'array', required: true, message: '请选择总分数', trigger: 'change'}]">
              <button v-if="!testObj.questionlist.length" class="uncheck-btn" @click.prevent="chooseTest(index)">选择</button>
              <button v-else class="checked-btn" @click.prevent="chooseTest(index)">已选{{testObj.questionlist.length}}</button>
            </el-form-item>
          </el-col>
          <el-col :sm="16" :lg="3">
            <el-form-item>
              <button class="add-btn" v-if="ruleForm.testObjs.length === index+1" @click.prevent="addTestType">增添题型</button>
              <button class="del-btn" v-else @click.prevent="delTestType(testObj.id)">删除题型</button>
            </el-form-item>
          </el-col>
        <!-- </el-row> -->
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
  :title="'题目选择'"
  :aside="true"
  @close="chooseTestClose"
  @confirm="chooseTestConfirm"
  v-show="isShowChooseTest">
    <div class="chooseTest-btns" slot="dialog-btns">
      <div>
        <label for="input1">资源类别：</label>
        <input type="text" name="" id="input1">
        <label for="input2">资源名称：</label>
        <input type="text" name="" id="input2">
      </div>
      <button class="search-btn">查询</button>
    </div>
    <div class="chooseTest-box" slot="dialog-content">
        <el-tree
        ref="stuTree"
        slot="dialog-content"
        :data="testData"
        :props="defaultProps"
        node-key="id"
        @node-click="testNodeClick"
        @check-change="testCheckChange"
        show-checkbox>
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => showDetails(data)"
                v-show="!(data.children&&data.children.length)">
                查看
              </el-button>
            </span>
          </span>
        </el-tree>
    </div>
  </myDialog>
  <myDialog
  slot="dialog"
  v-if="isShowtestDetails"
  :title="testContent.title"
  :aside="true"
  @close="testDetailsClose"
  @confirm="testDetailsConfirm">
    <div slot="dialog-content">
      <p class="testOption" v-for="(testOption, index) in testContent.choose" :key="index">{{index+1}}、{{testOption}}</p>
    </div>
  </myDialog>
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
      isShowChooseTest: false,
      isShowtestDetails: false,
      ruleForm: {
        testPaperName: '',
        isAllowAdd: true,
        addLabel: '',
        belongLabel: '',
        isRandom: true,
        testObjs: [
          {
            type: '',
            num: '',
            score: '',
            questionlist: []
          }
        ]
      },
      rules: {
        testPaperName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        isAllowAdd: [
          { required: true, message: '请选择是否新增标签：', trigger: 'change' }
        ],
        addLabel: [
          { required: true, message: '请输入标签', trigger: 'blur' }
        ],
        belongLabel: [
          { required: true, message: '请选择所属标签', trigger: 'change' }
        ],
        isRandom: [
          { required: true, message: '请选择是否随机生成试卷：', trigger: 'change' }
        ]
      },
      testData: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  id: 11,
                  label: '三级 1-1-1',
                  content: ['A.选项一', 'B.选项二', 'C.选项三']
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
        label: 'title'
      },
      testTypeCount: 1,
      checkedTest: null,
      currentIndex: null,
      testContent: null,
      labelOpts: [],
      paperTypeOpts: []
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getInitPaperInfo()
    },
    getInitPaperInfo () {
      this.$api.getInitPaperInfo().then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.labelOpts = res.data.marklist
          this.paperTypeOpts = res.data.typelist
        }
      })
    },
    getaAtivelist () {
      this.$api.getaAtivelist({
        type: this.ruleForm.testObjs[this.currentIndex].type
      }).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          this.testData = res.data
        }
      })
    },
    creatPaper () {
      console.log('creatPaper', this.ruleForm)
      let tagName = this.ruleForm.isAllowAdd ? this.ruleForm.addLabel : this.ruleForm.belongLabel
      this.$api.creatPaper({
        paperName: this.ruleForm.testPaperName,
        isAdd: this.ruleForm.isAllowAdd,
        tagName: tagName,
        flag: this.ruleForm.isRandom,
        rowProList: this.ruleForm.testObjs
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '试卷已创建成功！'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    addTestType () {
      id++
      this.ruleForm.testObjs.push({id: id, type: '', num: '', score: '', questionlist: []})
    },
    delTestType (id) {
      let index = this.ruleForm.testObjs.findIndex(e => e.id === id)
      this.ruleForm.testObjs.splice(index, 1)
    },
    chooseTest (index) {
      this.$refs.stuTree.setCheckedKeys([])
      this.isShowChooseTest = true
      this.currentIndex = index
      this.getaAtivelist()
    },
    testNodeClick () {},
    testCheckChange () {},
    getCheckedTest () {
      console.log(this.$refs.stuTree.getCheckedNodes())
      this.checkedTest = this.$refs.stuTree.getCheckedNodes()
      // this.checkedTest = checkedNodes.filter(e => {
      //   return !e.children
      // }).map(e => {
      //   return {
      //     value: e.$treeNodeId,
      //     label: e.label
      //   }
      // })
      console.log(this.checkedTest)
    },
    chooseTestClose () {
      this.isShowChooseTest = false
      // let keys = this.$refs.stuTree.getCheckedKeys()
      // console.log('keys', keys)
    },
    chooseTestConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.getCheckedTest()
        this.ruleForm.testObjs[this.currentIndex].questionlist = this.checkedTest
        this.isShowChooseTest = false
      }).catch((e) => {
        console.log(e)
        this.checkedTest = null
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    showDetails (data) {
      console.log(data)
      this.testContent = data
      // this.isShowChooseTest = false
      this.isShowtestDetails = true
      this.isShowChooseTest = false
    },
    testDetailsClose () {
      this.isShowChooseTest = true
      this.isShowtestDetails = false
    },
    testDetailsConfirm () {
      this.isShowChooseTest = true
      this.isShowtestDetails = false
    },
    submitForm (formName) {
      console.log('submitForm', this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.creatPaper()
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.testObjs = [{id: 1, type: '', num: '', score: '', questionlist: []}]
      id = 1
    }
  },
  watch: {
    isAllowAdd (val) {
      console.log('isAllowAdd', val)
    }
  }
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
  .uncheck-btn, .checked-btn, .add-btn, .del-btn{
    min-width: 60px;
    // height: 35px;
    padding: 0 10px;
    text-align: center;
    line-height: 35px;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .uncheck-btn{
    background: @theme;
  }
  .checked-btn{
    background: #42ca38;
  }
  .add-btn{
    margin-left: 10px;
    background:rgba(202,56,66,1);
    color:rgba(255,255,255,1);
  }
  .del-btn{
    margin-left: 10px;
    background: #fff;
    color: #aaa;
    border: 1px solid #eee;
    box-sizing: border-box;
  }
}
.chooseTest-btns{
  font-size:16px;
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
    font-size:16px;
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
.chooseTest-box{
  width: 750px;
  height: 470px;
  border: 1px solid #DFDFE0;
  box-sizing: border-box;
  overflow: auto;
  .el-tree-node__label{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
  }
}
.testOption{
    font-size:16px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height: 2;
}
</style>
