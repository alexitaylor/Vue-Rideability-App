<template>
  <div class="app full-height">
    <!-- <h1>{{ message }}</h1> -->
    <div>
      <img src="./assets/Octocat.png">
      <hello></hello>
      <!-- <UserSearch></UserSearch> -->
      <!-- <UsersPref></UsersPref> -->
      <weather></weather>
    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import UserSearch from './components/UserSearch'
import UsersPref from './components/UsersPref'
import Weather from './components/Weather'

export default {
  name: 'app',
  components: {
    Hello,
    UserSearch,
    UsersPref,
    Weather
  },
  data () {
    return {
      message: 'Express + Vue + MongoDB Boilerplate',
      content: ['', 'test1', 'test2', 'test3']
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
  color: #1976D2 !important;
  text-transform: uppercase;
  font-size: 3em !important;
}

</style>
