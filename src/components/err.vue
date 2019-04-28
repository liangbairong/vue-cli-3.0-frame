<template>
  <div class="err_box">
    <div>
      <img src="/img/ts.jpg" alt="">
      <h1>
        温馨提示
      </h1>
      <p>{{content}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      content: {
        type: String,
        default: "提示"
      }
    },
    methods: {

    }
  }
</script>
<style lang="scss" scoped>
  .err_box {

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    h1 {
      font-size: 0.30rem;
      font-weight: 400;color: #999;
      margin-top: 0.3rem;
    }

    img {
      width: 2.45rem;
    }

    p {
      color: #999;
      margin-top: 0.2rem;
      font-size: 0.26rem;
        padding-bottom: 1rem;
    }
  }

  .err {
    width: 2rem;
    height: 2rem;
    fill: #3edd8d;
  }
</style>