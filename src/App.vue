<script>
import Banner from "../src/components/Banner.vue";
import Forecast from "../src/components/Forecast.vue";

export default {
  data() {
    return {
      loading: true,
      apiKey: "1f5fcbe856a9fe8fb9b0dc7ca8b0c232",
      units: "metric",
      baseUrl: "http://api.openweathermap.org/data/2.5/forecast?",
      weather: "",
      thinking: true,
      coordinates: {},
      apiResult: {},
    };
  },

  async created() {

    this.getLocation();
  },

  methods:{

    getLocation(){

      let successCallback = location => {

        this.coordinates = {
          accuracy:  location.coords.accuracy,
          latitute:  location.coords.latitude,
          longitude:  location.coords.longitude,
        }

        this.initApi();
      };

      let errorCallback = location => {
        this.thinking = false;
        console.log('Error Location');
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },

    async initApi(){
      let response = await fetch(
        this.baseUrl +
          "lat=" +
          this.coordinates.latitute +
          "&lon=" +
          this.coordinates.longitude +
          "&units=" +
          this.units +
          "&APPID=" +
          this.apiKey
      );
      let body = await response.json();

      this.apiResult = body;
      setTimeout( () => {
        this.loading = false;
      }, 3000)
    }

  },

  components: {
    Banner,
    Forecast,
  },
};
</script>

<template>
  <main>
    <div v-if="loading" :class="[$style.content]">
      <img src="./assets/images/loading_gif.gif"/>
      <h2 v-if="thinking">We need your location to show the weather</h2>
      <h2 v-if="!thinking">We're sorry you don't trust us :c</h2>
      <div>
        <p>Assets:</p>
        <p>https://giphy.com/gifs/ae-everyday-aftereffects-W9qCmeTuUoaFG</p>
        <p>https://dribbble.com/shots/3761552-Free-Weather-Icons</p>
      </div>
    </div>
    <Banner v-if="!loading" :propApiResult="this.apiResult" />
    <Forecast v-if="!loading" :propApiResult="this.apiResult" />
  </main>
</template>

<style module>
  @import './assets/welcome.module.css';
</style>
