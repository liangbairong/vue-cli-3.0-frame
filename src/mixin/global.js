/*
 * @Author: 梁栢荣
 * @Date: 2019-09-03 17:04:09
 * @Description: file content
 */

import Vue from 'vue';

// 引入全局eventBus实例$bus
const $bus = new Vue();
export default {
  methods: {
    /**
     * @Author: 梁栢荣
     * @description: 封装简化了eventBus的$on方法
     * @param eventName：事件名称
     * @return: null
     * @example: this.$busOn('eventName')
     */
    $busOn(eventName, callback = () => { }) {
      $bus.$on(eventName, callback);
    },
    /**
     * @Author: 梁栢荣
     * @description: 封装简化了eventBus的$emit方法
     * @param eventName：事件名称, params: 触发事件带的参数
     * @return: null
     * @example: this.$busEmit('eventName', {name: 'lily'});
     */
    $busEmit(eventName, params = {}) {
      $bus.$emit(eventName, params);
    },
    /**
     * @Author: 梁栢荣
     * @description: 封装简化了eventBus的$off方法
     * @param eventName：事件名称
     * @return: null
     * @example: this.$busOff('eventName');
     */
    $busOff(eventName) {
      if (!eventName) {
        this.$message.error('请传入要移除的事件名称');
      }
      $bus.$off(eventName);
    },
  

  
  },
};
