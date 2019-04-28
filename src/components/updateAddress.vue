<template>
  <div>
    <transition name="configAnimation">
      <div class="addressbox" @touchmove.prevent v-if="addressState">
        <div class="site_box">
          <div class="sib_row">
            <div class="sbr_l">收货人</div>
            <div class="sbr_r">
              <input placeholder="请填写真实姓名" class="sib_input" v-on:input="verSubmit" v-model="name" />
            </div>
          </div>
          <div class="sib_row">
            <div class="sbr_l">联系方式</div>
            <div class="sbr_r">
              <input placeholder="请填写电话号码" type="tel" v-on:input="verSubmit" maxlength="11" v-model="phone" class="sib_input" />
            </div>
          </div>
        </div>

        <div class="site_box" style="margin-top:0.20rem;">
          <div class="sib_row">
            <div class="sbr_l">现居地址</div>
            <div class="sbr_r">
              <div class="sbr_boxs" v-tap="{methods:showSite}">
                <span v-if="addressText">{{addressText}}</span>
                <span v-else style="color:#ccc;">请选择地址</span>
              </div>
              <img src="/img/det_jt.png" class="sbr_jts" />
            </div>
          </div>
          <div class="sib_row">
            <div class="sbr_l">详细地址</div>
            <div class="sbr_r">
              <input placeholder="例如：1号楼1单元101" v-on:input="verSubmit" class="sib_input" v-model="place" />
            </div>
          </div>
        </div>
        <div class="sub_box">
          <button type="default" v-tap="{methods:formSubmit}" :disabled="!subClick" class="sub_btn "> 确认 </button>
          <button type="default" v-tap="{methods:hide}" class="sub_btn back_btn"> 返回 </button>
        </div>
      </div>
    </transition>
    <site ref="site" @callback="getSite"></site>
  </div>
</template>

<script>
  import {
    Toast
  } from 'mint-ui';
  import site from '@/components/site';
  export default {
    data() {
      return {
        addressState: false,
        name: "",
        phone: "",
        address: null,
        addressText: "",
        place: "",
        subClick: false,
        addressid: "", //有值是修改
      }
    },
    props: {
      addressPlac: {
        type: Object,
        default () {
          return null
        }
      }
    },
    components: {
      site,
    },

    methods: {
      init() {
        if (this.addressPlac && this.addressPlac.addressid) {
          this.addressText =
            `${this.addressPlac.provinceName} ${this.addressPlac.cityName} ${this.addressPlac.countyName} ${this.addressPlac.townName}`
          this.addressid = this.addressPlac.addressid;
          this.name = this.addressPlac.realname;
          this.phone = this.addressPlac.tel;
          this.place = this.addressPlac.place;
          this.address = [{
              areaid: this.addressPlac.province,
              name: this.addressPlac.provinceName
            },
            {
              areaid: this.addressPlac.city,
              name: this.addressPlac.cityName
            },
            {
              areaid: this.addressPlac.county,
              name: this.addressPlac.countyName
            },
            {
              areaid: this.addressPlac.town,
              name: this.addressPlac.townName
            },
          ]
        } else {
          this.addressText = '';
          this.addressid = '';
          this.name = '';
          this.phone = '';
          this.place = '';
          this.address = null;
        }
        this.verSubmit();
      },
      show() {
        this.init();
        this.addressState = true;
      },
      hide() {
        this.addressState = false;
      },
      //获取地址
      getSite(site) {
        this.address = site;
        this.addressText =
          `${this.address[0].name} ${this.address[1].name} ${this.address[2].name} ${this.address[3].name}`
        this.verSubmit();
      },
      //显示地址
      showSite() {
        this.$refs.site.showPop()
      },
      //验证数据
      verSubmit() {
        this.subClick = false;
        if (!this.name || !this.phone || !this.address || !this.place) {
          return;
        }
        var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        if (!phoneReg.test(this.phone)) {
          return;
        }
        this.subClick = true;
      },
      formSubmit() {
        this.subClick = false;
        this.$api.postAddAddressApi({
          realname: this.name,
          tel: this.phone,
          province: this.address[0].areaid,
          city: this.address[1].areaid,
          county: this.address[2].areaid,
          town: this.address[3].areaid,
          place: this.place,
          addressid: this.addressid, //有值是修改
        }).then(res => {
          if (res) {
            Toast({
              message: "提交成功",
              duration: 1000
            });
            this.hide();
            this.$emit("submit")
          } else {
              this.subClick = true;
          }
          
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .addressbox {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #f7f7f7;
    z-index: 97;
  }

  .site_box {
    background: #fff;
    padding: 0 0.20rem;

  }

  .sib_row {
    display: flex;
    font-size: 0.32rem;
    height: 1.0rem;
    line-height: 1.0rem;
    border-bottom: 1px solid #eee;
  }

  .site_box .sib_row:nth-last-child(1) {
    border-bottom: none;
  }

  .sib_input {
    width: 100%;
    vertical-align: top;
    height: 1.0rem;
    font-size: 0.32rem;
    display: inline-block;
    border: none;
  }

  .sib_input::-webkit-input-placeholder {
    color: #ccc !important;
  }

  .sbr_l {
    flex: 1;
    padding: 0 0.1rem;
    box-sizing: border-box;
  }

  .sbr_r {
    flex: 3;
    overflow: hidden;
    position: relative;
  }

  .sbr_boxs {
    width: 4.8rem;
    text-align: right;
  }

  .sbr_jts {
    width: 0.16rem;
    height: 0.27rem;
    position: absolute;
    right: 0;
    top: 0.35rem;
  }

  .sub_box {
    padding: 0 0.3rem;
    margin-top: 0.6rem;
  }

  .back_btn {
    background: #fff !important;
    color: #999 !important;
    border: 1px solid #eee;
    margin-top: 0.4rem;
  }
</style>