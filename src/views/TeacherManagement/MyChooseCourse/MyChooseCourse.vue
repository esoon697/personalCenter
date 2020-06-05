<template>
  <TMContentBox>
    <span slot="content-title">我的选课</span>
    <div slot="main-content" class="view-outer">
      <MyCourItem v-for="n in 6" :key="n"></MyCourItem>
      <div class="view-footer">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </TMContentBox>
</template>

<script>
import TMContentBox from '@/components/TMContentBox/TMContentBox'
import MyCourItem from './components/MyCourItem'
export default {
  components: {TMContentBox, MyCourItem},
  props: [],
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
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
.view-outer{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .view-footer{
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
}
</style>
