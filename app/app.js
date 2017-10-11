import Vue from 'vue';
import axios from 'axios'
import iview from 'iview';
import router from '@/router/router';
import store from '@/store/index';
import App from './app.vue';


import 'iview/dist/styles/iview.css';

Vue.use(iview);
Vue.prototype.$http = axios;
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
