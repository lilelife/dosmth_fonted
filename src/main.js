// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
///--添加router ivew
 import router from './router'
//import iView from 'iview'
//import 'iview/dist/styles/iview.css'
import axios from 'axios'
import {post,get,put,patch} from './request/http'
import QRCode from 'qrcode' // 引入二维码组件
import Share from 'vue-social-share'
import 'vue-social-share/dist/client.css';
import '../node_modules/social-share.js/dist/js/social-share.min.js'
// md5 加密：
import md5 from 'js-md5'

// 定义全局变量
Vue.prototype.$md5 = md5;
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.prototype.$put=put;
Vue.prototype.$patch=patch; 

Vue.config.productionTip = false
//--use iview
//Vue.use(iView)
Vue.use(router)
Vue.use(Share)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
