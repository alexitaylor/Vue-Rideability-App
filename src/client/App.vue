<template>
  <div class="app full-height">
    <h1>{{ message }}</h1>
    <md-button class="md-raised md-primary">Primary</md-button>
    <div>
      <img src="./assets/Octocat.png">
      <hello></hello>
    </div>
  </div>
</template>

<script>

import Hello from './components/Hello'
// import VueMaterial from 'vue-material'

// Vue.use(VueMaterial)

export default {
  name: 'app',
  components: {
    Hello
  },
  data () {
    return {
      message: 'Express + Vue + MongoDB Boilerplate'
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

.full-height{
  height: 100%;
  text-align: center;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}

h1 {
  color: #41B883;
}
</style>
