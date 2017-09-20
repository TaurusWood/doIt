import Vue from 'vue';
import Router from 'vue-router';

const login = () => import(/* webpackChunkName: "auxiliary" */ '@/pages/loginPage.vue');
const guide = () => import(/* webpackChunkName: "auxiliary" */ '@/pages/guidePage.vue');
const dashboard = () => import(/* webpackChunkName: "main" */ '@/pages/dashboardPage');

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
      component: login
    },
    {
      path: '/guide',
      name: 'guide',
      component: guide,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
    }
  ]
});
