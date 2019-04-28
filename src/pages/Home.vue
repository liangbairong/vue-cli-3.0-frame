<template>
  <div>
    <div>
      <header class="header">
        <div class="box">
          <div class="box_left">
            <div class="head">
              <img :src="userInfo.wx_userinfo.headimgurl" v-if="userInfo.wx_userinfo" alt>
            </div>
          </div>
          <div class="box_right" v-if="userInfo.wx_userinfo">
            <h3>{{userInfo.name}}</h3>
            <p>{{userInfo.username}}</p>
          </div>
          <div class="box_left" >
            <!-- <h1>{{userInfo.bonus_total_u}}</h1>
             <p>总金额</p> -->
             <h2>{{userInfo.bonus_total_u}}</h2>
              <p>可提现</p>
              <br/>
              <h2>{{userInfo.bonus_available_u}}</h2>
             <p>未到账</p>
         
          </div>
        </div>
      </header>
      <section class="menu">
        <ul>
          <li> 
            <router-link :to="`/goodsshelf?storeid=${userInfo.storeid}`">
              <svg class="icon m_icon" aria-hidden="true">
                <use xlink:href="#icon-icon-mendiankucun"></use>
              </svg>
              我的货架
              <svg class="icon arrows" aria-hidden="true">
                <use xlink:href="#icon-icon-gengduo"></use>
              </svg>
            </router-link>
          </li>
          <li>
            <router-link to="/award">
              <svg class="icon m_icon" aria-hidden="true">
                <use xlink:href="#icon-icon-mendiankucun"></use>
              </svg>
              奖励明细
              <svg class="icon arrows" aria-hidden="true">
                <use xlink:href="#icon-icon-gengduo"></use>
              </svg>
            </router-link>
          </li>
         
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'mint-ui'
  import {
    mapMutations,mapState
  } from "vuex";
  import err from "@/components/err";

  export default {
    name: "home",
    data() {
      return {

      };
    },
    components: {
      err
    },
    computed: {
       ...mapState(["userInfo"])
    },
    activated(){
      this.init();
    },
    created() {
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
  $color: #3edd8d;

  .header {
    background-image: url(/img/header.jpg);
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #fff;
    position: relative;

    .setting {
      width: 40px;
      height: 4px;
      display: block;
      position: absolute;
      left: 30px;
      top: 30px;
      z-index: 3;

      svg {
        fill: #fff;
        width: 40px;
        height: 40px;
      }
    }

    .scan_box {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
    }

    .scan {
      position: absolute;
      right: 30px;
      top: 30px;
      fill: #fff;
      width: 40px;
      height: 40px;
      z-index: 3;
    }
  }

  .box {
    display: flex;
    align-items: center;
    height: 260px;
    padding: 0 30px;
    position: relative;

    .box_left {
      flex: 1;
  color: #fff;
  text-align: center;
      .head {
        width: 120px;
        height: 120px;
        border-radius: 120px;
        background: #fff;
        overflow: hidden;
        z-index: 2;

        img {
          width: 100%;
          height: 100%;
        }
      }
      a{
        color: #e22323;
        margin-top: 20px;
        display: block;

      }
    }

    .box_right {
      flex: 4;
      color: #fff;
      padding: 0 20px;

      h3 {
        font-weight: 400;
        font-size: 30px;
      }

      p {
        opacity: 0.8;
        font-size: 24px;
        margin-top: 10px;
      }
    }
  }

  .order_mana {
    background: #fff;
    border-radius: 10px;
    width: 690px;
    margin: auto;
    box-shadow: 0 10px 20px rgba($color: #000000, $alpha: 0.1);

    h2 {
      line-height: 60px;
      font-size: 26px;
      color: #252525;
      padding: 0 30px;
      font-weight: 400;
    }

    .o_m_list {
      display: flex;
      align-items: center;

      li {
        flex: 1;
        text-align: center;

        padding: 30px 0;

        a {
          display: block;
          font-size: 26px;
          position: relative;

          .order_len {
            font-size: 20px;
            background: red;
            color: #fff;
            border-radius: 50px;
            position: absolute;
            right: 10px;
            top: 0;
            width: 40px;
            height: 40px;
            line-height: 40px;
          }

          .icon {
            width: 50px;
            height: 50px;
          }

          p {
            margin-top: 15px;
          }
        }
      }

      li:nth-last-child(1) a {
        border-left: 1px solid rgba($color: #ccc, $alpha: 0.3);
      }
    }
  }

  .menu {
    background: #fff;

    ul {
      // padding-top: 90px;

      li {
        a {
          padding: 0 30px;
          line-height: 100px;
          height: 100px;
          position: relative;
          display: block;
          color: #252525;
          font-size: 30px;
          border-bottom: 1px solid #f1f1f1;

          .m_icon {
            width: 35px;
            height: 35px;
            margin-right: 20px;
          }
        }
      }

      li:nth-last-child(1) a {
        border-bottom: none;
      }
    }
  }

  .arrows {
    position: absolute;
    right: 30px;
    width: 30px;
    height: 30px;
    fill: #b2b2b2;
    top: 50%;
    transform: translateY(-50%);
  }
</style>