<template>
  <div class="main">
    <!-- 我的成绩 -->
      <my-grades></my-grades>
    <!-- 学习地图 -->
      <study-map></study-map>
    <!-- 我的选课 -->
      <my-course></my-course>
  </div>
</template>

<script>
import myGrades from './myGrades/myGrades'
import myCourse from './myCourse/myCourse'
import studyMap from './studyMap/studyMap'
export default {
  components: {
    myGrades,
    myCourse,
    studyMap
  },
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () { },
  methods: {}
}
</script>
<style lang="less" scoped>
  .main{
    background: #fff;
  }
</style>
