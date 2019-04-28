<template>
  <div class="main">
    <header class="header">
      <div class="header_tit">我获得的现金</div>
      <ul class="header_box" v-if="userInfo">
        <li>
          <div>{{userInfo.bonus_total_u}}元</div>
          <p>可提现</p>
        </li>
        <li>
          <div>{{userInfo.bonus_available_u}}元</div>
          <p>未到账</p>
        </li>
      </ul>
      <div class="header_btn" v-if="userInfo.bonus_fetch && userInfo.bonus_fetch.agentid">正在提现中</div>
      <div class="header_btn" v-else v-tap="{methods:deposit}">立即提现</div>
    </header>
    <div class="title">奖励明细</div>
    <div class="box" :style="`height:${BOXH}px`">
      <load-more @loadMove="loadMove">
        <div>
          <div class="con clearfix">
            <div class="line" v-for="(item,i) in list" :key="i">
              <div class="line_top">
                <div class="lt_left">
                  <span v-if="item.type==1">用户消费</span>
                </div>
                <div class="lt_right">
                  <div class="lt_state">
                    <span v-if="item.status==0">未到账</span>
                    <span v-if="item.status==1">已到账</span>
                    <span v-if="item.status==2">已撤销</span>
                  </div>
                </div>
              </div>
              <div class="line_center">
                <div class="line_center_right">
                  <h2>{{item.remark}}</h2>
                  <p>金额： ￥{{item.bonus_u}}</p>
                  <p v-if="item.ymdhms0">下单时间：{{item.ymdhms0}}</p>
                  <p v-if="item.ymdhms1">预计到账时间：{{item.ymdhms1}}</p>
                  <p v-if="item.ymdhms2">实际到账时间：{{item.ymdhms2}}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 无订单 -->
          <div class="no_order" v-if="list.length===0">
            <img src="/img/noorder.png">
            <p>暂无数据</p>
          </div>
        </div>
      </load-more>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from "vuex";
  import {
    MessageBox
  } from "mint-ui";
  import {
    fmoney
  } from "@/uilts/uilts";

  import loadMore from "@/components/loadMore";
  export default {
    data() {
      return {
        list: [], //数组
        page: 1,
        isLoad: true,

        BOXH: 0
      };
    },
    components: {
      loadMore
    },
    computed: {
      ...mapState(["userInfo"])
    },
    created() {
      var type = this.$route.query.type;

      this.init();
    },
    mounted() {
      this.costHeight();
    },
    methods: {
      ...mapMutations(["getUserInfo"]),
      init() {
        this.page = 1;
        this.list = [];
        this.isLoad = true;
        this.getList();
      },
      // 计算高度
      costHeight() {
        let H = document.body.clientHeight;
        var h = document.querySelector(".header").clientHeight;
        var t = document.querySelector(".title").clientHeight;
        this.BOXH = H - h - t - 5;
        console.log(this.BOXH);
      },
      async getList() {
        var info = await this.$api.user.bonus_detail(this.page);
        if (info.errcode === 0) {
          info = info.data.data;
          if (info.length === 0) {
            this.isLoad = false;
            return;
          }
          info = info.map(item => {
            item.bonus_u = fmoney(item.bonus / 100);
            return item;
          });

          this.list.push.apply(this.list, info);
        }
      },

      loadMove() {
        if (!this.isLoad) return;
        this.page++;
        this.getList();
      },

      deposit() {
        MessageBox.confirm("是否确认奖励申请提现?", "提示").then(
          () => {
            this.$api.user.bonus_fetch().then(res => {
              if (res.errcode === 0) {
                this.getUserInfo(() => {
                  this.$toast({
                    message: "提现成功",
                    duration: 1000
                  });
                  this.init();
                });
              }
            });
          },
          () => {
            //取消
          }
        );
      }
    }
  };
</script>

<style lang="scss" scoped>
  .main {
    background: #fff !important;
  }

  .header {
    background-image: url(/img/header.jpg);
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-color: #fff;
    position: relative;
    height: 450px;

    text-align: center;
    color: #fff;

    .header_tit {
      font-size: 36px;
      overflow: hidden;
      padding-top: 40px;
    }

    .header_box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;

      li {
        flex: 1;
        font-size: 30px;
        position: relative;

        div {
          font-size: 42px;
        }

        &:after {
          content: "";
          display: block;
          width: 1px;
          height: 0.6px;
          background: #f1f1f1;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        &:last-of-type(1) {
          display: none;
        }
      }
    }

    .header_btn {
      width: 250px;
      margin: auto;
      line-height: 80px;
      font-size: 34px;
      border-radius: 80px;
      border: 1px solid #fff;
      box-sizing: border-box;
      color: #fff;
    }
  }

  .box {
    position: relative;
    // height: 400px;
    // background: #f1f1f1;
  }

  .no_order {
    padding: 40px 0;
    text-align: center;

    img {
      width: 250px;
    }

    p {
      color: #999;
    }
  }

  .title {
    line-height: 80px;
    font-size: 30px;
    padding: 0 20px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  }

  .line {
    background: #fff;
    // margin-bottom: 15px;
    border-bottom: 15px solid #f1f1f1;

    .line_top {
      height: 80px;
      display: flex;
      align-items: center;
      padding: 0 30px;
      border-bottom: 1px solid #f1f1f1;

      .lt_left {
        flex: 3;
        color: #999999;
        font-size: 24px;
      }

      .lt_right {
        flex: 1;
        text-align: right;

        .lt_state {
          // border: 1px solid #3edd8d;
          display: inline-block;
          position: relative;
          height: 50px;
          line-height: 50px;
          font-size: 22px;
          border-radius: 10px;
          color: #3edd8d;
        }
      }
    }

    .line_center {
      padding: 40px 30px;
      border-bottom: 1px solid #f1f1f1;
      display: flex;

      .line_center_left {
        flex: 1;

        img {
          width: 200px;
          height: 200px;
        }
      }

      .line_center_right {
        flex: 2;

        h2 {
          font-weight: 400;
          color: #252525;
          font-size: 30px;
          padding-bottom: 10px;
        }

        p {
          font-size: 26px;
          color: #999999;
          margin-top: 5px;
        }
      }
    }

    .line_bottom {
      display: flex;
      padding: 0 30px;
      height: 80px;
      align-items: center;

      .lb_left {
        flex: 1;
        font-size: 24px;
        color: #999999;
      }

      .lb_right {
        flex: 1;
        text-align: right;
      }
    }
  }
</style>