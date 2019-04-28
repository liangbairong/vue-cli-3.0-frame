<template>
  <div class="login-warp">
    <div class="form">
      <div class="logo_box">
        <img src="/img/logo.png" alt="" class="logo">
        <h2>合作商账号绑定</h2>
      </div>
      <div class="line-1">
        <input type="text" maxlength="11" placeholder="请输入账号" v-resetInput v-model="form.tel" class="input input-tel">
      </div>
      <div class="line-2">
        <input type="text" maxlength="20" placeholder="请输入密码" v-resetInput v-model="form.password"
          class="input input-tel">
      </div>
      <button v-tap="{methods:accountBind}" class="sub_btn bindbtn" :disabled="!subState">确 定</button>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5'
  export default {
    data() {
      return {
        form: {
          tel: "",
          password: ""
        },
        subState: true
      };
    },
    methods: {

      //验证手机
      verPhone(isShow) {
        var phone = this.form.tel;
        if (!phone) {
          if (isShow) {
            this.$toast({
              message: "手机号不能为空",
              position: "center",
              duration: 1000
            });
          }
          return true;
        }
        if (!this.form.password) {
          if (isShow) {
            this.$toast({
              message: "密码不能为空",
              position: "center",
              duration: 1000
            });
          }
          return true;
        }
        //手机号正则
        // var phoneReg = /(^1[2|3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
        // if (!phoneReg.test(phone)) {
        //   if (isShow) {
        //     this.$toast({
        //       message: "手机号格式不正确",
        //       position: "center",
        //       duration: 1000
        //     });
        //   }
        //   return true;
        // }
        return false;
      },
      accountBind() {
        if (this.verPhone(true)) {
          return;
        }
        this.subState = false;
        this.$api.common.account_bind(this.form.tel, md5(this.form.password))
          .then(res => {
            if (res.errcode == 0) {
              this.$toast({
                message: "绑定成功",
                position: "center",
                duration: 1000
              });
              this.$store.commit('getUserInfo', () => {
                this.$router.replace('/home');
              });
            } else {
              this.subState = true;
            }
          });
      },
    },
    created() {}
  };
</script>

<style lang="scss" scoped>
  .login-warp {
    height: 100%;
    width: 100%;
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;

    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .logo_box {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      display: block;
      width: 125px;
      background-color: #fff;
      border-radius: 200px;
      padding: 10px;
      margin: auto;
      margin-bottom: 20px;
    }


    .form {

      width: 660px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 20px;

      .input {
        border-radius: 5px;
        height: 100px;
        padding: 0 20px;
        outline: none;
        font-size: 30px;
        border: none;
        box-sizing: border-box;
      }

      .input-tel {
        width: 100%;
        box-sizing: border-box;
      }

      .line-1 {
        border-bottom: 1PX solid #eee;
        width: 100%;
        align-items: center;
      }

      .line-2 {
        width: 100%;
        display: flex;
        border-bottom: 1PX solid #eee;
        align-items: center;

        .input-checkcode {
          flex: 1;
        }

        .checkcode-button {
          height: 10px;
          line-height: 10px;
          color: #666;
          flex: 1;
          text-align: center;
          font-size: 24px;

          position: relative;


        }

        .checkcode-button:after {
          content: '';
          display: block;
          width: 1px;
          height: 60px;
          position: absolute;
          left: 0;
          top: 20px;
          background: #3edd8d;
        }
      }


    }
  }

  .bindbtn {
    margin-top: 80px;
  }
</style>