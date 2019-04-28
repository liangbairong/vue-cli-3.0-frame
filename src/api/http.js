import axios from 'axios'
import qs from 'qs';

import {
  myLocalStorage,
  createPeerid
} from '@/uilts/uilts'
import errHint from './errHint'
import {
  Indicator,
  Toast
} from 'mint-ui';
var getUrlParam = (url) => {
  var htmlHref = url;
  htmlHref = htmlHref.replace(/^http:\/\/[^/]+/, "");
  var addr = htmlHref.substr(htmlHref.lastIndexOf('/', htmlHref.lastIndexOf('/') - 1) + 1);
  // eslint-disable-next-line no-useless-escape
  var index = addr.lastIndexOf("\/");
  //js 获取字符串中最后一个斜杠后面的内容
  var addrLast = decodeURI(addr.substring(index + 1, addr.length));
  //js 获取字符串中最后一个斜杠前面的内容
  var addrPrve = decodeURI(addr.substring(0, index));
  return {
    addrLast,
    addrPrve
  }
}
axios.defaults.timeout = 10000;
axios.interceptors.request.use(
  config => {
    var peerid = myLocalStorage.get('peerid');
    if (!peerid) {
      peerid = createPeerid();
      myLocalStorage.set('peerid', peerid);
    }
    var sessionid = myLocalStorage.get('sessionid');
    if (config.method === 'get') {
      peerid && (config.params.peerid = peerid)
      sessionid && (config.params.sessionid = sessionid)
    } else if (config.method === 'post') {
      peerid && (config.data.peerid = peerid)
      sessionid && (config.data.sessionid = sessionid)
      config.data = qs.stringify(config.data);
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });


function ajaxContent(param, res) {
  // console.log()
  // 登录状态已失效
  if (res.errinfo == 'SESSIONID_NULL' || res.errinfo=='SESSIONID_INVALID') {
    myLocalStorage.remove("peerid");
    myLocalStorage.remove("sessionid");
    window.location.replace('/wxlogin')
  }

  if(res.errinfo=='ACCOUNT_UNBOUND'){
    window.location.replace('/bindaccount')
    return
  }
  if (param.loading) {
    Indicator.close();
  }
  var hintErr = param.hintErr || false; //禁止弹出警告提示 true: 不弹出    默认弹出
  if (!hintErr) {
    try {
      if (res.errcode !== 0) {

        if(param.errInfo){  //拦截特殊的错误
          for (let item in param.errInfo){
            if(res.errinfo==param.errInfo[item]){
              return;
            }
          }
        }
      

        let val = errHint[res.errinfo];

        let errHintData = myLocalStorage.get("errHint");
        var urlParam = getUrlParam(param.url)
        var addrPrve = urlParam.addrPrve;
        var addrLast = urlParam.addrLast;
        if (errHintData) {
          if (errHintData[addrPrve]) {
            if (errHintData[addrPrve][addrLast]) {
              val = errHintData[addrPrve][addrLast][res.errinfo];
            }
          } else {
            if (errHintData['public_module']['public_action'][res.errinfo]) {
              val = errHintData['public_module']['public_action'][res.errinfo]
            }
          }
        }


        if (val == undefined) {
          val = res.errinfo;
        }
        Toast({
          message: val,
          duration: 1000
        });
      }
    } catch (err) {console.log(err)}
  }
 
}
//封装Promise
export default param => {
  if (param.loading) {
    Indicator.open('加载中');
  }
  if (param.method == "post") {
    return new Promise((resolve, reject) => {
      axios.post(param.url, {
        ...param.data,
      }).then(res => {
        resolve(res.data);
        ajaxContent(param, res.data);
      }).catch((error) => {
        reject(error)
        if (param.loading) {
          Indicator.close();
        }
      });
    }).catch((err)=>{
      Toast({
        message: err,
        duration: 1000
      });
    })

  } else {
    return new Promise((resolve, reject) => {
      axios.get(param.url, {
        params: {
          ...param.data,
        },
      }).then(res => {
        resolve(res.data);
        ajaxContent(param, res.data);
      }).catch((error) => {
        reject(error)
        if (param.loading) {
          Indicator.close();
        }
      });
    }).catch((err)=>{
      Toast({
        message: err,
        duration: 1000
      });
    })
  }
};