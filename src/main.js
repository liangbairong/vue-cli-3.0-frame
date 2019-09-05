/*
 * @Author: 梁栢荣
 * @Date: 2019-09-03 17:01:36
 * @Description: file content
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/index'
if(process.env.VUE_APP_TITLE=='mock'){
  require('./mock/index')
}
import 'lib-flexible'
import '@/assets/css/public.scss'
import vueTap from 'v-tap';
Vue.use(vueTap);
import {
  Toast
} from 'mint-ui';

import '@/uilts/resetInput'
import "@/assets/font/iconfont.js"
import api from "@/api/index.js"
import wxConfig from '@/uilts/wxConfig';
const $wx = new wxConfig();
Vue.prototype.$wx = $wx;
import uilts from "@/uilts/uilts.js";
import VueLazyImageLoading from 'vue-lazy-image-loading'
Vue.use(VueLazyImageLoading)
Vue.prototype.$toast = Toast;
Vue.prototype.$uilts = uilts
Vue.prototype.$api = api;

Vue.config.productionTip = false

if (uilts.getQueryString('vconsole')) {
  uilts.loadJs("/js/vconsole.min.js", () => {})
}

Vue.prototype.$CDN_IMG = uilts.$CDN_IMG


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')