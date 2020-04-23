<template>
  <div class="map-main">
    <div class="map-title">
      <div class="line"></div>
      <span>我的选课</span>
    </div>
    <div class="map-box">
      <MapItem ref="Map-item" class="Map-item" v-for="(mapItem, index) in mapList" :key="index" :mapItem="mapItem"/>
      <!-- <div class="map-flag"></div> -->
      <img class="map-flag" :src="base+'studyMap_flag.png'">
    </div>
  </div>
</template>

<script>
import MapItem from './components/mapItem'
export default {
  components: {MapItem},
  props: {},
  data () {
    return {
      mapList: [
        {
          imgUrl: 'studyMap_img01.png',
          title: '完成部颁五门课程学习第一步',
          content: '完成部颁五门课程学习第一步完成部颁五门课程学习第一步完成部颁五门课程',
          progressVal: '100%',
          progressVal1: '1/1'
        },
        {
          imgUrl: 'studyMap_img02.png',
          title: '完成部颁五门课程学习第二步',
          content: '完成部颁五门课程学习第一步完成部颁五门课程学习第一步完成部颁五门课程',
          progressVal: '60%',
          progressVal1: '3/5'
        },
        {
          imgUrl: 'studyMap_img03.png',
          title: '完成部颁五门课程学习第三步',
          content: '完成部颁五门课程学习第一步完成部颁五门课程学习第一步完成部颁五门课程',
          progressVal: '70%',
          progressVal1: '7/10'
        },
        {
          imgUrl: 'studyMap_img04.png',
          title: '完成部颁五门课程学习第四步',
          content: '完成部颁五门课程学习第一步完成部颁五门课程学习第一步完成部颁五门课程',
          progressVal: '80%',
          progressVal1: '8/10'
        }
      ]
    }
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {},
  watch: {}
}
</script>
<style lang="less" scoped>
.map-main{
  position: relative;
  width: 100%;
  height: 440px;
  margin-bottom: 20px;
  padding: 25px 20px;
  box-sizing: border-box;
  background: #fff url(http://182.148.48.236:54321/source/personalCenter/studyMap_bg.png) center no-repeat;
  .map-title{
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(51,51,51,1);
    // line-height:67px;
    .line{
      width: 4px;
      height: 18px;
      background: linear-gradient(0deg,rgba(1,232,216,1),rgba(78,177,229,1),rgba(0,148,224,1));
      border-radius: 2px;
      margin-right: 10px;
    }
  }
  .map-box{
    width: 100%;
    display: flex;
    position: absolute;
    top: 28%;
    left: 2%;
  }
  .Map-item{
    margin-right: 5%;
    &:nth-child(odd){
      transform: translateY(50px);
      // width: 100%;
      &::after{
        content: '';
        display: block;
        background: url(http://182.148.48.236:54321/source/personalCenter/studyMap-line1.png) center no-repeat;
        background-size: contain;
        width: 100%;
        height: 200px;
        position: absolute;
        top: -60%;
        left: 70%;
      }
      @media screen and (max-width: 1920px){
        &::after{top: -60%; left: 70%;}
      }
      @media screen and (max-width: 1460px){
        &::after{top: -60%; left: 65%;}
      }
      @media screen and (max-width: 1200px){
        &::after{top: -60%; left: 60%;}
      }
    }
    &:nth-child(even){
      transform: translateY(-50px);
      &::after{
        content: '';
        display: block;
        background: url(http://182.148.48.236:54321/source/personalCenter/studyMap-line2.png) center no-repeat;
        background-size: contain;
        width: 100%;
        height: 200px;
        position: absolute;
        top: -15%;
        left: 68%;
      }
      @media screen and (max-width: 1920px){
        &::after{top: -10%; left: 70%;}
      }
      @media screen and (max-width: 1460px){
        &::after{top: -20%; left: 70%;}
      }
      @media screen and (max-width: 1200px){
        &::after{top: -15%; left: 67%;}
      }
    }
    &:nth-child(4){
      &::after{
        width: 80%;
      }
      @media screen and (max-width: 1920px){
        &::after{top: -15%; left: 70%;}
      }
      @media screen and (max-width: 1460px){
        &::after{top: -25%; left: 70%;}
      }
      // @media screen and (max-width: 1200px){
      //   &::after{top: -25%; left: 70%;}
      // }
    }
  }
  .map-flag{
    display: block;
    margin-left: -1%;
  }
  @media screen and (max-width: 1920px){
    .map-flag{height: 120px;}
  }
  @media screen and (max-width: 1460px){
    .map-flag{height: 100px;}
  }
  @media screen and (max-width: 1200px){
    .map-flag{height: 90px;}
  }
}
</style>
