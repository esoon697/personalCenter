<template>
  <TMContentBox>
    <span slot="content-title">学生选课</span>
    <div slot="main-content" class="view-outer">
      <ChosCourItem v-for="(stuCourse, index) in stuCourseList" :key="index" :stuCourse=stuCourse :index="index"></ChosCourItem>
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
import ChosCourItem from './components/ChosCourItem'
export default {
  components: {TMContentBox, ChosCourItem},
  props: [],
  data () {
    return {
      currentPage: 1,
      stuCourseList: [],
      total: 0,
      pageSize: 0
    }
  },
  computed: {},
  created () {},
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getStuCourseList()
    },
    getStuCourseList () {
      this.$api.getStuCourseList({
        pageNum: this.currentPage
      }).then(res => {
        if (res.code === 200) {
          console.log('getStuCourseList', res.data)
          this.stuCourseList = res.data.list
          this.total = res.data.total
          this.pageSize = res.data.pageSize
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getStuCourseList()
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.view-footer{
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
</style>
