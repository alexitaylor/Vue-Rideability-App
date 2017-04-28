import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import Hello from './components/Hello'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(axios, VueAxios)

Vue.config.debug = true
Vue.use(Router)

const router = new Router({
  routes: [
    { name: 'hello', path: '/hello', component: Hello }
  ]
})

new Vue({
  el: '#app',
  router,
  render (createElement) {
    return createElement(App)
  }
})
