import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const dashboard = () => import(/* webpackChunkName: "main" */ '@/pages/dashboardPage');
const presonal = () => import(/* webpackChunkName: "template" */ '@/components/dashboard/presonal')
const work = () => import(/* webpackChunkName: "template" */ '@/components/dashboard/work')

export default new Vuex.Store({
  state: {
    routes: {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      children: [
        {
          path: 'presonal',
          name: '个人',
          component: presonal,
        }
      ]
    }
  },
  mutations: {
    addRoute(state, data) {
      state.routes.children.push(data);
    }
  }
})
