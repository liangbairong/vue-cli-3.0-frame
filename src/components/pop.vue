<template>
  <div>
    <transition name="bgAnimation">
      <div class="bg" v-if="state" v-tap="{methods:close}"></div>
    </transition>
    <transition name="shrink">
      <div class="box" v-if="state">
        <div class="title">{{title}}
          <svg class="icon close" v-tap="{methods:close}" aria-hidden="true">
            <use xlink:href="#icon-icon-kuozhan"></use>
          </svg>
        </div>
        <div class="box_con">
         <slot name="content"></slot>
        </div>
        <div class="box_btn" v-if="type===0">
          <slot name="btn"></slot>
        </div>
        <div class="option" v-if="type===1">
          <div v-tap="{methods:close}">取消</div>
          <div v-tap="{methods:success}">确定</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        state: false,
      }
    },
    props: {
      title: {
        type: String,
        default: "提示"
      },
      type:{
        type: Number,
        default: 0
      }
    },
    methods: {
      //选择
      open() {
        this.state = true;
      },
      close() {
        this.state = false;
      },
      success(){
        this.$emit("callback")
      }

    }
  }
</script>
<style lang="scss" scoped>
 

  .box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    background: #fff;
    z-index: 100;
    width: 6.9rem;
    border-radius: 0.1rem;
    overflow: hidden;

    .title {
      height: 0.85rem;
      line-height: 0.85rem;
      text-align: center;
      font-size: 0.36rem;
      border-bottom: 1px solid #f1f1f1;
      position: relative;

      .close {
        height: 0.5rem;
        width: 0.5rem;
        fill: #999999;
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
      }
    }

    .box_con {
      padding: 0.4rem 0.3rem;
      font-size: 0.3rem;
      display: flex;
       justify-content:center;
      align-items: center;
      min-height: 1rem;
      text-align: center;
    }
    .option{
      display: flex;
      border-top: 1px solid #f1f1f1;
      div{
        height: 0.9rem;flex: 1;
        line-height: 0.9rem;text-align: center;
        font-size: 0.36rem;
      }
      div:nth-of-type(1){
        color: #999999;
      }
      div:nth-of-type(2){
        color: #3edd8d;
        border-left: 1px solid #f1f1f1;
      }
    }
    .box_btn{
      padding: 0 0.3rem 0.3rem 0.3rem;
    }
  }
</style>