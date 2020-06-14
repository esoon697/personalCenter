<template>
  <TMContentBox>
    <span slot="content-title">我的选课</span>
    <div slot="main-content" class="view-outer">
      <MyCourItem v-for="(stuCourseDetail, index) in stuCourseDetails" :key="index" :stuCourseDetail=stuCourseDetail></MyCourItem>
      <div class="view-footer">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
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
      currentPage: 1,
      stuCourseDetails: [],
      total: 10,
      pageSize: 10
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getStuCourseDetail()
    },
    getStuCourseDetail () {
      let id = this.$route.query.index
      this.$api.getStuCourseDetail({
        id: id,
        page: this.currentPage
      }).then(res => {
        if (res.code === 200) {
          console.log('stuCourseDetails', res.data)
          this.stuCourseDetails = res.data.list
          this.total = res.data.total
          this.pageSize = res.data.pageSize
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getStuCourseDetail()
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
