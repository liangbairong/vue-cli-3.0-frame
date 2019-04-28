<template>
  <div>
    <transition name="bgAnimation">
      <div class="bg" v-if="popState" @touchmove.prevent></div>
    </transition>
    <transition name="configAnimation">
      <div class="pops" v-if="popState">
        <div class="pops_tit">
          <div v-tap="{methods:cancel}">取消</div>
          <div v-tap="{methods:confirm}">确定</div>
        </div>
        <div class="site_box">
          <ul class="site_box_top clearfix">
            <li v-for="(item,i) in multiArray" :class="{'action':multiIndex==i}" v-tap="{methods:metacut,index:i}" :key="i"
              v-if="item.state">{{item.pitch.name}}</li>
          </ul>
          <div class="site_box_content">
            <ul>
              <li v-for="(item,i) in multiList" v-tap="{methods:select,areaid:item.areaid,name:item.name}">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import {
    myLocalStorage,
  } from '@/uilts/uilts'
  export default {
    data() {
      return {
        popState: false,
        multiList: [],
        multiIndex: 0,
        multiArray: [{
            state: true,
            pitch: {
              name: "请选择",
              areaid: ''
            },
          },
          {
            state: false,
            pitch: {
              name: "请选择",
              areaid: ''
            },
          },
          {
            state: false,
            pitch: {
              name: "请选择",
              areaid: ''
            },
          },
          {
            state: false,
            pitch: {
              name: "请选择",
              areaid: ''
            },
          }
        ]
      }
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      },
      columns: {
        type: Number,
        default: 4
      }
    },
    created() {

    },

    methods: {
      init() {
        this.multiIndex = 0;
        this.multiArray = [{
            state: true,
            pitch: {
              name: "请选择",
              areaid: ''
            },
          },
          {
            state: false,
            pitch: {
              name: "请选择",
              areaid: ''
            },
          },
          {
            state: false,
            pitch: {
              name: "请选择",
              areaid: ''
            },
          },
          {
            state: false,
            pitch: {
              name: "请选择",
              areaid: ''
            },
          }
        ];
        var province_data = myLocalStorage.get("province_data");
        if (province_data) {
          this.multiList = province_data;
        } else {
          this.$api.getAreaList().then(res => {
            if (res.errcode === 0) {
              this.multiList = res.data;
              myLocalStorage.set("province_data", res.data, 999999999);
            }
          })
        }

      },
      //返回上一个选择项
      metacut(param) {
        var index = param.index;
        this.multiIndex = index;
        this.multiArray.forEach((item, i) => {
          item.state = false;
          if (i <= index) {
            item.state = true
          }
        })
        this.lastSelect();
      },
      lastSelect() {

        if (this.multiIndex === 3) {
          return;
        }
        var data = {}
        if (this.multiIndex === 1) {
          data = {
            provinceid: this.multiArray[0].pitch.areaid,
          }
        }
        if (this.multiIndex === 2) {
          data = {
            provinceid: this.multiArray[0].pitch.areaid,
            cityid: this.multiArray[1].pitch.areaid,
          }
        }

        this.$api.getAreaList(data).then(res => {
          if (res.errcode === 0) {
            this.public(res.data)
          }
        })
      },
      //正常流程
      select(param) {
        var sdata = this.multiArray[this.multiIndex].pitch;
        sdata.areaid = param.areaid;
        sdata.name = param.name;

        if (this.multiIndex === 3) {
          setTimeout(() => {
            this.confirm();
          }, 200);
          return;
        }
        var data = {}
        if (this.multiIndex === 0) {
          data = {
            provinceid: this.multiArray[0].pitch.areaid,
          }
        }
        if (this.multiIndex === 1) {
          data = {
            provinceid: this.multiArray[0].pitch.areaid,
            cityid: this.multiArray[1].pitch.areaid,
          }
        }
        if (this.multiIndex === 2) {
          data = {
            provinceid: this.multiArray[0].pitch.areaid,
            cityid: this.multiArray[1].pitch.areaid,
            countyid: this.multiArray[2].pitch.areaid,
          }
        }
        this.$api.getAreaList(data).then(res => {
          if (res.errcode === 0) {
            this.public(res.data, this.addIndex())
          }
        })
      },
      addIndex() {
        this.multiIndex++;
      },
      public(res, callback) {
        if (res) {
          if (callback) callback();
          this.multiList = res;
          this.multiArray[this.multiIndex].state = true;
        }
      },
      confirm() {
        this.popState = false;
        if (this.multiIndex === 3) {
          var data = [];
          this.multiArray.forEach(item => {
            data.push(item.pitch)
          })
          this.$emit("callback", data)
        }
      },
      cancel() {
        this.popState = false;
      },
      showPop() {
        this.popState = true;
        this.init();
        var inp = document.querySelectorAll("input");
        inp.forEach(item => {
          item.blur();
        })
      }
    }
  }
</script>


<style lang="scss" scoped>
  .pops {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    z-index: 99;

    .pops_tit {
      height: 0.8rem;
      line-height: 0.8rem;
      display: flex;
      padding: 0 0.3rem;
      border-bottom: 1px solid #eee;

      div {
        flex: 1;
        color: #999;
        text-align: left;
      }

      div:nth-of-type(2) {
        text-align: right;
        color: #3edd8d;
      }
    }
  }

  .site_box {
    text-align: left;
    font-size: 0.26rem;
    user-select: none;
  }

  .site_box_top {
    border-bottom: 1px solid #eee;
    padding: 0 0.2rem;
    line-height: 0.8rem;

    li {
      float: left;
      margin-right: 0.2rem;
      padding: 0 0.1rem;
    }

    .action {
      color: #3edd8d;
      border-bottom: 2px solid #3edd8d;
    }

  }

  .site_box_content {
    padding: 0.2rem 0;
    height: 6rem;
    overflow-y: auto;


    li {
      line-height: 0.8rem;
      padding: 0 0.4rem;
      transition: background 0.1s;
      transition: padding 0.3s;

    }

    li:active {
      background: #3edd8d;
      color: #fff;
      padding: 0 0.7rem;
    }
  }
</style>