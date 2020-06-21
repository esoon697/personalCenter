<template>
  <div v-loading="loading2" class="menuTree-box">
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
                <button class="btn-item" :class="{'checked-btn':isPaperChecked}" v-show="!(data.children&&data.children.length)" @click="() => choosePaper(node, data)">{{isPaperChecked?'编辑作业':'新增作业'}}</button>
              </span>
              <div class="less-btn" @click="ChangeShowBtns(node.id)">
                <i class="el-icon-setting" v-if="!(isShowBtns && node.id == currentId)"></i>
                <i class="el-icon-s-tools" v-else></i>
              </div>
          </span>
        </el-tree>
        <div v-else class="creatTree-btn" @click="creatTree">新建课程目录 <i style="font-size: 18px" class="el-icon-plus"></i></div>
    </div>
    <el-button class="next-btn" type="primary" @click="next()">下一步</el-button>
    <!-- 课程内容编辑弹窗 -->
    <myDialog
    :title="'课程内容编辑'"
    :aside="true"
    @close="editClose"
    @confirm="editConfirm"
    v-show="isShowEdit">
      <div v-loading="loading3" class="contentEdit-box" slot="dialog-content">
        <!-- <input type="text" v-model="val3"> -->
        <div class="contentEdit-item" v-for="(resources, index1) in resourcesList" :key="index1">
          <div class="item-title">{{resources.title}}</div>
          <div class="item-main-box">
            <div class="item-main-left">
              <div class="slide-outer">
                <div class="slide-inner" v-if="resources.children&&resources.children.length">
                  <div class="slide-item" v-for="(resource, index2) in resources.children" :key="index2">
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
              <button class="sourse-btn" @click="sourseImport('isShowEdit', resources.proTypeId)">资源库导入</button>
              <button class="local-btn">本地导入
                <input type="file" name="file" :id="'editFile'+index1" value="" accept="image/jpeg,image/png,image/jpg,image/gif" multiple @change="uploadResourse">
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
      <div v-loading="loading1" class="ChooseResour-box" slot="dialog-content">
        <el-tree
        ref="resourseTree"
        slot="dialog-content"
        :data="resourseData"
        :props="resourseProps"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"
        show-checkbox>
          <span v-if="fromState === 'isShowEdit'" style="width: 100%; position: relative" class="resourse-tree-node" slot-scope="{ node, data }">
            <button style="width: 100%; height: 100%; opacity: 0" @mouseover="mouseoverHandle(node, data)"></button>
          </span>
        </el-tree>
        <img v-show="previewImg" style="width: 200px; height: 300px; position: absolute; left: 500px" src="../../../../../assets/photo.jpeg" alt="">
      </div>
      <div class="checkbox-box" slot="custom">
        <el-checkbox v-if="fromState === 'isShowLoadPerms'" v-model="checked">将选中项设置为学生可下载</el-checkbox>
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
            <input type="file" name="file" id="loadPermsFile" value="" accept="image/jpeg,image/png,image/jpg,image/gif" multiple @change="uploadResourse">
          </button>
        </div>
      </div>
      <div class="loadPerms-box" slot="dialog-content">
        <el-table
          stripe
          v-loading="loading"
          row-key="sort"
          highlight-current-row
          :data="tableData"
          max-height="460"
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
    <!-- <myDialog
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
    </myDialog> -->
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
    <myDialog
    slot="dialog"
    :title="'选择试卷'"
    :aside="true"
    @close="choosePaperClose"
    @confirm="choosePaperConfirm"
    v-show="isShowChoosePaper"
    show-checkbox>
      <div class="chooseCour-btns" slot="dialog-btns">
        <div>
          <label for="testInput1">所属标签：</label>
          <input type="text" name="" v-model="belongLabel" id="testInput1">
          <label for="testInput2">试卷名称：</label>
          <input type="text" name="" v-model="paperName" id="testInput2">
        </div>
        <button class="search-btn" @click="getExamList">查询</button>
      </div>
      <div class="chooseCour-box" slot="dialog-content">
        <el-tree
        slot="dialog-content"
        :data="paperData"
        :props="paperProps"
        @node-click="paperNodeClick"
        ></el-tree>
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
      loading: false,
      loading1: false,
      loading2: false,
      loading3: false,
      isShowChooseTest: false,
      isShowtestDetails: false,
      testContent: null,
      isShowChoosePaper: false,
      currentExpandedKey: 1,
      isClick: false,
      targetIndex: null,
      menuTreeData: [
        {
          label: '第一张'
        }
      ],
      resourcesList: [
        {
          title: '课前',
          children: []
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
      resourseData: [
        {
          title: 'one',
          children: [
            {
              title: '1-1',
              children: []
            }
          ]
        },
        {
          title: 'two',
          children: []
        },
        {
          title: 'three',
          children: []
        }
      ],
      menuTreeProps: {
        children: 'children',
        label: 'menuName'
      },
      resourseProps: {
        children: 'children',
        label: 'title'
      },
      paperProps: {
        children: 'children',
        label: 'paperName'
      },
      checked: true,
      tableData: [],
      currentIndex1: 0,
      currentIndex2: 0,
      resourseType: null,
      resourseName: null,
      resourTypeOpts: [],
      fromState: '',
      belongLabel: null,
      paperName: null,
      paperData: [
        {
          paperName: 'one',
          children: [
            {
              paperName: 'two'
            }
          ]
        },
        {
          paperName: 'three',
          children: [
            {
              paperName: 'four'
            }
          ]
        },
        {
          paperName: 'five',
          children: [
            {
              paperName: 'six'
            }
          ]
        }
      ],
      testPaper: [],
      isPaperChecked: false,
      previewImg: ''
    }
  },
  created () {},
  mounted () {
    // this.init()
    let treeItems = document.querySelectorAll('ChooseResour-box>.el-tree-node')
    console.log('treeItems', treeItems)
    treeItems.forEach(e => {
      e.addEventListener('mouseover', this.mouseoverHandle, false)
    })
  },
  computed: {
    activeName () {
      return this.$store.state.activeName
    },
    allowFlag () {
      let flag
      for (let i = 0; i < this.resourcesList.length; i++) {
        if (this.resourcesList[i].children.length) {
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
    mouseoverHandle (node, data) {
      console.log('node', node)
      console.log('data', data)
      this.previewImg = node.url
    },
    init () {
      this.getTreeList()
      // this.getCourContentType()
      // this.getLoadPerms()
    },
    // 获取树信息
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
          this.loading2 = false
        }
      })
      let num = 1
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
            id: id++,
            menuName: '新增子目录',
            menuCode: menuCode,
            isPublic: 0,
            parentId: 0,
            level: 0,
            children: []
          }
          this.menuTreeData.push(newChild)
          this.loading2 = false
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
            menuName: '新增目录',
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
      console.log(data)
      this.chapterId = data.menuCode
      this.courseId = data.courseId
      // this.isShowEdit = false
      // this.isShowChooseResour = false
      // this.isShowLoadPerms = false
    },
    // 编辑下载权限
    editLoad (node, data) {
      this.isShowLoadPerms = true
      this.courseId = data.courseId
      this.rowDrop()
    },
    // // 新增作业
    // addTest () {
    //   this.$api.addTest({
    //     homeworkId: this.homeworkId,
    //     chapterId: this.chapterId
    //   }).then(res => {
    //     if (res.code === 200) {}
    //   })
    // },
    // // 查询作业
    // getaAtivelist () {
    //   this.$api.getaAtivelist({
    //     type: this.ruleForm.testObjs[this.currentIndex].type
    //   }).then(res => {
    //     if (res.code === 200) {
    //       console.log(res.data)
    //       this.testData = res.data
    //     }
    //   })
    // },
    // // 选择作业
    // chooseTest (index) {
    //   this.$refs.stuTree.setCheckedKeys([])
    //   this.isShowChooseTest = true
    //   this.currentIndex = index
    //   this.getaAtivelist()
    // },
    // 打开试卷弹窗
    choosePaper (node, data) {
      this.chapterId = data.menuCode
      this.courseId = data.courseId
      this.getExamList()
      this.isShowChoosePaper = true
    },
    // 查询试卷
    getExamList () {
      this.$api.getExamList({
        belongLabel: this.belongLabel,
        paperName: this.paperName
      }).then(res => {
        if (res.code === 200) {
          console.log('getExamList', res.data)
          this.paperData = res.data
        }
      })
    },
    paperNodeClick (node, data) {
      this.testPaper = []
      this.testPaper.push(node)
      console.log('this.testPaper', this.testPaper)
    },
    choosePaperClose () {
      this.isShowChoosePaper = false
      this.testPaper = []
    },
    choosePaperConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        if (this.testPaper[0].children && this.testPaper[0].children.length) {
          this.$message.warning('请选择某一张试卷')
          return
        }
        this.$api.addTest({
          chapterId: this.chapterId,
          homework: this.testPaper
        }).then(res => {
          if (res.code === 200) {
            console.log(res.data)
            this.isShowChoosePaper = false
            this.isPaperChecked = true
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
          this.testPaper = []
        })
      }).catch((e) => {
        console.log(e)
        this.testPaper = null
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
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
    // 课程内容-查询资源库
    findSourceInfo () {
      this.$api.findSourceInfo({
        resourceName: this.resourseName
      }).then(res => {
        if (res.code === 200) {
          console.log('findSourceInfo', res.data)
          this.resourseData = res.data
          this.loading1 = false
        }
      })
      this.resourseName = null
    },
    // 自主建课-第二步-资源库选择新增-------------------------
    addResourseBatch () {
      const checkedResour = this.checkedResour.map(e => {
        return {
          processType: this.currentResourIndex,
          activeId: '',
          chapterId: this.chapterId,
          resourceId: e.resourceId,
          sort: 0
        }
      })
      this.$api.addResourseBatch(checkedResour).then(res => {
        if (res.code === 200) {
          console.log('addResourseBatch', res.data)
          this.isShowEdit = true
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    // 查询课程内容信息
    getCourContentType () {
      this.$api.getCourContentType({
        chapterId: this.chapterId
      }).then(res => {
        if (res.code === 200) {
          console.log('getCourContentType', res.data)
          this.resourcesList = res.data
          this.loading3 = false
        }
      })
    },
    // 自主建课-第二步-课程内容更新
    uploadBatch () {
      this.$api.uploadBatch(this.resourcesList).then(res => {
        if (res.code === 200) {
          console.log('uploadBatch', res.data)
          // this.$store.state.activeName = '3'
          this.isShowEdit = false
        } else {
          this.$message.warning('错误代码' + res.code)
        }
      })
    },
    // 编辑内容确定
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
        this.uploadBatch()
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
    // 编辑内容取消
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
        this.resourcesList[index1].children.splice(index2, 1)
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
        const currRow = this.resourcesList[this.currentIndex1].children.splice(this.oldVal, 1)[0]
        this.resourcesList[this.currentIndex1].children.splice(this.targetIndex - 1, 0, currRow)
      }
      this.isClick = false // 改变序号输入框状态
      this.oldVal = this.targetIndex
      this.targetIndex = null // 清除目标序号
    },
    // 自主建课-第二步-查询可下载编辑资源包列表
    getLoadPerms () {
      this.$api.getLoadPerms({
        courseId: this.courseId
      }).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.list
          this.tableData.forEach((e, index) => {
            e.sort = index + 1
          })
          this.loading = false
          console.log('getLoadPerms', this.tableData)
        }
      })
    },
    // 自主建课-第二步-批量更新可下载编辑资源包列表-----------------------------------
    uploadLoadPerms () {
      this.$api.uploadLoadPerms(this.tableData).then(res => {
        if (res.code === 200) {
          console.log('uploadLoadPerms', res.data)
          this.isShowLoadPerms = false
          this.$message({
            type: 'success',
            message: '下载权限设置成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.message || '服务器错误，请稍后再试'
          })
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
          this.resourseData = res.data.list
          this.loading1 = false
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
    // 自主建课-第二步-选择可下载资源包------------------------------------------------------------------
    addPackage () {
      console.log('this.checkedResour.resourceId', this.checkedResour)
      const checkedResour = this.checkedResour.map(e => {
        return {
          resourceId: e.resourceId,
          courseId: this.courseId,
          status: this.checked
        }
      })
      this.$api.addPackage(checkedResour).then(res => {
        if (res.code === 200) {
          // this.tableData = res.data
          this.isShowLoadPerms = true
        } else {
          this.$message({
            type: 'error',
            message: res.message + ''
          })
        }
      })
    },
    // 自主建课-第二步-可下载资源本地上传
    uploadLocalPackage () {
      this.$api.uploadLocalPackage().then(res => {
        if (res.code === 200) {
          console.log('uploadLocalPackage', res.data)
        }
      })
    },
    // 下载资源权限确定
    loadPermsConfirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.uploadLoadPerms()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 下载资源权限取消
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
    // 本地上传判断逻辑
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
        // 自主建课-第二步-课程内容本地上传
        axios.post('http://api.yazhuokj.com/course/processInfo/uploadSourceInfo', param, config)
          .then(response => {
            console.log(response.data)
          })
      }
      if (this.fromState === 'isShowLoadPerms') {
        // 自主建课-第二步-可下载资源本地上传
        axios.post('http://api.yazhuokj.com/course/resourcePackage/uploadPackage', param, config)
          .then(response => {
            console.log(response.data)
          })
      }
    },
    // 选择资源弹窗显示/隐藏
    sourseImport (from, proTypeId) {
      this.isShowChooseResour = true
      this.isShowEdit = false
      this.isShowLoadPerms = false
      this.currentResourIndex = proTypeId
    },
    // 查询资源判断逻辑
    searchResourse () {
      if (this.fromState === 'isShowEdit') {
        this.findSourceInfo()
      }
      if (this.fromState === 'isShowLoadPerms') {
        this.getLoadPackage()
      }
    },
    // 获取选择的资源包装为数组
    getCheckedResour (refName) {
      console.log(this.$refs[refName].getCheckedNodes())
      let checkedNodes = this.$refs[refName].getCheckedNodes()
      this.checkedResour = checkedNodes.filter(e => {
        return !e.children
      })
    },
    // 选择资源确定
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
        console.log('this.fromState', this.fromState)
        if (this.fromState === 'isShowEdit') {
          this.addResourseBatch()
        }
        if (this.fromState === 'isShowLoadPerms') {
          console.log('this.checkedResour', this.checkedResour)
          this.addPackage()
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
    // 选择资源取消
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
    handleNodeClick (data) {
      console.log(data)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    loadPermsDel (scope) {
      console.log(scope.$index)
      this.tableData.splice(scope.$index, 1)
    },
    // 选择作业
    // chooseTest (index) {
    //   this.$refs.stuTree.setCheckedKeys([])
    //   this.isShowChooseTest = true
    //   this.currentIndex = index
    //   this.getaAtivelist()
    // },
    // 检查选择的作业
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
    // 关闭作业弹窗
    chooseTestClose () {
      this.isShowChooseTest = false
      // let keys = this.$refs.stuTree.getCheckedKeys()
      // console.log('keys', keys)
    },
    // 选择作业确认
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
    // 显示作业详情
    showDetails (data) {
      console.log(data)
      this.testContent = data
      // this.isShowChooseTest = false
      this.isShowtestDetails = true
      this.isShowChooseTest = false
    },
    // 关闭作业详情
    testDetailsClose () {
      this.isShowChooseTest = true
      this.isShowtestDetails = false
    },
    // 作业详情确认
    testDetailsConfirm () {
      this.isShowChooseTest = true
      this.isShowtestDetails = false
    },
    // 下一步
    next () {
      this.$store.state.activeName = '3'
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
          // this.findSourceInfo()
        } else if (val && this.fromState == 'isShowLoadPerms') {
          // this.getLoadPackage()
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
          this.getLoadPerms()
          this.fromState = 'isShowLoadPerms'
        }
      }
    },
    isShowEdit: {
      handler (val) {
        if (val) {
          this.getCourContentType()
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 0;
    box-sizing: border-box;
    .next-btn{
      width: 175px;
      height: 40px;
      margin-top: 20px;
    }
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
        border-radius: 5px;
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
        .checked-btn {
          background-color: green;
          color: #fff;
          &:hover{
            border: 1px solid green;
            color: green;
            background-color: #fff;
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
  .chooseCour-btns{
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
  .chooseCour-box{
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
