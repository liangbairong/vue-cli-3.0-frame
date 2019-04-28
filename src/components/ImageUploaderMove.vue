<template>
  <div class="up_box">
    <h2>{{title}}</h2>
    <div class="up_box_bottom">
      <div class="minupdate" v-for="(item,index) in list" :style="'background-image: url('+item.base64+')'">
        <svg class="icon " aria-hidden="true" v-tap="{methods:deletes,index:index}">
          <use xlink:href="#icon-icon-guanbi2"></use>
        </svg>
      </div>
      <image-uploader v-if="list.length<10" :name="'imgs'+list.length" :type="true" @uploaderSucc="uploaderSucc"
        @uploaderErr="uploaderErr"></image-uploader>
    </div>
  </div>
</template>
<script>
  import ImageUploader from "@/components/ImageUploader"
  export default {
    data() {
      return {
        list: []
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },

    },
    components: {
      ImageUploader
    },
    created() {
      this.init();
    },
    methods: {
      init(){
         this.list = [];
      },
      // 上传
      uploaderSucc(param) {
        // this.$set(this.list, param.name, param.imageid);
        this.list.push(param);
       
        this.$emit("callback", this.list);
      },
      uploaderErr() {

      },

      deletes(param){
        this.list.splice(param.index, 1); 

        console.log(this.list)
        this.$emit("callback", this.list);
      }



    }
  }
</script>
<style lang="scss" scoped>
  .up_box {
    background: #fff;
    margin-top: 0.15rem;

    h2 {
      font-size: 0.34rem;
      line-height: 0.9rem;
      border-bottom: 1px solid #f1f1f1;
      font-weight: 400;
      padding: 0 0.3rem;
    }
  }

  .up_box_bottom {
    padding:0.1rem  0.3rem 0.3rem 0.3rem;
  }

  .minupdate {
    display: inline-block;
    margin-right: 0.3rem;
    background-position: center;
    background-size: cover;
    width: 2rem;
    height: 2rem;
    position: relative;
    margin-top: 0.2rem;;

    .icon {
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      right: -0.2rem;
      top: -0.2rem;
      fill: #7f7f7f;
      opacity: 0.6;
    }
  }
</style>