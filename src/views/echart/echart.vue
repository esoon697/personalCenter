<template>
  <div class="echart-wrapper">
    <div id="bar-box"></div>
    <div id="pie-box"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  created () {
  },
  mounted () {
    var echartBar = this.$echarts.init(document.getElementById('bar-box'))
    var echartPie = this.$echarts.init(document.getElementById('pie-box'))
    // 绘制图表
    var barOption = {
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月']
      },
      yAxis: {
        type: 'value'
      },
      itemStyle: {
        color: '#00A0E9'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330],
        type: 'line'
      }]
    }
    var pieOption = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        left: 10,
        data: ['已完成', '未完成', '进行中']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['15%', '60%'],
          right: 30,
          label: {
            formatter: '{title|{b}} ({d}%)',
            // bleedMargin: 2,
            // position: 'outer',
            rich: {
              title: {
                color: '#989898',
                lineHeight: 10
              }
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          data: [
            {
              value: 335,
              name: '已完成',
              itemStyle: {
                color: '#FF7A8E'
              }
            },
            {
              value: 310,
              name: '未完成',
              itemStyle: {
                color: '#FFCC33'
              }
            },
            {
              value: 234,
              name: '进行中',
              itemStyle: {
                color: '#1DEAAD'
              }
            }
          ]
        }
      ]
    }
    echartBar.setOption(barOption)
    echartPie.setOption(pieOption)
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>
<style lang="less" scoped>
.echart-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  #bar-box{
    width: 600px;
    height: 600px;
  }
  #pie-box{
    width: 600px;
    height: 600px;
  }
}
</style>
