// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)
//import  balelPolyfill from 'balel-polyfill'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false;
fastclick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require("./common/images/moren.jpg")
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
