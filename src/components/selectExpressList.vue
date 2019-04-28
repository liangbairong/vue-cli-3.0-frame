<template>
  <!-- 选择 -->
  <mt-popup v-model="select.state" position="bottom" class="box">
    <div class="title">
        <span v-tap="{methods:close}">取消</span>
        <span v-tap="{methods:close}">确定</span>
      </div>
      <div v-if="load">
        <mt-picker :slots="select.value" value-key="name" @change="getValue" ></mt-picker>
      </div>
  </mt-popup>
</template>
<script>
  import {
    mapState,
    mapMutations
  } from 'vuex';
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
              //   {
              //   name: "幼儿园",
              //   value: 1
              // },
            ],
            className: 'slot1',
            textAlign: 'center'
          }]
        },
        load:false
      }
    },
    computed: {
      ...mapState(['configDict'])
    },

    components: {
      'mt-popup': Popup,
      'mt-picker': Picker
    },
    created(){
      console.log(this.configDict['express_company'])
      var arr=[]
      for(let i in this.configDict['express_company']){
        arr.push({
          name:this.configDict['express_company'][i],
          value:i
        })
      }
        arr.unshift({
            name:'--请选择快递--',
          })
      this.select.value[0].values=arr
      this.load=true;

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
    line-height: 80px;
    color: #999;
    padding: 0 20px;
    border-bottom: 1PX solid #eee;
    font-size: 30px;
    span:nth-of-type(2) {
      float: right;
      color: #3edd8d;
    }
  }
</style>