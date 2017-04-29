import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import Hello from './components/Hello'
import Weather from './components/Weather'
import UserSearch from './components/UserSearch'

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './vuex/store'

// import VueMaterial from 'vue-material'
// import '../../node_modules/vue-material/dist/vue-material.css'
// import '../../node_modules/vue-material/dist/vue-material.js'
import Vuetify from 'vuetify'
import '../../node_modules/vuetify/dist/vuetify.min.css'
import '../../node_modules/vuetify/dist/vuetify.min.js'

Vue.use(Vuetify)

// Vue.use(VueMaterial)

Vue.use(axios, VueAxios)

Vue.config.debug = true
Vue.use(Router)

const router = new Router({
  routes: [
    { name: 'hello', path: '/hello', component: Hello },
    { name: 'weather', path: '/weather', component: Weather },
    { name: 'usersearch', path: '/usersearch', component: UserSearch }
  ]
})

new Vue({
  el: '#app',
  router,
  store,
  render(createElement) {
    return createElement(App)
  }
})
