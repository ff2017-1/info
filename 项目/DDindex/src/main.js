// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'

require("@/assets/css/mui.css");
require("@/assets/css/base.css");
require("@/assets/js/pinyin_dict_firstletter.js");
require("@/assets/js/pinyinUtil.js");


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,    store,
    components: { App },
  template: '<App/>'
})
