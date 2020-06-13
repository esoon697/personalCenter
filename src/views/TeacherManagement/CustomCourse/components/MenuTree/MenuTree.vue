<template>
  <div class="menuTree-box">
    <div class="block">
        <el-tree
        style="width: 100%"
        v-if="menuTreeData.length"
        ref="menuTree"
        :data="menuTreeData"
        node-key="id"
        :default-expanded-keys="[currentExpandedKey]"
        :props="menuTreeProps"
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
              <input type="text" class="edit-box" placeholder="请输入新的名称" @blur="saveChange(node, data)" v-model="editVal" v-focus v-else>
              <span class="btn-group" v-show="isShowBtns && node.id == currentId">
                <button class="btn-item" @click="() => appendChildNode(node, data)">新增子节点</button>
                <button class="btn-item" @click="() => appendNode(node, data)">新增同级节点</button>
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
        <div v-else class="creatTree-btn" @click="creatTree">新建课程目录 <i style="font-size: 18px" class="el-icon-plus"></i></div>
    </div>
    <!-- 课程内容编辑弹窗 -->
    <myDialog
    :title="'课程内容编辑'"
    :aside="true"
    @close="editClose"
    @confirm="editConfirm"
    v-show="isShowEdit">
      <div class="contentEdit-box" slot="dialog-content">
        <!-- <input type="text" v-model="val3"> -->
        <div class="contentEdit-item" v-for="(resources, index1) in resourcesList" :key="index1">
          <div class="item-title">{{resources.title}}</div>
          <div class="item-main-box">
            <div class="item-main-left">
              <div class="slide-outer">
                <div class="slide-inner" v-if="resources.resources&&resources.resources.length">
                  <div class="slide-item" v-for="(resource, index2) in resources.resources" :key="index2">
                    <div class="resource-item">
                      <div class="resource-box">
                        <div class="resource" v-if="!resource.resourceType">{{index1}}{{resource.resourceId}}</div>
                        <img class="resource" v-if="resource.resourceType === 'photo'" :src="resource.sourceUrl" alt="">
                        <video class="resource" v-if="resource.resourceType === 'video'" :src="resource.sourceUrl"></video>
                        <i class="el-icon-delete resource-del-btn" @click="delResource(index1, index2)"></i>
                      </div>
                      <div class="index-box" type="text" v-if="!(isClick && index1 == currentIndex1 && index2 == currentIndex2)" @click="getCurrentIndex(index1, index2, resource)">{{index2 + 1}}</div>
                      <input type="text" v-else v-model="targetIndex" @blur="saveTarget(index1, index2, resource)" v-focus>
                    </div>
                  </div>
                </div>
                <div class="no-data" v-else>请选择课程资源</div>
              </div>
            </div>
            <div class="item-main-right">
              <button class="sourse-btn" @click="sourseImport('isShowEdit', index1)">资源库导入</button>
              <button class="local-btn">本地导入
                <input type="file" name="file" :id="'editFile'+index1" value="" accept="image/jpeg,image/png,image/jpg,image/gif" multiple @change="uploadResourse"  @click="localImport('editFile'+index1)">
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
        <!-- <input type="text" name="" id="input1" v-model="resourseType"> -->
        <el-select v-model="resourseType" placeholder="请选择">
          <el-option v-for="(resourTypeOpt, index) in resourTypeOpts" :key="index" :label="resourTypeOpt.name" :value="resourTypeOpt.typeId"></el-option>
        </el-select>
        <label for="input2">资源名称：</label>
        <input type="text" name="" id="input2" v-model="resourseName">
      </div>
      <button class="search-btn" @click="searchResourse">查询</button>
    </div>
    <div class="ChooseResour-box" slot="dialog-content">
      <el-tree
      ref="resourseTree"
      slot="dialog-content"
      :data="resourseData"
      :props="resourseProps"
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
          <input type="file" name="file" id="loadPermsFile" value="" accept="image/jpeg,image/png,image/jpg,image/gif" multiple @change="uploadResourse"  @click="localImport('loadPermsFile')">
        </button>
      </div>
    </div>
    <div class="loadPerms-box" slot="dialog-content">
      <el-table
        stripe
        row-key="sort"
        highlight-current-row
        :data="tableData"
        max-height="470"
        style="width: 100%">
        <el-table-column
          prop="sort"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="resourceName"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
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
import axios from 'axios'
import Sortable from 'sortablejs'
import myDialog from '@/components/myDialog/myDialog'
let id = 1000
export default {
  components: {myDialog},
  props: {},
  data () {
    return {
      currentExpandedKey: 1,
      isClick: false,
      targetIndex: null,
      menuTreeData: [],
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
            },
            {
              type: 1,
              url: '',
              sort: '5'
            },
            {
              type: 1,
              url: '',
              sort: '6'
            },
            {
              type: 1,
              url: '',
              sort: '7'
            },
            {
              type: 1,
              url: '',
              sort: '8'
            },
            {
              type: 1,
              url: '',
              sort: '9'
            },
            {
              type: 1,
              url: '',
              sort: '10'
            },
            {
              type: 1,
              url: '',
              sort: '11'
            }
          ]
        },
        {
          title: '课堂内容',
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
          title: '课堂作业',
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
          title: '课后拓展',
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
      resourseData: [],
      menuTreeProps: {
        children: 'children',
        label: 'menuName'
      },
      resourseProps: {
        children: 'children',
        label: 'sourcename'
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
      ],
      currentIndex1: 0,
      currentIndex2: 0,
      resourseType: null,
      resourseName: null,
      resourTypeOpts: []
    }
  },
  created () {},
  mounted () {
    // this.init()
  },
  computed: {
    activeName () {
      return this.$store.state.activeName
    },
    allowFlag () {
      let flag
      for (let i = 0; i < this.resourcesList.length; i++) {
        if (this.resourcesList[i].resources.length) {
          flag = true
          break
        } else {
          flag = false
        }
      }
      return flag
    }
  },
  methods: {
    init () {
      this.getTreeList()
      this.getCourContentType()
      this.getLoadPerms()
    },
    getTreeList () {
      let courId = this.$store.state.courseId
      this.$api.getTreeList({
        courId: courId
      }).then(res => {
        if (res.code === 200) {
          console.log(res.data)
          let newData = deepMap(res.data)
          console.log('newData', newData)
          this.menuTreeData = newData
        }
      })
      let num = 0
      let deepMap = (data) => {
        for (let i in data) {
          data[i].id = num++
          if (data[i].children && data[i].children.length > 0) {
            deepMap(data[i].children)
          }
        }
        return data
      }
    },
    // 课程内容类型
    getCourContentType () {
      this.$api.getCourContentType().then(res => {
        if (res.code === 200) {
          console.log('getCourContentType', res.data)
          this.resourcesList = res.data.list.map(e => {
            return {
              title: e.proTypeName,
              proTypeId: e.id,
              resources: []
            }
          })
        }
      })
    },
    // 查询资源库
    findSourceInfo () {
      this.$api.findSourceInfo({
        resourceName: this.resourseName
      }).then(res => {
        if (res.code === 200) {
          console.log('findSourceInfo', res.data)
          this.resourseData = res.data
        }
      })
      this.resourseName = null
    },
    // 行拖拽
    rowDrop () {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        // 官网上的配置项,加到这里面来,可以实现各种效果和功能
        animation: 150,
        ghostClass: 'blue-background-class',
        onEnd ({ newIndex, oldIndex }) {
          // const oldRow = _this.tableData[oldIndex]
          // if (oldIndex < newIndex) {
          //   _this.tableData.splice(newIndex + 1, 0, oldRow)
          //   _this.tableData.splice(oldIndex, 1)
          // } else if (oldIndex > newIndex) {
          //   _this.tableData.splice(newIndex, 0, oldRow)
          //   _this.tableData.splice(oldIndex + 1, 1)
          // }
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
          console.log('xxx', _this.tableData)
        }
      })
    },
    // 创建初始树
    creatTree () {
      this.$api.addTreeNode({
        chaTitle: '新增目录',
        courId: this.$store.state.courseId,
        parentId: 0,
        isPublic: 0,
        level: '0'
      }).then(res => {
        if (res.code === 200) {
          console.log('addTreeNode', res.data)
          let menuCode = res.data.chapterId
          const newChild = {
            id: id,
            menuName: '新增子目录' + id,
            menuCode: menuCode,
            isPublic: 0,
            parentId: 0,
            level: 0,
            children: []
          }
          this.menuTreeData.push(newChild)
        }
      })
    },
    // 新增子目录
    appendChildNode (node, data) {
      // let menuCode
      let level = parseInt(data.level)
      this.$api.addTreeNode({
        chaTitle: data.menuName,
        courId: this.$store.state.courseId,
        parentId: data.menuCode,
        isPublic: 0,
        level: level + 1 + ''
      }).then(res => {
        if (res.code === 200) {
          console.log('addTreeNode', res.data)
          let menuCode = res.data.chapterId
          const newChild = {
            id: id++,
            menuName: '新增子目录' + id,
            menuCode: menuCode,
            isPublic: 0,
            parentId: data.menuCode,
            level: level + 1 + '',
            children: []
          }
          if (!data.children) {
            this.$set(data, 'children', [])
          }
          console.log('data---------', data)
          data.children.push(newChild)
          this.currentExpandedKey = data.id
        }
      })
    },
    // 新增同级目录
    // appendNode (node, data) {
    //   const parent = node.parent
    //   const children = parent.data.children || parent.data
    //   const newNode = { id: id++, menuName: '新增目录' + id, children: [] }
    //   children.push(newNode)
    // },
    appendNode (node, data) {
      console.log('dataaaaaaaaaaaaaa', data)
      this.$api.addTreeNode({
        chaTitle: data.menuName,
        courId: this.$store.state.courseId,
        parentId: data.parentId,
        isPublic: 0,
        level: data.level
      }).then(res => {
        if (res.code === 200) {
          console.log('addTreeNode', res.data)
          let menuCode = res.data.chapterId
          const newNode = {
            id: id++,
            menuName: '新增目录' + id,
            menuCode: menuCode,
            isPublic: 0,
            parentId: data.parentId,
            level: data.level,
            children: []
          }
          this.$refs.menuTree.insertAfter(newNode, node)
        }
      })
    },
    // 删除节点
    remove (node, data) {
      this.$api.deleteTreeNode({
        id: data.menuCode
      }).then(res => {
        if (res.code === 200) {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          this.$message({
            type: 'info',
            message: '删除成功！'
          })
        }
      })
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
        this.$api.uploadTreeNode({
          chaId: data.menuCode,
          chaTitle: this.editVal,
          isDemonstration: 1,
          level: data.level,
          'sort': 0
        }).then()
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children[index].menuName = this.editVal
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
    addBatch () {
      this.$api.addBatch(this.resourcesList).then(res => {
        if (res.code === 200) {
          console.log('addBatch', res.data)
          this.$store.state.activeName = '3'
          this.isShowEdit = false
        } else {
          this.$message.warning('错误代码' + res.code)
        }
      })
    },
    editConfirm () {
      console.log(this.allowFlag)
      if (!this.allowFlag) {
        this.$message.warning('请按照提示完成课程上传')
        return
      }
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.addBatch()
        this.$message({
          type: 'success',
          message: '成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    editClose () {
      this.$confirm('关闭后数据将丢失，是否确认关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.isShowEdit = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 删除选中的资源
    delResource (index1, index2) {
      this.$confirm('是否删除当前选中资源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showClose: false
      }).then(() => {
        this.resourcesList[index1].resources.splice(index2, 1)
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
    // 获取当前选中的资源序号
    getCurrentIndex (index1, index2) {
      this.isClick = true // 改变序号输入框状态
      this.currentIndex1 = index1
      this.currentIndex2 = index2
      this.oldVal = index2 // 获取当前的资源序号
    },
    // 当前选中的资源序号失焦时的逻辑
    saveTarget () {
      if (this.targetIndex) {
        // 插入排序
        const currRow = this.resourcesList[this.currentIndex1].resources.splice(this.oldVal, 1)[0]
        this.resourcesList[this.currentIndex1].resources.splice(this.targetIndex - 1, 0, currRow)
      }
      this.isClick = false // 改变序号输入框状态
      this.oldVal = this.targetIndex
      this.targetIndex = null // 清除目标序号
    },
    searchResourse () {
      if (this.fromState === 'isShowEdit') {
        this.findSourceInfo()
      }
      if (this.fromState === 'isShowLoadPerms') {
        this.getLoadPackage()
      }
    },
    getCheckedResour (refName) {
      console.log(this.$refs[refName].getCheckedNodes())
      let checkedNodes = this.$refs[refName].getCheckedNodes()
      this.checkedResour = checkedNodes.filter(e => {
        return !e.children
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
        this.getCheckedResour('resourseTree')
        if (this.fromState === 'isShowEdit') {
          this.isShowEdit = true
          console.log('this.checkedResour', this.checkedResour)
          console.log('this.resourcesList', this.resourcesList)
          this.resourcesList[this.currentResourIndex].resources = this.checkedResour
          // this.$forceUpdate()
        }
        if (this.fromState === 'isShowLoadPerms') {
          this.isShowLoadPerms = true
          console.log('this.checkedResour', this.checkedResour)
          console.log('this.resourcesList', this.resourcesList)
          this.tableData[this.currentResourIndex].resources = this.checkedResour
        }
        this.isShowChooseResour = false
        this.$message({
          type: 'success',
          message: '提交成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    chooseResourClose () {
      this.$confirm('关闭后数据可能会丢失，是否确认关闭?', '提示', {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 自主建课-第二步-查询可下载编辑资源包列表
    getLoadPerms () {
      this.$api.getLoadPerms().then(res => {
        if (res.code === 200) {
          console.log('getLoadPerms', res.data)
          this.tableData = res.data.list
        }
      })
    },
    // 自主建课-第二步-批量更新可下载编辑资源包列表
    uploadLoadPerms () {
      this.$api.uploadLoadPerms({}).then(res => {
        if (res.code === 200) {
          console.log('uploadLoadPerms', res.data)
        }
      })
    },
    // 自主建课-第二步-查询下载资源包
    getLoadPackage () {
      this.$api.getLoadPackage({
        typeId: this.resourseType,
        name: this.resourseName
      }).then(res => {
        if (res.code === 200) {
          console.log('getLoadPackage', res.data)
          this.resourseData = res.data.list.map(e => {
            return {
              resourceId: e.typeId,
              resourceType: '',
              sourceName: e.typeName,
              sourceUrl: '',
              children: e.resourcePackages
            }
          })
        }
      })
      this.resourseType = null
      this.resourseName = null
    },
    // 自主建课-第二步-查询资源包类型
    getLoadPackageType () {
      this.$api.getLoadPackageType({}).then(res => {
        if (res.code === 200) {
          console.log('getLoadPackageType', res.data)
          this.resourTypeOpts = res.data
        }
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
          message: '成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    loadPermsClose () {
      this.$confirm('关闭后数据可能会丢失，是否确认关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.isShowLoadPerms = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    sourseImport (from, index) {
      this.isShowChooseResour = true
      this.isShowEdit = false
      this.isShowLoadPerms = false
      this.currentResourIndex = index
    },
    localImport (fileName) {
      console.log(fileName)
      console.log(document.querySelector('#' + fileName))
      var oFiles = document.querySelector('#' + fileName).files
      console.log(oFiles)
    },
    uploadResourse (event) {
      var e = window.event || event
      // 获取当前选中的文件
      var oFile = e.target.files[0]
      console.log(oFile)
      let param = new FormData() // 创建form对象
      param.append('file', oFile)// 通过append向form对象添加数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let token = localStorage.getItem('token')
      let config = {
        headers: {'Content-Type': 'multipart/form-data', 'Authorization': token}
      } // 添加请求头
      console.log(this.fromState)
      if (this.fromState === 'isShowEdit') {
        axios.post('http://api.yazhuokj.com/course/processInfo/uploadSourceInfoToBaoLiWeiShi', param, config)
          .then(response => {
            console.log(response.data)
          })
      }
      if (this.fromState === 'isShowLoadPerms') {
        axios.post('http://api.yazhuokj.com/course/resourcePackage/uploadPackage', param, config)
          .then(response => {
            console.log(response.data)
          })
      }
    },
    handleNodeClick (data) {
      console.log(data)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    loadPermsDel (scope) {
      console.log(scope.$index)
      this.tableData.splice(scope.$index, 1)
    }
  },
  watch: {
    activeName: {
      handler (val) {
        if (val === '2') {
          this.init()
        }
      },
      immediate: true
    },
    isShowChooseResour: {
      handler (val) {
        if (val && this.fromState == 'isShowEdit') {
          this.findSourceInfo()
        } else if (val && this.fromState == 'isShowLoadPerms') {
          this.getLoadPackage()
          this.getLoadPackageType()
        } else {
          this.resourseData = []
          this.resourTypeOpts = []
        }
      }
    },
    isShowLoadPerms: {
      handler (val) {
        if (val) {
          // this.getLoadPerms()
          this.fromState = 'isShowLoadPerms'
        }
      }
    },
    isShowEdit: {
      handler (val) {
        if (val) {
          // this.getCourContentType()
          this.fromState = 'isShowEdit'
        }
      }
    },
    resourcesList: {
      handler (val) {
        console.log('resourcesList', val)
      },
      deep: true
    }
  }
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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .creatTree-btn{
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:#666;
        border: 2px solid #666;
        padding: 8px 25px;
        cursor: pointer;
        &:hover{
          color: #007AB7;
          border: 2px solid #007AB7;
        }
        &:active{
          opacity: .6;
        }
      }
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
    width: 1300px;
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
          // flex: 1;
          position: relative;
          width: 75%;
          height: 180px;
          // margin-right: 20px;
          // background-color: #eee;
          // padding: 0 40px;
          // box-sizing: border-box;
            .slide-outer{
              width: 100%;
              height: 100%;
              border: 1px solid #eee;
              overflow: auto;
              .no-data{
                font-size: 16px;
                height: 180px;
                color: #666;
                text-align: center;
                line-height: 180px;
              }
              .slide-inner{
                padding: 10px;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                overflow: auto;
                box-sizing: border-box;
                .slide-item{
                  flex-shrink: 0;
                  width: 75px;
                  height: 100%;
                  margin-right: 20px;
                  .resource-item{
                    // flex: 1;
                    height: 100%;
                    // margin-right: 10px;
                    background-color: #fff;
                    display: flex;
                    flex-direction: column;
                    // justify-content: space-between;
                    align-items: center;
                    .resource-box{
                      position: relative;
                      width: 100%;
                      .resource{
                        width: 100%;
                        height: 100px;
                        background-color: #eee;
                        // margin-bottom: 20px;
                      }
                      .resource-del-btn{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        opacity: 0;
                        &:hover{
                          opacity: 1;
                        }
                        &:active{
                          opacity: .6;
                        }
                      }
                    }
                    .index-box, input{
                      width: 30px;
                      height: 20px;
                      text-align: center;
                      margin: 15px 0;
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
        }
        .item-main-right{
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:400;
          .sourse-btn, .local-btn{
            width: 95px;
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
