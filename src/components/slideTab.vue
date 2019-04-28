<template>
  <div>
    <div v-bind:class="{'menu':true,'menu_fixed':fixed}">
      <ul>
        <li v-for="(item,i) in list" :key="i" :style="'width:'+w+'px'" v-tap="{ methods:cutMenu , index : i}" v-bind:class="{'menu_on': item.state}">
          {{type==1?item.value:item.name}}
        </li>
        <div class="menu_bot" :style="'transform:translateX('+sumDist+'px);width:'+block.w+'px;left:'+block.left+'px;'"></div>
      </ul>
    </div>
    <div class="menu_h" v-if="fixed"></div>
    <div class="menu_con">
      <slot></slot>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        w: 0,
        sumDist: 0,
        block: {
          w: 0,
          left: 0
        }
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
      },
      type: {
        type: Number,
        default: 0
      },
      fixed: {
        type: Boolean,
        default: false
      },
      menuIndex: {
        // type:Number,
        default: 0
      }
    },
    created() {
      this.w = window.innerWidth / this.columns;
      this.block.w = this.w * 0.6;
      this.block.left = this.w * 0.2;

      this.init();
    },
    watch:{
      menuIndex(){
        this.init();
      }
    },

    methods: {
      init() {
        var index = this.menuIndex
        this.sumDist = index * this.w;
        this.list.forEach(item => {
          item.state = false
        });
        this.list[index].state = true;
      },
      cutMenu(param) {
        var index = param.index;
        this.sumDist = index * this.w;
        this.list.forEach(item => {
          item.state = false
        });
        this.list[index].state = true;
        this.$emit('cutMenu', index);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu_fixed {
    position: fixed !important;
    left: 0;
    top: 0;
    width: 100%;
    transform: translate3d()
  }

  .menu_h {
    height: 90px;
  }

  .menu {
    height: 90px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    background: #fff;
    position: relative;
    z-index: 3;
    ul {
      position: relative;
      li {
        height: 90px;
        line-height: 90px;
        text-align: center;
        position: relative;
        box-sizing: border-box;
        transition: all 0.3s;
        display: inline-block;
         touch-action: none;
      }
      .menu_on {
        color: #3edd8d !important;
      }
    }


  }



  .menu_bot {
    display: block;
    position: absolute;
    top: 83px;
    height: 5px;
    background: #3edd8d;
    transition: all 0.3s;
  }
</style>