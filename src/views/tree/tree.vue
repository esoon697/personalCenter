<template>
  <div class="tree-wrapper">
    <div class="block">
        <p>使用 scoped slot</p>
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
            <span>{{ node.label }}</span>
            <span>
            <el-button
                type="text"
                size="mini"
                @click="() => appendChildNode(data)">
                新增子节点
            </el-button>
            <el-button
                type="text"
                size="mini"
                @click="() => appendNode(data)">
                新增同级节点
            </el-button>
            <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)">
                删除
            </el-button>
            <el-button
                type="text"
                size="mini"
                @click="() => update(node, data)">
                编辑
            </el-button>
            </span>
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
                  label: '三级 1-1-1'
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
      ]
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
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // console.log('data---------', data)
      this.data.push(newNode)
    },
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    update (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
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
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.tree-wrapper{
    width: 100%;
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
}
</style>
