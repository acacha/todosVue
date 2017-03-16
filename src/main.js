// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
// import 'roboto-fontface/css/roboto/roboto-fontface.css'
// import 'material-design-icons/iconfont/material-icons.css'

import VueRouter from 'vue-router'
import Axios from 'axios'
import querystring from 'querystring'
import auth from './services/auth'

window.axios = Axios
window.querystring = querystring
Vue.prototype.$http = Axios

window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
}

if (auth.loggedIn()) {
  window.axios.defaults.headers.common = {
    'Authorization': auth.getAuthHeader()
  }
}

import router from './services/router'

Vue.use(VueMaterial)
Vue.use(VueRouter)

Vue.material.registerTheme('custom', {
  primary: 'blue',
  accent: 'red',
  warn: 'red',
  background: 'white'
})

Vue.material.setCurrentTheme('custom')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
