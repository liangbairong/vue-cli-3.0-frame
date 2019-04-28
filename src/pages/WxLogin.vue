<template>
  <div>
  </div>
</template>

<script>
  export default {
    name: "wxlogin",
    data() {
      return {};
    },
    components: {},
    created() {
      //微信授权
      var code = this.$route.query.code
      if (code) {
        this.$api.common.login(code).then(res => {
          if (res.errcode === 0) {
            this.$store.commit('saveSessionid', res.data.sessionid);
            this.$store.commit('getUserInfo', () => {
              window.location.replace('./home')
            });
          }
        })
      } else {
        if (this.$store.state.sessionid) {
          this.$router.replace("/home");
          return;
        }
        let redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = process.env.VUE_APP_WXBASELOGIN+'/wxlogin.html?callbackurl=' + redirectUrl;

      }
    },
    methods: {
    
    }
  };
</script>
<style lang="scss" scoped>
</style>