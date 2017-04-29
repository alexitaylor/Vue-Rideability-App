<template>
  <div class="usersearch">
    <h1>{{ msg }}</h1>

    <v-container fluid>
      <v-row row>
        <v-col xs4 offset-xs2>
          <v-text-field
            name="input-1"
            label="Temp Low"
            v-model="userPref.tempLow"
          ></v-text-field>
        </v-col>
        <v-col xs4>
          <v-text-field
            name="input-1"
            label="Temp High"
            v-model="userPref.tempHigh"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row row>
        <v-col xs4 offset-xs2>
          <v-text-field
            name="input-1"
            label="Wind High"
            v-model="userPref.windHigh"
          ></v-text-field>
        </v-col>
        <v-col xs4>
          <v-text-field
            name="input-1"
            label="Precip High"
            v-model="userPref.precipHigh"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col xs6 offset-xs3>
          <div @click="handleUserPref(userPref)">
            <v-btn
            primary
            dark
            class="btn--dark-flat-focused"
            >ENTER</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <h2>{{ userPref }}</h2>
    <h3>{{ $store.state.userPreferences }}</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'userspref',
  data () {
    return {
      msg: 'Enter your preferences:',
      user: '',
      userPref: {precipHigh: '', windHigh: '', tempLow: '', tempHigh: ''}
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
        'handleUserPref'
      ]),
      {
        handleUserPref (pref) {
          this.$store.commit('handleUserPref', { pref })
          this.$store.dispatch('sendUserPref')
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
  color: #41B883;
  text-transform: uppercase;
  font-size: 3em !important;
}

.text-danger {
  color: red;
}
</style>
