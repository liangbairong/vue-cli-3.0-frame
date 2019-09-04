/*
 * @Author: 梁栢荣
 * @Date: 2019-09-03 17:01:36
 * @Description: file content
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = r => require.ensure([], () => r(require('@/pages/Home')), 'modle_1')
const WxLogin = r => require.ensure([], () => r(require('@/pages/WxLogin')), 'modle_1')
const BindAccount = r => require.ensure([], () => r(require('@/pages/BindAccount')), 'modle_1')


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        rank:1,
        title: '管理员'
      }
    },
    {
      path: '/wxlogin',
      name: 'wxlogin',
      component: WxLogin,
      meta: {
        rank:1,
        title: '微信授权'
      }
    },
    {
      path: '/bindaccount',
      name: 'bindaccount',
      component: BindAccount,
      meta: {
        rank:2,
        title: '绑定账号'
      }
    },
    {
      path: '/',
      redirect: '/home'
    }
  ],


})


Vue.mixin({
  beforeRouteLeave: function (to, from, next) {
    //此处判断是如果返回上一层，
    if (from && from.meta.rank && to.meta.rank && from.meta.rank > to.meta.rank) {
      if (this.$vnode && this.$vnode.data.keepAlive) {
        if (this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
          if (this.$vnode.componentOptions) {
            var key = this.$vnode.key == null ?
              this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') :
              this.$vnode.key;
            var cache = this.$vnode.parent.componentInstance.cache;
            var keys = this.$vnode.parent.componentInstance.keys;
            if (cache[key]) {
              if (keys.length) {
                var index = keys.indexOf(key);
                if (index > -1) {
                  keys.splice(index, 1);
                }
              }
              delete cache[key];
            }
          }
        }
      }
      this.$destroy();
    }
    next();
  },
});