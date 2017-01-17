// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import VueRouter from 'vue-router'
import Axios from 'axios'

window.axios = Axios
Vue.prototype.$http = Axios

import Todos from 'components/Todos'
import Tokens from 'components/Tokens'

const routes = [
  { path: '/todos', component: Todos },
  { path: '/tokens', component: Tokens }
]

const router = new VueRouter({
  routes
})

Vue.use(VueMaterial)
Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
