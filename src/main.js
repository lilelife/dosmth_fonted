// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
///--添加router ivew
 import router from './router'
//import iView from 'iview'
//import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
//--use iview
//Vue.use(iView)
Vue.use(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
