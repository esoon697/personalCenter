<template>
  <div class="myWork">
    myTest.vue
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['page', 'workActive', 'examList'],
  watch: {
    page () {
      if (this.workActive === 1) {
        console.log('my test page change !!!')
      }
    }
  }
}
</script>

<style style="less" scoped>

</style>
