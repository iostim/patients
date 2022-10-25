import Vue from 'vue';
import VueRouter from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import singleSpaVue from 'single-spa-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';


Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const routes = [
  { name: 'index', path: '/',         component: require('@/pages/index').default },
  { name: 'edit',  path: '/edit/:id', component: require('@/pages/edit').default, props: true }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    render(h) {
      return h(Vue.component('RouterView'))
    },
    router
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
