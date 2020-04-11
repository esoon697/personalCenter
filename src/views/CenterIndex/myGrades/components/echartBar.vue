<template>
  <div class="bar-main">
    <div id="bar-box" class="echarts-size"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['leftActive'],
  watch: {
    leftActive () {
      if (this.leftActive === 0) {
        this.init()
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 加载图表
    init () {
      let echartBar = this.$echarts.init(document.getElementById('bar-box'))
      this.$echartBar = echartBar
      let barOption = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // data: ['a', 'b', 'c', 'd', 'e', 'f'],
            data: ['职业生涯规划', '职业道德与法律', '哲学与人生', '心理健康', '经济政治与社会', '心理健康'],
            axisTick: {
              show: false // 去掉刻度线
            },
            axisLabel: {
              textStyle: {
                color: '#666'
              },
              margin: 15, // 坐标轴文字与轴线之间的距离
              interval: 0 // 加上强制横坐标的data显示完整
            },
            splitLine: {show: false}, // 去掉网格线
            name: '科目', // 轴名称
            nameLocation: 'end', // 轴名称相对位置
            nameTextStyle: { // 坐标轴名称样式
              color: '#48A9E5',
              fontSize: 14,
              padding: [40, 0, 0, -14]
            },
            axisLine: {
              lineStyle: {
                color: '#E6E6E6',
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: '10',
            max: '100',
            splitNumber: 10, // 数值的间隔
            name: '成绩', // 轴名称
            nameLocation: 'end', // 轴名称相对位置
            nameTextStyle: { // 坐标轴名称样式
              color: '#48A9E5',
              fontSize: 14,
              padding: [0, 50, 10, 0]
            },
            axisTick: {
              show: true, // 显示刻度线
              inside: true, // 刻度线朝内
              lineStyle: {
                color: '#E6E6E6'
              }
            },
            splitLine: {show: false},
            axisLine: {
              // 坐标轴线设置
              lineStyle: {
                color: '#E6E6E6',
                width: 1,
                type: 'solid'
              }
            },
            axisLabel: {
              // 坐标轴文字设置
              textStyle: {
                color: '#666'
              },
              margin: 15, // 坐标轴文字与轴线之间的距离
              interval: 0 // 加上强制横坐标的data显示完整
            }
          }
        ],
        series: [
          {
            name: '成绩',
            type: 'bar',
            barWidth: '8',
            itemStyle: { // 图形的形状
              // color: '#01E8D8',
              color: new this.$echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#01E8D8'},
                  {offset: 0.5, color: '#4EB1E5'},
                  {offset: 1, color: '#0094E0'}
                ]
              ),
              barBorderRadius: [5, 5, 0, 0]
            },
            data: [48, 95, 50, 34, 64, 65]
          }
        ]
      }
      echartBar.setOption(barOption)
      // 通过resize方法来重设图表宽度
      window.addEventListener('resize', this.repaint)
    },
    repaint () {
      let echartBar = this.$echarts.init(document.getElementById('bar-box'))
      echartBar.resize()
    }
  }
}
</script>

<style lang="less" scoped>
  .bar-main{
    width: 100%;
    height: 340px;
  }
  .echarts-size{
    min-width: 100%;
    min-height: 100%;
  }
</style>
