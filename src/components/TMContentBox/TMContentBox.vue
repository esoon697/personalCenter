<template>
  <div class="main-content-box">
    <div class="main-content-inner">
      <div class="title"><slot name="content-title"></slot></div>
      <slot name="main-content"></slot>
    </div>
    <slot name="dialog"></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: [],
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {},
  watch: {}
}
</script>
<style lang="less" scoped>
@theme: #007AB7;
.main-content-box{
  padding: 80px;
  box-sizing: border-box;
  .main-content-inner{
    .title{
      display: inline-block;
      padding: 0 0 13px 20px;
      border-bottom: 4px solid @theme;
      margin-bottom: 40px;
      font-size:20px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(51,51,51,1);
    }
  }
}
</style>
