<!--
 * @Author: 梁栢荣
 * @Date: 2019-09-03 17:01:36
 * @Description: file content
 -->
<template>
  <div>
  
  </div>
</template>

<script>
  import {
    mapMutations,mapState
  } from "vuex";
  export default {
    name: "home",
    data() {
      return {

      };
    },

    computed: {
       ...mapState('common',["settleInfo"])
    },
    activated(){
      // this.init();
    },
    created() {
      console.log(this.$store.state.common.settleInfo)
      console.log(this.settleInfo)
    },
    methods: {
      ...mapMutations(["getUserInfo"]),
      init() {
        this.getUserInfo()
      },
   

    }
  };
</script>
<style lang="scss" scoped>
 
</style>