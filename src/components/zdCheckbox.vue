<template>
     <svg class="icon zdicon"  aria-hidden="true">
          <use  :xlink:href="isShow?'#icon-icon-yixuanze':'#icon-icon-weixuanze'"></use>
    </svg>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    props: {
      isShow: {
        type: Boolean,
        default:false,
      }
    },
 
  }
</script>
<style lang="scss" scoped>
.zdicon{
  width: 0.35rem;height: 0.35rem;
}
</style>
