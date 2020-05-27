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
              <button class="btn-item" v-show="!data.children" @click="() => editContent(node, data)">编辑内容</button>
              <button class="btn-item" v-show="!data.children" @click="() => editLoad(node, data)">编辑下载</button>
            </span>
            <div class="less-btn" @click="ChangeShowBtns(node.id)">
              <i class="el-icon-setting" v-if="!(isShowBtns && node.id == currentId)"></i>
              <i class="el-icon-s-tools" v-else></i>
              </div>
        </span>
        </el-tree>
    </div>
    <myDialog
    :title="'课程内容编辑'"
    :aside="true"
    :isShowDialog.sync = isShowDialog
    @close="close"
    @confirm="confirm"
    v-if="isShowDialog">
      <div class="contentEdit-box" slot="dialog-content">
        <div class="contentEdit-item">
          <div class="item-title">课前预习</div>
          <div class="item-main-box">
            <div class="item-main-left">
              <swiper ref="mySwiper" :options="swiperOptions">
                <swiper-slide>Slide 1</swiper-slide>
                <swiper-slide>Slide 2</swiper-slide>
                <swiper-slide>Slide 3</swiper-slide>
                <swiper-slide>Slide 4</swiper-slide>
                <swiper-slide>Slide 5</swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>
            <div class="item-main-right">
              <button class="sourse-btn"></button>
              <button class="local-btn"></button>
            </div>
          </div>
        </div>
      </div>
    </myDialog>
  </div>
</template>

<script>
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
        pagination: {
          el: '.swiper-pagination'
        },
        // 箭头配置
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
          // hideOnClick: true,
          // disabledClass: 'my-button-disabled'
        }
      },
      hasChlid: false,
      isShowBtns: false,
      currentId: null,
      isEdit: false,
      editVal: null,
      isShowDialog: false
    }
  },
  created () {},
  mounted () {},
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
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
      this.isShowDialog = true
    },
    // 编辑下载权限
    editLoad (node, data) {},
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
    close () {
      this.isShowDialog = false
    },
    confirm () {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'cancelButton',
        confirmButtonClass: 'confirmButton',
        showClose: false
      }).then(() => {
        this.isShowDialog = false
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
  .contentEdit-box{
    width: 750px;
    height: 500px;
    overflow: auto;
    font-family:Microsoft YaHei;
    font-weight:400;
    .contentEdit-item{
      .item-title{
        font-size:18px;
        color:rgba(51,51,51,1);
        padding-left: 60px;
        box-sizing: border-box;
      }
      .item-main-box{
        width: 100%;
        .item-main-left{
          width: 60%;
          height: 200px;
          background-color: #eee;
        }
        .item-main-right{
          .sourse-btn{}
          .local-btn{}
        }
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
