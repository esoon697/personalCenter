<template>
  <div class="menuTree-box">
    <div class="block">
        <el-tree
        :data="data"
        node-key="id"
        default-expand-all
        highlight-current
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
            <span class="nodeName" :class="{'parentNodeName': data.children && data.children.length}" v-if="!(isEdit && node.id == currentId)">{{ node.label }}</span>
            <input type="text" class="edit-box" placeholder="请输入新的名称" @blur="saveChange(node, data)" v-model="editVal" v-else>
            <span class="btn-group" v-show="isShowBtns && node.id == currentId">
              <button class="btn-item" @click="() => appendChildNode(data)">新增子节点</button>
              <button class="btn-item" @click="() => appendNode(data)">新增同级节点</button>
              <button class="btn-item" @click="() => remove(node, data)">删除目录</button>
              <button class="btn-item" @click="() => editName(node, data)">编辑目录</button>
              <button class="btn-item" v-show="!(data.children&&data.children.length)" @click="() => editContent(node, data)">编辑内容</button>
              <button class="btn-item" v-show="!(data.children&&data.children.length)" @click="() => editLoad(node, data)">编辑下载</button>
            </span>
            <div class="less-btn" @click="ChangeShowBtns(node.id)">
              <i class="el-icon-setting" v-if="!(isShowBtns && node.id == currentId)"></i>
              <i class="el-icon-s-tools" v-else></i>
              </div>
        </span>
        </el-tree>
    </div>
    <!-- 课程内容编辑弹窗 -->
    <myDialog
    :title="'课程内容编辑'"
    :aside="true"
    @close="editClose"
    @confirm="editConfirm"
    v-show="isShowEdit">
      <div class="contentEdit-box" slot="dialog-content">
        <div class="contentEdit-item" v-for="(resources, index) in resourcesList" :key="index">
          <div class="item-title">课前预习</div>
          <div class="item-main-box">
            <div class="item-main-left">
              <!-- <swiper :ref="'mySwiper'+n" :options="swiperOptions">
                  <swiper-slide>Slide 1</swiper-slide>
                  <swiper-slide>Slide 2</swiper-slide>
                  <swiper-slide>Slide 3</swiper-slide>
                  <swiper-slide>Slide 4</swiper-slide>
                  <swiper-slide>Slide 5</swiper-slide>
              </swiper>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div> -->
              <!-- <div class="block">
                <el-carousel trigger="click" height="200px" indicator-position="none" arrow="always" :autoplay='false'>
                  <el-carousel-item v-for="item in 4" :key="item">
                    <div class="swiper-item">
                      <div class="resource-item">
                        <img class="resource" v-show="!type" src="" alt="">
                        <video class="resource" v-show="type == 2" src=""></video>
                        <input type="text">
                      </div>
                      <div class="resource-item">
                        <img class="resource" v-show="!type" src="" alt="">
                        <video class="resource" v-show="type == 2" src=""></video>
                        <input type="text">
                      </div>
                      <div class="resource-item">
                        <img class="resource" v-show="!type" src="" alt="">
                        <video class="resource" v-show="type == 2" src=""></video>
                        <input type="text">
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div> -->
              <div class="slide-outer">
                <div class="slide-inner">
                  <div class="slide-item" v-for="(resource, index) in resources.resources" :key="index">
                    <div class="resource-item">
                      <img class="resource" v-show="resource.type == 1" src="" alt="">
                      <video class="resource" v-show="resource.type == 2" src=""></video>
                      <input type="text" v-model="resource.sort">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="item-main-right">
              <button class="sourse-btn" @click="sourseImport('isShowEdit')">资源库导入</button>
              <button class="local-btn">本地导入
                <input type="file" name="file" id="file1" value="" accept="image/jpeg,image/png,image/jpg,image/gif" multiple οnchange="previewImg(this)"  @click="localImport">
              </button>
            </div>
          </div>
        </div>
      </div>
    </myDialog>
    <!-- 选择资源弹窗 -->
    <myDialog
    :title="'选择资源'"
    :aside="true"
    @close="chooseResourClose"
    @confirm="chooseResourConfirm"
    v-show="isShowChooseResour">
    <div class="ChooseResour-btns" slot="dialog-btns">
      <div>
        <label for="input1">资源类别：</label>
        <input type="text" name="" id="input1">
        <label for="input2">资源名称：</label>
        <input type="text" name="" id="input2">
      </div>
      <button class="search-btn">查询</button>
    </div>
    <div class="ChooseResour-box" slot="dialog-content">
      <el-tree
      slot="dialog-content"
      :data="data1"
      :props="defaultProps"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      show-checkbox></el-tree>
    </div>
    <div class="checkbox-box" slot="custom">
      <el-checkbox v-model="checked">将选中项设置为学生课下载</el-checkbox>
    </div>
    </myDialog>
     <!-- 可下载内容编辑弹窗 -->
    <myDialog
    :title="'可下载内容编辑'"
    :aside="true"
    @close="loadPermsClose"
    @confirm="loadPermsConfirm"
    v-show="isShowLoadPerms">
    <div class="loadPerms-btns" slot="dialog-btns">
      <div>
        <button class="lp-resourse-btn" @click="sourseImport('isShowLoadPerms')">选择资源</button>
        <button class="lp-upload-btn">上传资源
          <input type="file" name="file" id="file1" value="" accept="image/jpeg,image/png,image/jpg,image/gif" multiple οnchange="previewImg(this)"  @click="localImport">
        </button>
      </div>
    </div>
    <div class="loadPerms-box" slot="dialog-content">
      <el-table
        stripe
        highlight-current-row
        :data="tableData"
        max-height="470"
        style="width: 100%">
        <el-table-column
          prop="id"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="isAllow"
          align="center"
          label="学生可下载">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isAllow" active-color="#007AB7"></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="rank"
          align="center"
          label="顺序调整">
          <template>
            <span class="el-icon-sort"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="loadPermsDel(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    </myDialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import myDialog from '@/components/myDialog/myDialog'
let id = 1000
export default {
  components: {myDialog},
  props: {},
  data () {
    return {
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-11111111111111'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        },
        {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }
      ],
      swiperOptions: {
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        // 箭头配置
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
          // hideOnClick: true,
          // disabledClass: 'my-button-disabled'
        },
        // 一个屏幕展示的数量
        slidesPerView: 3,
        // 间距
        spaceBetween: 30
      },
      resourcesList: [
        {
          title: '课前预习',
          resources: [
            {
              type: 1,
              url: '',
              sort: '1'
            },
            {
              type: 1,
              url: '',
              sort: '2'
            },
            {
              type: 1,
              url: '',
              sort: '3'
            },
            {
              type: 1,
              url: '',
              sort: '4'
            }
          ]
        },
        {
          title: '课前预习',
          resources: [
            {
              type: 1,
              url: '',
              sort: '1'
            },
            {
              type: 1,
              url: '',
              sort: '2'
            },
            {
              type: 1,
              url: '',
              sort: '3'
            },
            {
              type: 1,
              url: '',
              sort: '4'
            }
          ]
        },
        {
          title: '课前预习',
          resources: [
            {
              type: 1,
              url: '',
              sort: '1'
            },
            {
              type: 1,
              url: '',
              sort: '2'
            },
            {
              type: 1,
              url: '',
              sort: '3'
            },
            {
              type: 1,
              url: '',
              sort: '4'
            }
          ]
        }
      ],
      hasChlid: false,
      isShowBtns: false,
      currentId: null,
      isEdit: false,
      editVal: null,
      isShowEdit: false,
      isShowChooseResour: false,
      isShowLoadPerms: false,
      data1: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
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
      checked: true,
      tableData: [
        {
          id: 1,
          name: '白夜行',
          isAllow: false,
          sort: 1
        },
        {
          id: 2,
          name: '沉默的大多数',
          isAllow: false,
          sort: 2
        },
        {
          id: 3,
          name: '乌合之众',
          isAllow: false,
          sort: 3
        },
        {
          id: 4,
          name: '人间失格',
          isAllow: false,
          sort: 4
        },
        {
          id: 5,
          name: '活着',
          isAllow: false,
          sort: 5
        }
      ]
    }
  },
  created () {},
  mounted () {
  },
  computed: {
    // swiper () {
    //   return this.$refs.mySwiper1.$swiper
    // }
  },
  methods: {
    // 行拖拽
    rowDrop () {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd ({ newIndex, oldIndex }) {
          const newRow = _this.tableData[oldIndex]
          const oldRow = _this.tableData[newIndex]
          _this.tableData.splice(oldIndex, 1, newRow)
          _this.tableData.splice(newIndex, 1, oldRow)
        }
      })
    },
    // 新增子目录
    appendChildNode (data) {
      const newChild = { id: id++, label: '子节点', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      console.log('data---------', data)
      data.children.push(newChild)
    },
    // 新增同级目录
    appendNode () {
      const newNode = { id: id++, label: '节点', children: [] }
      this.data.push(newNode)
    },
    // 删除节点
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      // console.log(this.data)
      console.log(children)
    },
    // 编辑节点名称
    editName (node, data) {
      console.log(node.id)
      this.currentId = node.id
      this.isEdit = true
    },
    // 保存修改节点名称
    saveChange (node, data) {
      if (this.editVal) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children[index].label = this.editVal
      }
      this.isEdit = false
      this.editVal = null
    },
    // 编辑课程内容
    editContent (node, data) {
      this.isShowEdit = true
      // this.isShowEdit = false
      // this.isShowChooseResour = false
      // this.isShowLoadPerms = false
    },
    // 编辑下载权限
    editLoad (node, data) {
      this.isShowLoadPerms = true
      this.rowDrop()
    },
    handleDragStart (node, ev) {
      console.log('drag start', node)
    },
    handleDragEnter (draggingNode, dropNode, ev) {
      console.log('tree drag enter: ', dropNode.label)
    },
    handleDragLeave (draggingNode, dropNode, ev) {
      console.log('tree drag leave: ', dropNode.label)
    },
    handleDragOver (draggingNode, dropNode, ev) {
      console.log('tree drag over: ', dropNode.label)
    },
    handleDragEnd (draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType)
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType)
    },
    allowDrop (draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag (draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },
    ChangeShowBtns (id) {
      if (this.currentId === id) {
        this.isShowBtns = !this.isShowBtns
      } else {
        this.currentId = id
        this.isShowBtns = true
      }
    },
    editClose () {
      this.isShowEdit = false
    },
    chooseResourClose () {
      if (this.fromState == 'isShowEdit') {
        this.isShowEdit = true
      }
      if (this.fromState == 'isShowLoadPerms') {
        this.isShowLoadPerms = true
      }
      this.isShowChooseResour = false
    },
    loadPermsClose () {
      this.isShowLoadPerms = false
    },
    editConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.isShowEdit = false
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    chooseResourConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        if (this.fromState == 'isShowEdit') {
          this.isShowEdit = true
        }
        if (this.fromState == 'isShowLoadPerms') {
          this.isShowLoadPerms = true
        }
        this.isShowChooseResour = false
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    loadPermsConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.isShowLoadPerms = false
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    sourseImport (from) {
      this.fromState = from
      this.isShowChooseResour = true
      this.isShowEdit = false
      this.isShowLoadPerms = false
    },
    localImport () {
      var oFiles = document.querySelector('#file1').files
      console.log(oFiles)
    },
    // previewImg (input, imgObj) {
    //   console.log(input)
    // },
    handleNodeClick (data) {
      console.log(data)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    loadPermsDel (scope) {
      this.tableData.splice(scope.index, 1)
    }
  },
  watch: {}
}
</script>
<style lang="less">
.menuTree-box{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 50px 0;
    box-sizing: border-box;
    .block{
      width: 90%;
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      font-size:16px;
      font-family:Microsoft YaHei;
      .nodeName{
        color:rgba(153,153,153,1);
      }
      .parentNodeName{
        color:rgba(51,51,51,1);
      }
      .edit-box{
        width: 120px;
        height: 26px;
        border-radius: 5px;
        padding: 0 10px;
      }
      .btn-group{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding-left: 10px;
        box-sizing: border-box;
        .btn-item{
          font-size:12px;
          line-height: 13px;
          padding: 5px 7px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:#606266;
          border:1px solid #DCDFE6;
          border-radius:5px;
          background-color: #fff;
          margin: 0 7px 3px 0;
          &:hover{
            border: 1px solid #007AB7;
            color: #007AB7;
          }
          &:active{
            opacity: .7;
          }
        }
      }
      .less-btn{
        font-size: 20px;
      }
    }
    .el-tree-node__content{
      padding: 10px 0;
      height: auto;
      min-height: 26px;
      border-bottom: 1px solid #DDDDDD;
    }
  }
  .contentEdit-box{
    width: 750px;
    height: 500px;
    border: 1px solid #DFDFE0;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: auto;
    font-family:Microsoft YaHei;
    font-weight:400;
    .contentEdit-item{
      .item-title{
        font-size:18px;
        color:rgba(51,51,51,1);
        padding: 20px 0;
        // text-indent: 40px;
      }
      .item-main-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item-main-left{
          position: relative;
          // width: 60%;
          height: 200px;
          // background-color: #eee;
          // padding: 0 40px;
          // box-sizing: border-box;
            .slide-outer{
              width: 400px;
              height: 100%;
              overflow: auto;
              .slide-inner{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                overflow: auto;
                .slide-item{
                  flex-shrink: 0;
                  // display: inline-block;
                  width: 120px;
                  height: 100%;
                  margin-right: 20px;
                  .resource-item{
                    // flex: 1;
                    height: 100%;
                    // margin-right: 10px;
                    background-color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    .resource{
                      width: 100%;
                      height: 80%;
                      background-color: #eee;
                      // margin-bottom: 20px;
                    }
                    input{
                      width: 30px;
                      height: 20px;
                      text-align: center;
                      margin: 20px 0;
                      padding: 5px;
                      border: 1px solid #ddd;
                      color: #999;
                      font-size: 16px;
                      border-radius: 6px;
                      // box-sizing: border-box;
                    }
                    &:last-child{
                      margin-right: 0;
                    }
                  }
                }
              }
            }
          .block{
            width: 100%;
            height: 100%;
            .swiper-item{
              // background-color: #eee;
              width: 100%;
              height: 100%;
              padding: 0 20px;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              .resource-item{
                flex: 1;
                height: 100%;
                margin-right: 10px;
                background-color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                .resource{
                  width: 100%;
                  height: 80%;
                  background-color: #eee;
                  margin-bottom: 20px;
                }
                input{
                  width: 30px;
                  height: 20px;
                  background-color: #eee;
                  text-align: center;
                }
                &:last-child{
                  margin-right: 0;
                }
              }
            }
          }
          .swiper-container{
            width: 100%;
            height: 100%;
            .Slides-box{
              padding: 0 20px;
              display: flex;
            }
            .swiper-wrapper{
              // padding: 0 40px;
              // box-sizing: border-box;
              // overflow: hidden;
            }
            .swiper-slide{
              background-color: #fff;
            }
          }
          .swiper-button-prev, .swiper-button-next{
            outline: none;
            &::after{
              font-size: 24px;
            }
          }
        }
        .item-main-right{
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          .sourse-btn, .local-btn{
            width: 110px;
            height: 40px;
            border-radius:4px;
            color:rgba(255,255,255,1);
            &:hover{
              opacity: .8;
            }
            &:active{
              opacity: .6;
            }
          }
          .sourse-btn{
            background:rgba(202,56,66,1);
            margin-right: 20px;
          }
          .local-btn{
            position: relative;
            background:rgba(0,122,183,1);
            input {
              width: 100%;
              height: 100%;
              position: absolute;
              right: 0;
              top: 0;
              opacity: 0;
            }
          }
        }
      }
    }
  }
  .ChooseResour-btns{
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
  .ChooseResour-box{
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
  .checkbox-box{
    position: absolute;
    top: 0;
    left: 0;
    .el-checkbox__input.is-checked+.el-checkbox__label{
      color: #007AB7;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background-color: #007AB7;
      border-color: #007AB7;
    }
  }
  .loadPerms-btns{
    .lp-upload-btn, .lp-resourse-btn{
      width:110px;
      height:40px;
      border-radius:4px;
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      &:hover{
        opacity: .8;
      }
      &:active{
        opacity: .6;
      }
    }
    .lp-resourse-btn{
      background:rgba(202,56,66,1);
      margin-right: 30px;
    }
    .lp-upload-btn{
      position: relative;
      background:rgba(0,122,183,1);
      input {
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
      }
    }
  }
  .loadPerms-box{
    width: 750px;
    height: 470px;
    border: 1px solid #DFDFE0;
    box-sizing: border-box;
    overflow: auto;
    .el-button--text{
      color: #007AB7;
      &:active{
        opacity: .6;
      }
    }
  }
}
.el-message-box{
  border: none;
  border-radius: 6px;
  overflow: hidden;
}
.el-message-box__header{
  background: #007ab7;
  .el-message-box__title{
    text-align: center;
    span{
      color: #fff;
    }
  }
}
.el-message-box__btns{
  display: flex;
  justify-content: center;
}
.cancelButton{
  border:1px solid rgba(0,122,183,1);
  color:rgba(0,122,183,1);
  box-sizing: border-box;
  background-color: #fff;
  &:hover{
    background-color: #eee;
  }
  &:active{
    opacity: .6;
  }
}
.confirmButton{
  background:rgba(0,122,183,1);
  border-color: rgba(0,122,183,1);
}
.el-button--primary{
  background:rgba(0,122,183,1);
  border-color: rgba(0,122,183,1);
}
</style>
