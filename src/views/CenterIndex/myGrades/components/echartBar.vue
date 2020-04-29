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
        // 到时候下面这个就换成调接口数据的那个方法，init放那个方面里面，这里处理的是点击了页码才调接口显示对应的图表
        this.init()
      }
    }
  },
  mounted () {
    // 到时候echarts的数据接口就在这两个里面调就行了，init方法必须在获取到接口数据之后再调用，不然要显示空白
    this.init()
  },
  methods: {
    // 加载图表
    init () {
      let echartBar = this.$echarts.init(document.getElementById('bar-box'))
      this.$echartBar = echartBar
      this.$echartBar.showLoading({
        text: '数据正在努力加载...',
        color: '#409EFF',
        textColor: '#666',
        maskColor: 'rgba(255, 255, 255, 0.8)',
        zlevel: 0
      })
      // 获取echart数据接口
      this.$api.getEchartInfo().then(res => {
        if (res.code == 200) {
          console.log('myCourseScoresssssssssssssssss', res.data.myScores)
          let myCourseScores = res.data.myScores.myCourseScores
          let openNames = res.data.myScores.openNames
          this.$echartBar.hideLoading()
          this.$echartBar.setOption({
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
                data: openNames,
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
                name: '科目', // 轴名称
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
              }
            ],
            yAxis: [
              {
                type: 'value',
                // min: '10',
                // max: '100',
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
            dataZoom: [
              {
                type: 'slider',
                show: true,
                start: 0,
                end: 30
                // handleSize: 8
              },
              {
                type: 'inside',
                // yAxisIndex: [0],
                start: 0,
                end: 30
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
                data: myCourseScores
              }
            ]
          })
        }
      })
      // let barOption = {
      //   color: ['#3398DB'],
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: { // 坐标轴指示器，坐标轴触发有效
      //       type: 'line' // 默认为直线，可选为：'line' | 'shadow'
      //     }
      //   },
      //   grid: {
      //     left: '3%',
      //     right: '5%',
      //     bottom: '3%',
      //     containLabel: true
      //   },
      //   xAxis: [
      //     {
      //       type: 'category',
      //       // data: ['a', 'b', 'c', 'd', 'e', 'f'],
      //       data: ['职业生涯规划', '职业道德与法律', '哲学与人生', '心理健康', '经济政治与社会', '心理健康'],
      //       axisTick: {
      //         show: false // 去掉刻度线
      //       },
      //       axisLabel: {
      //         textStyle: {
      //           color: '#666'
      //         },
      //         margin: 15, // 坐标轴文字与轴线之间的距离
      //         interval: 0 // 加上强制横坐标的data显示完整
      //       },
      //       splitLine: {show: false}, // 去掉网格线
      //       name: '科目', // 轴名称
      //       nameLocation: 'end', // 轴名称相对位置
      //       nameTextStyle: { // 坐标轴名称样式
      //         color: '#48A9E5',
      //         fontSize: 14,
      //         padding: [40, 0, 0, -14]
      //       },
      //       axisLine: {
      //         lineStyle: {
      //           color: '#E6E6E6',
      //           width: 1,
      //           type: 'solid'
      //         }
      //       }
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value',
      //       min: '10',
      //       max: '100',
      //       splitNumber: 10, // 数值的间隔
      //       name: '成绩', // 轴名称
      //       nameLocation: 'end', // 轴名称相对位置
      //       nameTextStyle: { // 坐标轴名称样式
      //         color: '#48A9E5',
      //         fontSize: 14,
      //         padding: [0, 50, 10, 0]
      //       },
      //       axisTick: {
      //         show: true, // 显示刻度线
      //         inside: true, // 刻度线朝内
      //         lineStyle: {
      //           color: '#E6E6E6'
      //         }
      //       },
      //       splitLine: {show: false},
      //       axisLine: {
      //         // 坐标轴线设置
      //         lineStyle: {
      //           color: '#E6E6E6',
      //           width: 1,
      //           type: 'solid'
      //         }
      //       },
      //       axisLabel: {
      //         // 坐标轴文字设置
      //         textStyle: {
      //           color: '#666'
      //         },
      //         margin: 15, // 坐标轴文字与轴线之间的距离
      //         interval: 0 // 加上强制横坐标的data显示完整
      //       }
      //     }
      //   ],
      //   series: [
      //     {
      //       name: '成绩',
      //       type: 'bar',
      //       barWidth: '8',
      //       itemStyle: { // 图形的形状
      //         // color: '#01E8D8',
      //         color: new this.$echarts.graphic.LinearGradient(
      //           0, 0, 0, 1,
      //           [
      //             {offset: 0, color: '#01E8D8'},
      //             {offset: 0.5, color: '#4EB1E5'},
      //             {offset: 1, color: '#0094E0'}
      //           ]
      //         ),
      //         barBorderRadius: [5, 5, 0, 0]
      //       },
      //       data: [48, 95, 50, 34, 64, 65]
      //     }
      //   ]
      // }
      // echartBar.setOption(barOption)
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
