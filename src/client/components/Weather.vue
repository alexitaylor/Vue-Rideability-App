<template>
  <div class="weather">
    <v-tabs id="mobile-tabs-1" grow scroll-bars v-bind:model="active">
      <v-tab-item v-for="i in 7" :key="i" v-bind:href="'#mobile-tabs-1-' + i" ripple slot="activators">
        Day {{ i }}
      </v-tab-item>
      <v-tab-content v-for="i in 3" :key="i" v-bind:id="'mobile-tabs-1-' + i" slot="content">
        <v-card>
          <v-card-text>{{ content[i] }}</v-card-text>
        </v-card>
      </v-tab-content>
    </v-tabs>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'weather',
  data () {
    return {
      msg: 'testing...'
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
