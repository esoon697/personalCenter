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
              <button class="btn-item" v-show="!data.children" @click="() => update(node, data)">编辑内容</button>
              <button class="btn-item" v-show="!data.children" @click="() => update(node, data)">编辑下载</button>
            </span>
            <div class="less-btn" @click="ChangeShowBtns(node.id)">
              <i class="el-icon-setting" v-if="!(isShowBtns && node.id == currentId)"></i>
              <i class="el-icon-s-tools" v-else></i>
              </div>
        </span>
        </el-tree>
    </div>
  </div>
</template>

<script>
let id = 1000
export default {
  components: {},
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
      hasChlid: false,
      isShowBtns: false,
      currentId: null,
      isEdit: false,
      editVal: null
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    appendChildNode (data) {
      const newChild = { id: id++, label: '子节点', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      console.log('data---------', data)
      data.children.push(newChild)
    },
    appendNode () {
      const newNode = { id: id++, label: '节点', children: [] }
      this.data.push(newNode)
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      // console.log(this.data)
      console.log(children)
    },
    update (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    editName (node, data) {
      console.log(node.id)
      this.currentId = node.id
      this.isEdit = true
      console.log('node', node)
      console.log('data', data)
    },
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
      if (this.isShowBtns) {
        this.isShowBtns = false
      }
      if (this.currentId === id) {
        this.isShowBtns = false
        return
      }
      this.currentId = id
      this.isShowBtns = !this.isShowBtns
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
      font-weight:bold;
      .nodeName{
        color:rgba(153,153,153,1);
      }
      .parentNodeName{
        color:rgba(51,51,51,1);
      }
      .edit-box{
        width: 120px;
        height: 26px;
        text-indent: 10px;
        border-radius: 5px;
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
            border: 1px solid #409EFF;
            color: #409EFF;
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
}
</style>
