<template>
  <div class="line-main">
    <div id="line-box" class="echarts-size" ref="line"></div>
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
      if (this.leftActive === 1) {
        this.init()
      }
    }
  },
  mounted () {
    // this.init()
  },
  methods: {
    init () {
      let echartLine = this.$echarts.init(document.getElementById('line-box'))
      this.$echartLine = echartLine
      this.$echartLine.showLoading({
        text: '数据正在努力加载...',
        color: '#409EFF',
        textColor: '#666',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      })
      this.$api.getEchartInfo().then(res => {
        if (res.code == 200) {
          let months = res.data.scoresPerMonth.months
          let scores = res.data.scoresPerMonth.scores
          this.$echartLine.hideLoading()
          // 绘制图表
          // 加载配置项
          echartLine.setOption({
            grid: {
              left: '3%',
              right: '5%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: months,
              axisTick: {
                show: false // 去掉刻度线
              },
              axisLabel: {
                textStyle: {
                  color: '#666'
                },
                margin: 15 // 坐标轴文字与轴线之间的距离
                // interval: 0 // 加上强制横坐标的data显示完整
              },
              splitLine: {show: false}, // 去掉网格线
              name: '月份', // 轴名称
              nameLocation: 'end', // 轴名称相对位置
              nameTextStyle: { // 坐标轴名称样式
                color: '#48A9E5',
                fontSize: 14,
                padding: [40, 0, 0, -20]
              },
              axisLine: {
                lineStyle: {
                  color: '#E6E6E6',
                  width: 1,
                  type: 'solid'
                }
              }
            },
            yAxis: {
              type: 'value',
              // min: '0',
              // max: '300',
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
            },
            series: [{
              data: scores,
              type: 'line',
              color: '#00A0E9',
              // symbol: 'circle', // 拐点设置为实心
              animation: true, // false: hover圆点不缩放 true:hover圆点默认缩放
              symbolSize: 7, // 拐点大小
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: '{c}分',
                    position: 'top',
                    distance: 25,
                    backgroundColor: '#fff',
                    shadowColor: '#e3e3e3',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2,
                    borderRadius: 5,
                    padding: 5,
                    fontSize: 12,
                    color: '#00A0E9'
                  }
                }
              } // 拐点处显示数值
            }]
          })
        }
      })
      // 通过resize方法来重设图表宽度
      window.addEventListener('resize', this.repaint)
    },
    repaint () {
      let echartLine = this.$echarts.init(document.getElementById('line-box'))
      echartLine.resize()
    }
  }
}
</script>

<style lang="less" scoped>
  .line-main{
    width: 100%;
    height: 340px;
  }
  .echarts-size{
    width: 100%;
    height: 340px;
  }
</style>
