import Vue from 'vue';
import iview from 'iview';
import API from '@/assets/js/api'
import router from '@/router/router';
import store from '@/store/index';
import App from './app.vue';

import 'iview/dist/styles/iview.css';

const axios = new API();
// import axios from 'axios';

/* Object.defineProperty(obj, prop, descriptor)
 * 对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。
 * 数据描述符是一个拥有可写或不可写值的属性。存取描述符是由一对 getter-setter 函数功能来描述的属性。
 * 描述符必须是两种形式之一；不能同时是两者。
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 */
Object.defineProperties(Vue.prototype, {
  // 存取描述符
  axios: {
    get() {
      return axios;
    }
  },
  // 数据描述符
  $http: { value: axios }
})

if (window.localStorage.getItem('token')) {
  console.info('has request token');
  Vue.prototype.axios.updateToken();
}

Vue.use(iview);
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
