<template>
  <TMContentBox>
    <span slot="content-title">我的选课</span>
    <div slot="main-content" class="view-outer">
      <div class="myCourse-mian-box">
        <MyCourItem v-for="(myCourse, index) in myCourses" :key="index" :myCourse=myCourse></MyCourItem>
      </div>
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
      myCourses: [],
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
      this.selectMyCourse()
    },
    selectMyCourse () {
      // let id = this.$route.query.openId
      this.$api.selectMyCourse({
        pageSize: this.currentPage,
        pageNum: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          console.log('stuCourseDetails', res.data)
          this.myCourses = res.data.list
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
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .myCourse-mian-box{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .view-footer{
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
}
</style>
