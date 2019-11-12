// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import stores from './vuex/store'
import createLogger from 'vuex/dist/logger'
import Rem from './static/js/rem'
import zepto from 'zeptojs'
import axios from 'axios';
import native from './static/js/native'
import common from './axios/index';
import HttpUtils from './axios/HttpUtils';
// import './static/js/vConsole'


import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import Util from './util.js'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/lib/styles/base.less'
import { Picker, Tabs, Select } from 'muse-ui'
import 'muse-ui/lib/styles/theme.less'


Vue.use(Picker, Tabs, Select)
Vue.use(MuseUI)
Vue.use(common)
Vue.use(HttpUtils)
Vue.prototype.$axios = axios;
Vue.prototype.util = Util

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(MintUI);



const logger = createLogger({
  collapsed: false,
  transformer(state){
    return state
  },
  mutationTransformer(mutation){
    return mutation.type
  }
})

const store = new Vuex.Store({
  ...stores,
  // plugins: process.env.NODE_ENV == 'production' ? [] : [logger]
})

//移动端自适应
Rem.rem();
//移动端轻量jquery
window.$ = zepto;
window.native = native
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
