<template>
  <div class="usersearch">
    <h1>{{ msg }}</h1>
    <v-container fluid>
      <v-row row>
        <v-col xs9>
          <v-text-field name="input-1" label="Enter Name" v-model="user"></v-text-field>
        </v-col>
        <v-col xs3>
          <div @click="handleUserSearch(user)">
            <v-btn primary dark class="btn--dark-flat-focused">ENTER</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- <h2>{{ user }}</h2>
    <h3>{{ getUsername }}</h3>
    <p>{{ $store.state.userPreferences.length }} </p> -->
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'usersearch',
  data () {
    return {
      msg: 'Enter your name:',
      user: ''
    }
  },
  created () {
    // this.$store.dispatch('fetchUser')
  },
  computed: mapGetters([
    'getUsername'
  ]),
  methods:
    Object.assign({},
      mapActions([
        'handleUserSearch'
      ]),
      {
        handleUserSearch (user) {
          this.$store.commit('handleUserSearch', { user })
          this.$store.dispatch('getUser')
        }
      }
    )
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

h1 {
  color: #1976D2;
  text-transform: uppercase;
  font-size: 3em !important;
}
</style>
