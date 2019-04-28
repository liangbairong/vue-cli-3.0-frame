<template>
  <div v-bind:class="{'add_img':true,'add_img_max':type}">
    <div v-if="card" class="relupimg" :style="'background-image: url('+card+')'"></div>
    <svg class="icon " aria-hidden="true" v-if="!card && !uploading">
      <use xlink:href="#icon-icon-tianjia"></use>
    </svg>
    <img src="/img/loading.gif" class="loading" v-if="uploading" alt="">
    <input ref="file" type="file" accept="image/*" @change="onFileChange">
  </div>
</template>
<script>
  import axios from 'axios'
  import lrz from 'lrz';
  export default {
    name: 'ImageUploader',
    data() {
      return {
        uploading: false,
        card: ''
      }
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      type: {
        type: Boolean,
        default: false
      },
      orderid: {
        type: String,
        default: ''
      },
    },
    methods: {
      init() {
        this.uploading = false;
        this.card = '';
        this.$refs.file.value = '';
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files
        if (files.length == 0) {
          return;
        }
        if (files.length > 1) {
          this.$toast({
            message: '限制上传1张',
            position: 'center',
            duration: 1500
          });
          return;
        }

        lrz(files[0], {
          width: 750
        }).then(rst => {
          this.uploading = true
          // if (this.type) {
          // } else {
          //   this.card = rst.base64;
          // }
          // this.uploading = false;
          // this.$emit("uploaderSucc", {
          //   imageid: "res.data.data.imageid",
          //   name: this.name,
          //   base64: rst.base64
          // });
          // return;

          var $http = axios.create({
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          $http.post(
            `${process.env.UPLOADFILE}/order_damaged/${this.$uilts.myLocalStorage.get("peerid")}/${this.$uilts.myLocalStorage.get("sessionid")}`,
            rst.formData).then((res) => {
            if (res.data.errcode == 0) {
              if (this.type) {

              } else {
                this.card = rst.base64;
              }
              if (this.name) {
                this.$emit("uploaderSucc", {
                  filepath:res.data.data.filepath,
                  name: this.name,
                  base64: rst.base64
                });

              } else {
                this.$emit("uploaderSucc", res.data.data.imageid);
              }

            } else {
              this.$emit("uploaderErr");
              this.$toast({
                message: res.data.errinfo,
                position: 'center',
                duration: 1500
              });
              this.init();
            }
            this.uploading = false
          }).catch((error) => {
            this.init();
            this.uploading = false;
            this.$toast({
              message: error,
              position: 'center',
              duration: 1500
            });
          });



        }).catch(function (err) {
          this.init();
          this.uploading = false
        })
      },
    }
  }
</script>
<style lang="scss" scoped>
  .relupimg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-position: center;
    background-size: cover;

  }

  .loading {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 0.4rem;
    height: 0.4rem;

  }

  .add_img {
    background: #f3f3f3;
    width: 1.2rem;
    height: 1.2rem;
    position: relative;
    display: inline-block;

    svg {
      fill: #c6c6c6;
      width: 0.5rem;
      height: 0.5rem;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }

    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  .add_img_max {
    width: 2rem;
    height: 2rem;
    margin-top: 0.2rem;
  }
</style>