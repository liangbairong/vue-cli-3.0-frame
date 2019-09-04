<!--
 * @Author: 梁栢荣
 * @Date: 2019-09-03 17:01:36
 * @Description: file content
 -->
<template>
  <div>
    <router-link to="/wxlogin">go</router-link>
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
      this.$api.info().then(res=>{
        console.log(res)
      });
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