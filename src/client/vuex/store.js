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
import _ from 'lodash'

Vue.use(Vuex)
Vue.use(axios, VueAxios)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  count: 0,
  usernameInput: '',
  weather: [],
  userPreferences: {
    username: 'Nicolas',
    tempLow: 40,
    tempHigh: 100,
    windHigh: 25,
    precipHigh: 0.8
  },
  data: [],
  city: ''
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
  handleUserPref(state, { pref }) {
    console.log('I was clicked PREF', pref)
    state.userPreferences = pref
  },
  handleCitySearch(state, { city }) {
    console.log('I was clicked WEATHER', city)
    state.city = city
  },
  setWeather: (state, { data }) => {
    console.log(data)
    state.weather = data
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
  handleUserPref: ({ commit }) => commit('handleUserPref'),
  handleCitySearch: ({ commit }) => commit('handleCitySearch'),
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
  },
  getWeather: ({ commit }) => {
    axios.get('http://127.0.0.1:4000/city', {
      params: {
        city: state.city,
        userPreferences: state.userPreferences
      }
    })
    .then(response => {
      console.log('SUCCESS')
      console.log(response.data)
      commit('setWeather', { data: response.data })
    }, (err) => {
      console.log(err)
    })
  },
  sendUserPref: ({ commit }) => {
    axios.post('http://127.0.0.1:4000/user', {
      userPreferences: _.assign(state.userPreferences, {username: 'Alexi'})
    })
    .then(response => {
      console.log('SUCCESS POSTED')
      console.log(response.data)
      // commit('setUserPreferences', { pref: response.data })
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
