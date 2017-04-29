/*
Documentation on State Management:
https://vuejs.org/v2/guide/state-management.html

AND

VEUX: A Centralized State Management for Vue.js.
https://github.com/vuejs/vuex
*/

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(axios, VueAxios)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0,
  usernameInput: '',
  weather: [],
  userPreferences: {},
  data: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  handleUserSearch(state, { user }) {
    console.log('I was clicked ', user)
    state.usernameInput = user
  },
  setWeather: (state, { list }) => {
    console.log(list)
    state.weather = list
  },
  setUserPreferences: (state, { pref }) => {
    console.log(pref)
    state.userPreferences = pref
  }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  handleUserSearch: ({ commit }) => commit('handleUserSearch'),
  setWeather: ({ commit }) => commit('setWeather'),
  setUserPreferences: ({ commit }) => commit('setUserPreferences'),
  getUser: ({ commit }) => {
    axios.get('http://127.0.0.1:4000/user', {
      params: {
        username: state.usernameInput
      }
    })
    .then(response => {
      console.log('SUCCESS')
      console.log(response.data)
      commit('setUserPreferences', { pref: response.data })
    }, (err) => {
      console.log(err)
    })
  }
  // getUsersRepos: ({ commit }) => {
  //   axios.post('http://127.0.0.1:4000/repos', {username: state.usernameInput})
  //   .then((response) => {
  //     console.log('SUCCESS POSTED', response.data)
  //     commit('setWeather', { list: response.data })
  //   }, (err) => {
  //     console.log(err)
  //   })
  // }
}

// getters are functions
const getters = {
  getUsername: state => 'Username: ' + state.usernameInput,
  filterData: state => {
    return state.data.filter(repo => repo.name)
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
