<template>
    <div  v-bind:class="{'row':true,'vertical':vertical}">
      <div class="left">
        {{title}}
      </div>
      <div class="right">
          <slot />
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        val:"",
      }
    },
    props: {
      title: {
        type: String,
        default:"默认"
      },
      vertical:{
        type:Boolean,
        default:true
      }


    },
    mounted() {

    },
    components: {

    },

    created() {},
    watch: {

    },
    methods: {

    

    }
  }
</script>

<style lang="scss" scoped>
.row{
    min-height: 0.6rem;
    display: flex;
    background: #fff;
    padding: 0.2rem 0.3rem;
    position: relative;
    font-size: 0.28rem;
    
    .left{
        flex: 1;
    }
    .right{
        flex: 4;
    }
}
.vertical{
  align-items: center;
}
</style>
