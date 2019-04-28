/**
 * 
 * 
 */
import http from './http'

import {
  myLocalStorage
} from '@/uilts/uilts'

export default {
 
  common: {
    // 获取ticket wx配置
    ticket(url) {
      return http({
        url: process.env.VUE_APP_ROOT + '/common/ticket',
        data: {
          url
        }
      })
    },
    //获取字典
    config_dict() {
      return http({
        url: process.env.VUE_APP_ROOT + '/common/config_dict',
        data: {
          checksum: ''
        }
      })
    },
    config_info() {
      return http({
        url: process.env.VUE_APP_ROOT + '/common/config_info',
        data: {
          checksum: ''
        }
      })
    },
    //获取地址字典
    area_dict(province) {
      var siteDict = myLocalStorage.get("site_dict_" + province);
      if (siteDict) {
        return new Promise((resolve, ) => {
          resolve(siteDict)
        });
      }
      return http({
        url: process.env.VUE_APP_ROOT + '/common/area_dict',
        data: {
          province
        }
      }).then(res => {
        if (res.errcode === 0) {
          myLocalStorage.set("site_dict_" + province, res.data, 999999999);
          return res.data;
        }
      })
    },
    //微信登录
    login(code) {
      return http({
        url: process.env.VUE_APP_ROOT + '/common/login',
        method: "post",
        loading: true,
        data: {
          code
        }
      });
    },

    //绑定账号
    account_bind(username, password) {
      return http({
        url: process.env.VUE_APP_ROOT + '/common/account_bind',
        method: "post",
        loading: true,
        data: {
          username,
          password
        }
      });
    },
    area_list() {
      return http({
        url: process.env.VUE_APP_ROOT + '/common/area_list',
        data: {

        }
      })
    },

  },
  store:{
    product_list(storeid) {
      return http({
        url: process.env.VUE_APP_ROOT + '/store/product_list',
        data:{
          storeid
        }
      })
    },
    info(storeid) {
      return http({
        url: process.env.VUE_APP_ROOT + '/store/info',
        data:{
          storeid
        }
      })
    },
  },
  user: {
    info() {
      return http({
        url: process.env.VUE_APP_ROOT + '/user/info',
      })
    },
    // 奖励明细
    bonus_detail(pagenum) {
      return http({
        url: process.env.VUE_APP_ROOT + '/user/bonus_detail',
        data:{pagenum}
      })
    },
     // 奖励申请提现
     bonus_fetch() {
      return http({
        url: process.env.VUE_APP_ROOT + '/user/bonus_fetch',
        method:'post'
      })
    },



  },



















}