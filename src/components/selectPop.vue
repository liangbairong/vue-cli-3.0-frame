<template>
  <!-- 选择 -->
  <mt-popup v-model="select.state" position="bottom" class="box">
    <div class="dmgs">
      <div class="title">
        <span v-tap="{methods:close}">取消</span>
        <span v-tap="{methods:close}">确定</span>
      </div>
      <mt-picker :slots="select.value" value-key="name" @change="getValue"></mt-picker>
    </div>
  </mt-popup>
</template>
<script>
  import {
    Popup,
    Picker
  } from 'mint-ui';
  export default {
    data() {
      return {
        select: {
          state: false,
          value: [{
            flex: 1,
            values: [
                {
                name: "幼儿园",
                value: 1
              },
              {
                name: "培训机构",
                value: 1
              }
            ],
            className: 'slot1',
            textAlign: 'center'
          }]
        },
      }
    },

    components: {
      'mt-popup': Popup,
      'mt-picker': Picker
    },
    methods: {
      //选择
      open() {
        this.select.state = true;
      },
      close() {
        this.select.state = false;
      },
      getValue(picker, values) {
        this.$emit("getValue",values[0])
      },
    }
  }
</script>
<style lang="scss" scoped>
  .box {
    width: 100%;
  }
  .title {
    line-height: 0.8rem;
    color: #999;
    padding: 0 0.2rem;
    border-bottom: 1px solid #eee;

    span:nth-of-type(2) {
      float: right;
      color: #3edd8d;
    }
  }
</style>