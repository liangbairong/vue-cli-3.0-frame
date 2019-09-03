/*
 * @Author: 梁栢荣
 * @Date: 2019-09-03 17:12:53
 * @Description: file content
 */


export default {
  // 退出登录
  logout({ commit }, data) {
    
  },

  // 获取用户信息
  getUserInfo({ dispatch, commit }) {
    dispatch('querySettleBaseInfo');
    let infoUrl = '';
    if (process.env.API.debug) {
      infoUrl = 'gateway/crcloud-account/queryUserInfo';
    } else {
      infoUrl = 'gateway/crcloud-account/queryNewUserInfo';
    }
    return window.$ajax.post(infoUrl).then((response) => {
      if (response.data.code == 200) {
        commit('setUserInfo', response.data.data);
        commit('setLoginFlag', 'Y');
        return response.data;
      }
    });
  },

  // 获取入驻基本信息
  querySettleBaseInfo({ commit }) {
   
  },

  /**
   * 记录浏览的产品
   * data={
   *    title,
   *    url:JOSN.stringfiy({
   *      routeName,  //路由路径
   *      query:{},  //参数
   *      type:'产品'
   *     })
   * }
   *
   */
  trackProduct(state, data) {
    return window.$ajax.post('gateway/crcloud-account/visit/track', data);
  },


};
