<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
  import {
    mapMutations,
    mapState
  } from "vuex";
  export default {
    name: "app",
    data() {
      return {
        transitionName: '',
        topNum: 0
      };
    },
    computed: {
      ...mapState(['sessionid'])
    },
    created() {
      var _this = this;
      window.addEventListener("scroll", debounce(realFunc, 100));
      //优化滚动效果防抖动
      function debounce(fn, time) {
        var timeout = null;
        return function () {
          clearTimeout(timeout);
          timeout = setTimeout(fn, time);
        };
      }

      function realFunc() {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        _this.topNum = scrollTop;
      }

      if (window.location.href.indexOf('bindaccount') == -1) {
        console.log(window.location.href)
        if (this.sessionid) {
          this.getUserInfo()
        }
      }



      this.getConfigDict();
      this.getConfigInfo();

    },
    watch: {
      $route(to, from) {
        window.document.title = to.meta.title || "天天奖堂";
        from.meta.topNum = this.topNum
        if (to.meta.rank > from.meta.rank || !from.name) {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 50);
        } else {
          setTimeout(() => {
            window.scrollTo(0, to.meta.topNum);
          }, 50);
        }
        if (to.name != 'wxlogin') {
          if (!this.sessionid) {
            this.$router.replace("/wxLogin");
          }
        }
        // console.log(from);
        // console.log(to);

        this.$wx.init(to, {})
      }
    },
    methods: {
      ...mapMutations(['getUserInfo', 'getConfigInfo', 'getConfigDict']),

    }
  };
</script>

<style lang="scss">

</style>