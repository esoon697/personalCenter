<template>
  <div class="myDialog-mask" v-show="isShowDialog">
    <div class="myDialog-box">
      <div class="dialog-header">
        <div class="mid" v-if="!aside" >
          <span class="header-mid">{{title}}</span>
        </div>
        <div class="aside" v-else >
          <span class="header-left">{{title}}</span>
          <i class="header-right el-icon-circle-close" @click="close"></i>
        </div>
      </div>
      <div class="dialog-main">
        <div class="dialog-btns">
          <slot name="dialog-btns"></slot>
        </div>
        <div class="dialog-content">
          <slot name="dialog-content"></slot>
        </div>
        <div class="dialog-footer">
          <button class="dialog-cancel" @click="close">
            <slot name="dialog-cancel">取消</slot>
          </button>
          <button class="dialog-confirm" @click="confirm">
            <slot name="dialog-confirm">确认</slot>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ['aside', 'title', 'isShowDialog'],
  data () {
    return {
      // isShowDialog: false
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      this.$emit('confirm')
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.myDialog-mask{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    background:rgba(0,0,0,.4);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  .myDialog-box{
    // width: 400px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    font-family:Microsoft YaHei;
    font-weight:400;
    border-radius: 10px;
    overflow: hidden;
    .dialog-header{
      width: 100%;
      padding: 20px 18px;
      background:rgba(0,122,183,1);
      font-size:24px;
      color:rgba(255,255,255,1);
      box-sizing: border-box;
      .mid{
        display: flex;
        justify-content: center;
        align-items: center;
        .header-mid{
        }
      }
      .aside{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header-left{
        }
        .header-right{
        }
      }
    }
    .dialog-main{
      width: 100%;
      padding: 20px;
      background-color: #fff;
      box-sizing: border-box;
      .dialog-btns{}
      .dialog-content{
        margin: 20px 0;
        font-size:18px;
        color:rgba(51,51,51,1);
        display: flex;
        justify-content: center;
      }
      .dialog-footer{
        display: flex;
        justify-content: center;
        align-items: center;
        .dialog-cancel{
          width:120px;
          height:36px;
          border:1px solid rgba(0,122,183,1);
          border-radius:4px;
          font-size:18px;
          color:rgba(0,122,183,1);
          box-sizing: border-box;
          margin-right: 20px;
          background-color: #fff;
          &:hover{
            background-color: #eee;
          }
          &:active{
            opacity: .6;
          }
        }
        .dialog-confirm{
          width:120px;
          height:36px;
          background:rgba(0,122,183,1);
          border-radius:4px;
          font-size:18px;
          color:rgba(255,255,255,1);
          &:hover{
            opacity: .8;
          }
          &:active{
            opacity: .6;
          }
        }
      }
    }
  }
}
</style>
