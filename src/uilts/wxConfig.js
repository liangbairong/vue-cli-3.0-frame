/*
 * @Author: 梁栢荣
 * @Date: 2019-09-03 17:01:36
 * @Description: file content
 */
import api from "@/api/index"
import wx from 'weixin-js-sdk'
import {
  isIOS
} from '@/uilts/uilts'
window.wx = wx
export default class wxConfig {
  constructor() {

  }
  init(to, param = {}) {
    let reurl = `${process.env.VUE_APP_WXBASE}${to.fullPath}`
    if (isIOS()) { // IOS
      if (window.entryUrl == '' || window.entryUrl == undefined) {
        var url = `${process.env.VUE_APP_WXBASE}${to.fullPath}`
        window.entryUrl = url
      }
      reurl = window.entryUrl
      this.getTickt(reurl, param)
    } else { // 安卓
      setTimeout( ()=> {
        this.getTickt(reurl, param)
      }, 500);
    }
  }
  async getTickt(reurl, param) {
    await api.common.ticket(reurl).then(res => {
      if (res.errcode === 0) {
        wx.config({
          debug: false,
          appId: process.env.VUE_APP_APPID, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: res.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.data.noncestr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名，见附录1
          jsApiList: ['scanQRCode', 'onMenuShareAppMessage', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }
    })
    this.wxShare(param)
  }

  wxShare(param) {
    var $wx = {
      share1: {
        title: param.title || '慧宝乐园',
        desc: param.desc || '慧宝乐园',
        link: param.link || `${process.env.VUE_APP_WXBASE}/home`,
        imgUrl: param.imgUrl || 'http://wx.huibaoleyuan.com/static/img/logo.png',
        success() {
          // 用户点击了分享后执行的回调函数
          if (param.callback) param.callback();
        }
      }, //分享朋友圈
      share2: {
        title: param.title || '慧宝乐园',
        link: param.link || `${process.env.VUE_APP_WXBASE}/home`,
        imgUrl: param.imgUrl || 'http://wx.huibaoleyuan.com/static/img/logo.png',
        success() {
          if (param.callback) param.callback();
        }
      }
    };
    wx.ready(() => {
      wx.onMenuShareAppMessage($wx.share1);
      wx.onMenuShareTimeline($wx.share2);
    })
    wx.error((err) => {
      console.log(err)
      // this.init(param)
    });
  }
}