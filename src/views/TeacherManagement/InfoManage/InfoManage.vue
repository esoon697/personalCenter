<template>
  <TMContentBox>
    <span slot="content-title">试卷建设</span>
    <div slot="main-content" class="view-outer">
      <div class="btns-group">
        <div class="left">
          <button class="btn-item add-btn" @click.prevent="addInfo"><span class="el-icon-plus"></span> 新增信息</button>
          <button class="btn-item search-btn" @click.prevent="select">查询</button>
          <button class="btn-item reset-btn" @click.prevent="reset">重置</button>
        </div>
        <button class="search-btn"><span class="el-icon-search"></span></button>
      </div>
      <div class="search-group">
        <div class="search-item">
          <label for="item1">信息名称：</label>
          <el-input class="input-style" id="item1" v-model="infoName" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <label for="item2">关键字：</label>
          <el-input class="input-style" id="item2" v-model="keyword" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <label for="item3">父级信息：</label>
          <el-select class="select-style" id="item3" v-model="parentInfo" size="mini" placeholder="请选择">
            <el-option
              v-for="item in parentInfoOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="search-item">
          <label for="item4">信息类别：</label>
          <el-select class="select-style" id="item3" v-model="infoType" size="mini" placeholder="请选择">
            <el-option
              v-for="item in infoTypeOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="search-item">
          <label for="item5">状态：</label>
          <el-select class="select-style" id="item3" v-model="state" size="mini" placeholder="请选择">
            <el-option
              v-for="item in stateOpts"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
            </el-select>
        </div>
      </div>
      <div class="view-inner">
        <el-table
          :data="tableData"
          border
          header-cell-style="background: #F2F2F2"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="infoName"
            label="信息名称"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="imgUrl"
            label="信息图片地址"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="targetUrl"
            label="信息跳转地址"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="keywords"
            label="关键字"
            align="center">
          </el-table-column>
          <el-table-column
            prop="parentinfo"
            label="父级信息"
            align="center">
          </el-table-column>
          <el-table-column
            prop="infoType"
            label="信息类别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            align="center">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="creatTime"
            label="创建时间"
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            prop="updatar"
            label="更新人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="updataTime"
            label="更新时间"
            align="center"
            width="160">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button @click="editClick(scope)" type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">显示</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="view-footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
    <myDialog
      slot="dialog"
      :title="'新增信息'"
      :aside="true"
      @close="addClose"
      @confirm="addConfirm('addForm')"
      v-if="isShowAdd">
        <div class="add-box" slot="dialog-content">
          <el-form :model="addForm" :rules="rules" ref="addForm" label-position="right" label-width="130px" class="demo-addForm">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="信息名称：" prop="infoName">
                  <el-input size="small" v-model="addForm.infoName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="信息图片地址：" prop="imgUrl">
                  <el-input size="small" v-model="addForm.imgUrl" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="关键字：" prop="keywords">
                  <el-input size="small" v-model="addForm.keywords" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="信息跳转地址：" prop="targetUrl">
                  <el-input size="small" v-model="addForm.targetUrl" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="父级信息：" prop="parentinfo">
                  <el-select style="width: 100%" size="small" v-model="addForm.parentinfo" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="信息类别：" prop="infoType">
                  <el-select style="width: 100%" size="small" v-model="addForm.infoType" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="状态：" prop="state">
                  <el-select style="width: 100%" size="small" v-model="addForm.state" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="开课说明" prop="desc">
                  <el-input type="textarea" :rows="9" v-model="addForm.desc" maxlength="200" :show-word-limit="true" placeholder="请输入小于200的字符"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </myDialog>
    <myDialog
      slot="dialog"
      :title="'编辑信息'"
      :aside="true"
      @close="editClose"
      @confirm="editConfirm('editForm')"
      v-if="isShowEdit">
        <div class="add-box" slot="dialog-content">
          <el-form :model="editForm" :rules="rules" ref="editForm" label-position="right" label-width="130px" class="demo-addForm">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="信息名称：" prop="infoName">
                  <el-input size="small" v-model="editForm.infoName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="信息图片地址：" prop="imgUrl">
                  <el-input size="small" v-model="editForm.imgUrl" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="关键字：" prop="keywords">
                  <el-input size="small" v-model="editForm.keywords" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="信息跳转地址：" prop="targetUrl">
                  <el-input size="small" v-model="editForm.targetUrl" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="父级信息：" prop="parentinfo">
                  <el-select style="width: 100%" size="small" v-model="editForm.parentinfo" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="信息类别：" prop="infoType">
                  <el-select style="width: 100%" size="small" v-model="editForm.infoType" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="状态：" prop="state">
                  <el-select style="width: 100%" size="small" v-model="editForm.state" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="开课说明" prop="desc">
                  <el-input type="textarea" :rows="9" v-model="editForm.desc" maxlength="200" :show-word-limit="true" placeholder="请输入小于200的字符"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </myDialog>
  </TMContentBox>
</template>

<script>
import myDialog from '@/components/myDialog/myDialog'
import TMContentBox from '@/components/TMContentBox/TMContentBox'
export default {
  components: {myDialog, TMContentBox},
  props: [],
  data () {
    return {
      infoName: null,
      keyword: null,
      parentInfo: null,
      infoType: null,
      state: null,
      parentInfoOpts: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶',
          disabled: true
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
      infoTypeOpts: null,
      stateOpts: null,
      tableData: [
        {
          id: 1,
          infoName: '名称1',
          imgUrl: 'www.xxx.com',
          targetUrl: 'www.xxx.com',
          keywords: 'keyword',
          parentinfo: '父级信息',
          infoType: '类别1',
          state: '可用',
          creator: 'admin',
          creatTime: '2020-5-26 10:20',
          updatar: '张三',
          updataTime: '2020-5-26 10:20'
        },
        {
          id: 1,
          infoName: '名称1',
          imgUrl: 'www.xxx.com',
          targetUrl: 'www.xxx.com',
          keywords: 'keyword',
          parentinfo: '父级信息',
          infoType: '类别1',
          state: '可用',
          creator: 'admin',
          creatTime: '2020-5-26 10:20',
          updatar: '张三',
          updataTime: '2020-5-26 10:20'
        },
        {
          id: 1,
          infoName: '名称1',
          imgUrl: 'www.xxx.com',
          targetUrl: 'www.xxx.com',
          keywords: 'keyword',
          parentinfo: '父级信息',
          infoType: '类别1',
          state: '可用',
          creator: 'admin',
          creatTime: '2020-5-26 10:20',
          updatar: '张三',
          updataTime: '2020-5-26 10:20'
        },
        {
          id: 1,
          infoName: '名称1',
          imgUrl: 'www.xxx.com',
          targetUrl: 'www.xxx.com',
          keywords: 'keyword',
          parentinfo: '父级信息',
          infoType: '类别1',
          state: '可用',
          creator: 'admin',
          creatTime: '2020-5-26 10:20',
          updatar: '张三',
          updataTime: '2020-5-26 10:20'
        },
        {
          id: 1,
          infoName: '名称1',
          imgUrl: 'www.xxx.com',
          targetUrl: 'www.xxx.com',
          keywords: 'keyword',
          parentinfo: '父级信息',
          infoType: '类别1',
          state: '可用',
          creator: 'admin',
          creatTime: '2020-5-26 10:20',
          updatar: '张三',
          updataTime: '2020-5-26 10:20'
        },
        {
          id: 1,
          infoName: '名称1',
          imgUrl: 'www.xxx.com',
          targetUrl: 'www.xxx.com',
          keywords: 'keyword',
          parentinfo: '父级信息',
          infoType: '类别1',
          state: '可用',
          creator: 'admin',
          creatTime: '2020-5-26 10:20',
          updatar: '张三',
          updataTime: '2020-5-26 10:20'
        },
        {
          id: 1,
          infoName: '名称1',
          imgUrl: 'www.xxx.com',
          targetUrl: 'www.xxx.com',
          keywords: 'keyword',
          parentinfo: '父级信息',
          infoType: '类别1',
          state: '可用',
          creator: 'admin',
          creatTime: '2020-5-26 10:20',
          updatar: '张三',
          updataTime: '2020-5-26 10:20'
        }
      ],
      isShowAdd: false,
      isShowEdit: false,
      addForm: {
        infoName: '',
        imgUrl: '',
        targetUrl: '',
        keywords: '',
        parentinfo: '',
        infoType: '',
        state: '',
        desc: ''
      },
      rules: {
        infoName: [
          { required: true, message: '请输入信息名称', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请输入信息图片地址', trigger: 'blur' }
        ],
        targetUrl: [
          { required: true, message: '请输入信息目标地址', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入关键字', trigger: 'blur' }
        ],
        parentinfo: [
          { required: true, message: '请输入父级信息', trigger: 'blur' }
        ],
        infoType: [
          { required: true, message: '请输入信息类别', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请输入状态', trigger: 'blur' }
        ]
      },
      editForm: null,
      currentPage: 1
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    addInfo () {
      this.isShowAdd = true
    },
    search () {},
    reset () {
      this.infoName = null
      this.keyword = null
      this.parentInfo = null
      this.infoType = null
      this.state = null
      console.log('1')
    },
    addClose () {
      this.isShowAdd = false
    },
    addConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            showClose: false
          }).then(() => {
            console.log('over')
            this.isShowAdd = false
          }).catch((e) => {
            console.log(e)
            this.checkedTest = null
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editClick (scope) {
      this.isShowEdit = true
      this.editForm = this.tableData[scope.$index]
      console.log(scope)
    },
    editClose () {
      this.isShowEdit = false
    },
    editConfirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            showClose: false
          }).then(() => {
            console.log('over')
            this.isShowEdit = false
          }).catch((e) => {
            console.log(e)
            this.checkedTest = null
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
@theme: #007AB7;
.view-outer{
  padding: 20px;
  max-width: 1200px;
  // width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  .btns-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      .btn-item{
        width:80px;
        height:28px;
        border-radius:4px;
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        box-sizing: border-box;
        overflow: hidden;
        margin-right: 20px;
      }
      .add-btn{
        background-color: @theme;
        border: 1px solid @theme;
        color: #fff;
        &:hover{
          opacity: .8;
        }
        &:active{
          opacity: .6;
        }
      }
      .search-btn{
        background-color: #fff;
        border: 1px solid @theme;
        color: @theme;
        &:hover{
          background-color: @theme;
          border: 1px solid @theme;
          color: #fff;
        }
        &:active{
          opacity: .6;
        }
      }
      .reset-btn{
        background-color: #fff;
        border: 1px solid #CA3842;
        color: #CA3842;
        &:hover{
          background-color: #CA3842;
          border: 1px solid #CA3842;
          color: #fff;
        }
        &:active{
          opacity: .6;
        }
      }
    }
    .search-btn{
      background-color: rgba(0, 0, 0, 0);
      span{
        font-size: 24px;
        color: #aaa;
      }
      &:active{
        opacity: .6;
      }
    }
  }
  .search-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 12px;
    margin: 20px 0;
    .search-item{
      display: flex;
      align-items: center;
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      .input-style{
        width: 140px;
        height: 28px;
      }
      .select-style{
        width: 100px;
        height: 28px;
      }
    }
  }
  .view-footer{
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
}
.add-box{
  width: 800px;
}
// .lengthStyle{
//   // width: 280px;
// }
</style>
