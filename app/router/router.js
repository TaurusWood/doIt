import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index.js';

const login = () => import(/* webpackChunkName: "auxiliary" */ '@/pages/loginPage');
const guide = () => import(/* webpackChunkName: "auxiliary" */ '@/pages/guidePage');
const dashboard = () => import(/* webpackChunkName: "main" */ '@/pages/dashboardPage');
const presonal = () => import(/* webpackChunkName: "template" */ '@/components/dashboard/presonal')
// const work = () => import(/* webpackChunkName: "template" */ '@/components/dashboard/work')
Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      components: {page: login}
    },
    {
      path: '/guide',
      name: 'guide',
      component: guide,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      components: { page: dashboard},
      children: [
        {
          path: 'presonal',
          name: '个人',
          component: presonal
        }
      ]
    }
  ]
});
