<template>
  <div class="mapItem-wapper">
    <div class="item-top">
      <img :src="base + mapItem.imgUrl">
    </div>
    <div class="item-mid">
      <p class="mid-title">{{mapItem.title}}</p>
      <p class="mid-content">{{mapItem.content}}</p>
    </div>
    <div class="item-bottom">
      <div class="progress">
        <div class="inner">
          <span class="progress-val">{{mapItem.progressVal}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['mapItem'],
  data () {
    return {
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
.mapItem-wapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // position: absolute;
  .item-top{
    img{
      width: 80px;
      height: 62px;
    }
  }
  .item-mid{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mid-title{
      width:214px;
      height:17px;
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(51,51,51,1);
      margin: 15px 0;
    }
    .mid-content{
      width:245px;
      height:35px;
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(102,102,102,1);
      line-height:20px;
      margin-bottom: 25px;
    }
  }
  .item-bottom{
    position: relative;
    .progress{
      width:220px;
      height:30px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(67,167,229,1);
      border-radius:5px;
      .inner{
        width: 50%;
        height: 100%;
        background:linear-gradient(0deg,rgba(0,148,224,1),rgba(78,177,229,1),rgba(1,232,216,1));
        .progress-val{
          float: right;
          margin-right: 10px;
          font-size:16px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height: 30px;
        }
        .isCenter{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
