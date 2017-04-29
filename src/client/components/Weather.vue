<template>
  <div class="weather">
    <h1>{{ msg }}</h1>
    <v-container fluid>
      <v-row row>
        <v-col xs9>
          <v-text-field
            name="input-1"
            label="Enter City"
            v-model="city"
          ></v-text-field>
        </v-col>
        <v-col xs3>
          <div @click="handleCitySearch(city)">
            <v-btn
            primary
            dark
            class="btn--dark-flat-focused"
            >SEARCH</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <p>{{ $store.state.weather }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'weather',
  data () {
    return {
      msg: 'Weather!',
      city: ''
    }
  },
  computed: mapGetters([
    'getWeather'
  ]),
  methods:
    Object.assign({},
      mapActions([
        'handleCitySearch'
      ]),
      {
        handleCitySearch (city) {
          this.$store.commit('handleCitySearch', { city })
          this.$store.dispatch('getWeather')
        }
      }
    )
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
