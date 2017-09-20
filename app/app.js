import Vue from 'vue';
import Vuex from 'vuex';
import iview from 'iview';
import router from '@/router/router';
import App from './app.vue';


import 'iview/dist/styles/iview.css';

Vue.use(Vuex);
Vue.use(iview);

new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
