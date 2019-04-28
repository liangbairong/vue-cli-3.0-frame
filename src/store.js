import Vue from 'vue'
import Vuex from 'vuex'
// import router from '@/router'
Vue.use(Vuex)

import {
  mySessionstorage,
  myLocalStorage,
  fmoney
} from '@/uilts/uilts';
import api from '@/api'
export default new Vuex.Store({
  state: {
    sessionid: myLocalStorage.get('sessionid') || '',
    userInfo: myLocalStorage.get('userInfo') || {},
    configInfo: myLocalStorage.get("configInfo") || {}, //info配置
    configDict: myLocalStorage.get("configDict") || {}
  },
  mutations: {
    async getUserInfo(state, callback) {
      var res = await api.user.info();
      if (res.errcode === 0) {
        let info = res.data;
        if (info.wx_userinfo) {
          info.wx_userinfo = JSON.parse(info.wx_userinfo)
        }
        info.bonus_total_u=fmoney(info.bonus_total)
        info.bonus_available_u=fmoney(info.bonus_available/100);
        myLocalStorage.set('userInfo', info)
        state.userInfo = info;
        if (callback) callback(info);
      }
    },
    saveSessionid(state, data) {
      state.sessionid = data
      myLocalStorage.set('sessionid', data)
    },

    // 获取配置信息
    getConfigInfo(state) {
      var isConfigInfo = myLocalStorage.get("isConfigInfo")
      if (isConfigInfo) {
        return
      }
      api.common.config_info().then(res => {
        if (res.errcode === 0) {
          state.configInfo = res.data;
          myLocalStorage.set("isConfigInfo", res.data.checksum, 60 * 10); //10分钟更新一次
          myLocalStorage.set("configInfo", res.data)
        }
      });
    },
    //获取字典翻译
    getConfigDict(state) {
      var isConfigDict = myLocalStorage.get("isConfigDict")
      if (isConfigDict) {
        return
      }
      api.common.config_dict().then(res => {
        if (res.errcode === 0) {
          state.configDict = res.data;
          myLocalStorage.set("isConfigDict", res.data.checksum, 60 * 10)
          myLocalStorage.set("configDict", res.data) 
        }
      });
    },
  





  },
  actions: {

  }
})