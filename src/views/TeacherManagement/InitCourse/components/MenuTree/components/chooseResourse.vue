<template>
  <div class="chooseResourse-box">
    <myDialog
    :title="'选择资源'"
    :aside="true"
    @close="close"
    @confirm="confirm"
    v-if="isShowDialog">
    <div slot="dialog-btns">
      <label for="input1">资源类别：</label>
      <input type="text" name="" id="input1">
      <label for="input2">资源名称：</label>
      <input type="text" name="" id="input2">
    </div>
    <div class="">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
    </myDialog>
  </div>
</template>

<script>
import myDialog from '@/components/myDialog/myDialog'
export default {
  components: {myDialog},
  props: [],
  data () {
    return {
      isShowDialog: false,
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
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
    },
    handleNodeClick (data) {
      console.log(data)
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
</style>
