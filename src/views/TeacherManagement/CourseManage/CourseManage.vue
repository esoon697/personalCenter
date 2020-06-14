<template>
  <TMContentBox>
    <span slot="content-title">课程管理</span>
    <div slot="main-content" class="view-outer">
      <div class="btns-group">
        <div class="left">
          <button class="btn-item add-btn" @click.prevent="addInfo"><span class="el-icon-plus"></span> 新增课程</button>
          <button class="btn-item search-btn" @click.prevent="getCourManageInfo">查询</button>
          <button class="btn-item reset-btn" @click.prevent="reset">重置</button>
        </div>
        <button class="search-btn" @click="getCourManageInfo"><span class="el-icon-search"></span></button>
      </div>
      <div class="search-group">
        <div class="search-item">
          <label for="item1">课程码：</label>
          <el-input class="input-style" id="item1" v-model="uuId" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <label for="item2">标题：</label>
          <el-input class="input-style" id="item2" v-model="courTitle" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <label for="item3">学时：</label>
          <el-input class="input-style" id="item3" v-model="courHour" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <label for="item4">学分：</label>
          <el-input class="input-style" id="item4" v-model="courScore" size="mini" placeholder="请输入内容"></el-input>
        </div>
        <div class="search-item">
          <label for="item5">课程类别：</label>
          <el-select style="width: 140px" class="select-style" id="item5" v-model="courseTypeId" size="mini" placeholder="请选择">
            <el-option
              v-for="item in courTypeOpts"
              :key="item.courseTypeId"
              :label="item.courseTypeName"
              :value="item.courseTypeId">
              </el-option>
            </el-select>
        </div>
        <div class="search-item">
          <label for="item6">状态：</label>
          <el-select style="width: 140px" class="select-style" id="item6" v-model="status" size="mini" placeholder="请选择">
              <el-option label="可用" value="1"></el-option>
              <el-option label="不可用" value="0"></el-option>
          </el-select>
        </div>
      </div>
      <div class="view-inner">
        <el-table
          :data="tableData"
          border
          :header-cell-style="{background: '#F2F2F2'}"
          style="width: 100%">
          <el-table-column
            prop="sort"
            label="序号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="uuId"
            label="课程码"
            align="center"
            width="120">
          </el-table-column>
          <el-table-column
            prop="courTitle"
            label="标题"
            align="center">
          </el-table-column>
          <el-table-column
            prop="courTypeName"
            label="课程类别"
            align="center">
          </el-table-column>
          <el-table-column
            prop="courHour"
            label="学时"
            align="center">
          </el-table-column>
          <el-table-column
            prop="courScore"
            label="学分"
            align="center">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            :formatter="formatter"
            align="center">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="createTime"
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
            prop="updateTime"
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
              <el-button @click="showAndHide(scope)" type="text" size="small">{{scope.row.status?'隐藏':'显示'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="view-footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <myDialog
      slot="dialog"
      :title="'新增课程'"
      :aside="true"
      @close="addClose"
      @confirm="addConfirm('addForm')"
      v-if="isShowAdd">
        <div class="add-box" slot="dialog-content">
          <el-form :model="addForm" :rules="rules" ref="addForm" label-position="right" label-width="100px" class="demo-addForm">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="课程码：" prop="uuId">
                  <el-input size="small" v-model="addForm.uuId" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="标题：" prop="courTitle">
                  <el-input size="small" v-model="addForm.courTitle" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="课程类别：" prop="courTypeName">
                  <el-select style="width: 100%" size="small" v-model="addForm.courseTypeId" placeholder="请选择">
                    <el-option
                      v-for="item in courTypeOpts"
                      :key="item.courseTypeId"
                      :label="item.courseTypeName"
                      :value="item.courseTypeId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="状态：" prop="status">
                  <el-select style="width: 100%" size="small" v-model="addForm.status" placeholder="请选择">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="学时：" prop="courHour">
                  <el-input size="small" v-model="addForm.courHour" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="学分：" prop="courScore">
                  <el-input size="small" v-model="addForm.courScore" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="开课说明" prop="courContent">
                  <el-input type="textarea" :rows="9" v-model="addForm.courContent" maxlength="200" :show-word-limit="true" placeholder="请输入小于200的字符"></el-input>
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
          <el-form :model="editForm" :rules="rules" ref="editForm" label-position="right" label-width="100px" class="demo-addForm">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="课程码：" prop="uuId">
                  <el-input size="small" v-model="editForm.uuId" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="标题：" prop="courTitle">
                  <el-input size="small" v-model="editForm.courTitle" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="课程类别：" prop="courTypeName">
                  <el-select style="width: 100%" size="small" v-model="editForm.courseTypeId" placeholder="请选择">
                    <el-option
                      v-for="item in courTypeOpts"
                      :key="item.courseTypeId"
                      :label="item.courseTypeName"
                      :value="item.courseTypeId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="状态：" prop="status">
                  <el-select style="width: 100%" size="small" v-model="editForm.status" placeholder="请选择">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="学时：" prop="courHour">
                  <el-input size="small" v-model="editForm.courHour" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="学分：" prop="courScore">
                  <el-input size="small" v-model="editForm.courScore" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="开课说明" prop="courContent">
                  <el-input type="textarea" :rows="9" v-model="editForm.courContent" maxlength="200" :show-word-limit="true" placeholder="请输入小于200的字符"></el-input>
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
      uuId: null,
      courTitle: null,
      courTypeName: null,
      courHour: null,
      courScore: null,
      status: null,
      courseTypeId: null,
      courTypeOpts: [],
      stateOpts: null,
      tableData: [],
      isShowAdd: false,
      isShowEdit: false,
      addForm: {
        uuId: '',
        courTitle: '',
        courTypeName: '',
        courHour: '',
        courScore: '',
        status: '',
        courContent: ''
      },
      rules: {
        uuId: [
          { required: true, message: '请输入课程码', trigger: 'blur' }
        ],
        courTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        courTypeName: [
          { required: true, message: '请选择课程类别', trigger: 'change' }
        ],
        courHour: [
          { required: true, message: '请输入学时', trigger: 'blur' }
        ],
        courScore: [
          { required: true, message: '请输入学分', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      },
      editForm: {},
      currentPage: 1,
      pageSize: 10,
      total: 10
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    formatter (row, column) {
      if (row.status) {
        return '可用'
      } else {
        return '不可用'
      }
    },
    init () {
      this.getCourManageInfo()
      this.getCourseType()
    },
    getCourManageInfo () {
      this.$api.getCourManageInfo({
        pageNum: this.currentPage,
        uuId: this.uuId,
        courTitle: this.courTitle,
        courHour: this.courHour,
        courScore: this.courScore,
        courseTypeId: this.courseTypeId,
        status: this.status
      }).then(res => {
        if (res.code === 200) {
          console.log('getCourManageInfo', res.data)
          this.tableData = res.data.list
        }
      })
    },
    getCourseType () {
      this.$api.getAddCourseType().then(res => {
        if (res.code === 200) {
          console.log('courTypeOpts', res.data)
          this.courTypeOpts = res.data
        }
      })
    },
    uploadCourManageInfo () {
      const editForm = this.editForm
      this.$api.uploadCourManageInfo({
        courId: editForm.courId,
        uuId: editForm.uuId,
        courTitle: editForm.courTitle,
        courHour: editForm.courHour,
        courScore: editForm.courScore,
        courTypeId: editForm.courTypeId,
        status: editForm.status,
        courContent: editForm.courContent
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '更新成功！'
          })
          this.getCourManageInfo()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    addInfo () {
      // this.isShowAdd = true
      this.$router.push({path: '/teacherManagement/customCourse'})
    },
    search () {},
    reset () {
      this.uuId = null
      this.courTitle = null
      this.courseTypeId = null
      this.courHour = null
      this.courScore = null
      this.status = null
      this.getCourManageInfo()
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
      this.editForm = scope.row
      console.log(scope)
    },
    showAndHide (scope) {
      // this.tableData[scope.$index].status = !this.tableData[scope.$index].status
      this.editForm = scope.row
      this.editForm.status = scope.row.status ? '0' : '1'
      this.uploadCourManageInfo()
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
            this.uploadCourManageInfo()
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
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 12px;
    margin: 20px 0 10px;
    .search-item{
      min-width: 220px;
      label{
        width: 80px;
        text-align: justify;
        text-align-last: justify;
      }
      display: flex;
      align-items: center;
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      margin: 0 30px 10px 0;
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
