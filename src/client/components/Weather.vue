<template>
  <div class="weather">
    <h1>{{ msg }}: {{ $store.state.city }}</h1>
    <v-container fluid="fluid">
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
    <!-- <ul>
      <li v-for="data in $store.state.weather">
        <p v-bind:class="[data.rideable ? rideable : nonRideable]">{{ data.time | moment }}</p>
      </li>
    </ul> -->
      <v-row v-for="data in $store.state.weather">
        <v-col xs4 class="col">
          <v-card v-bind:class="[data.rideable ? rideable : nonRideable]">
            <v-card-text>{{ data.time | moment }}</v-card-text>
          </v-card>
        </v-col>
<!--         <v-col xs2>
          <v-card v-bind:class="[data.rideable ? rideable : nonRideable]">
            <v-card-text>{{ data.precipIntensity }}</v-card-text>
          </v-card>
        </v-col> -->
        <v-col xs2 class="col">
          <v-card v-bind:class="[data.rideable ? rideable : nonRideable]">
            <v-card-text>{{ data.precipProbability }}</v-card-text>
          </v-card>
        </v-col>
        <v-col xs2 class="col">
          <v-card v-bind:class="[data.rideable ? rideable : nonRideable]">
            <v-card-text>{{ data.temperature }}</v-card-text>
          </v-card>
        </v-col>
        <v-col xs2 class="col">
          <v-card v-bind:class="[data.rideable ? rideable : nonRideable]">
            <v-card-text>{{ data.windSpeed }}</v-card-text>
          </v-card>
        </v-col>
        <v-col xs2 class="col">
          <v-card v-bind:class="[data.rideable ? rideable : nonRideable]">
            <v-card-text>{{ data.windBearing }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
moment().format()

export default {
  name: 'weather',
  data () {
    return {
      msg: 'Weather',
      city: '',
      rideable: 'rideable',
      nonRideable: 'nonRideable'
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
    ),
  filters: {
    moment: function (date) {
      return moment.unix(date).format('dddd h:mm A')
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  font-size: 2em;
  display: inline-block;
  margin: 0 10px;
}

.rideable {
  color: green;
}

.nonRideable{
  color: red;
}

.col {
  padding: 2em;
}

</style>
