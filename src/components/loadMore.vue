<template>
  <div class="scroll" @scroll="scroll">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        topNum:0,
      }
    },
    props: {
  
    },
    activated(){
      document.querySelector('.scroll').scrollTop=this.topNum
    },
    created(){
  
    },
    methods: {
      scroll(e) {
        var wholeHeight = e.srcElement.scrollHeight;
        var scrollTop = e.srcElement.scrollTop;
        var divHeight = e.srcElement.clientHeight;

        this.topNum=scrollTop
        if (divHeight + scrollTop >= wholeHeight) {
          this.$emit("loadMove");
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .scroll {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>