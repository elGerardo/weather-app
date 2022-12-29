<script>
import Banner from "../src/components/Banner.vue";
import Forecast from "../src/components/Forecast.vue";

export default {
  data() {
    return {
      loading: true,
      apiKey: "3350bfc696c299a2821c0453680eb1c5",
      units: "metric",
      baseUrl: "http://api.openweathermap.org/data/2.5/",
      endpoints: {
        forecast: "forecast?",
        weather: "weather?",
      },
      weather: "",
      thinking: true,
      coordinates: {},
      forecastApiResult: {},
      weatherApiResult: {},
      success: false,
    };
  },

  async created() {
    this.getLocation();
  },

  methods: {
    getLocation() {
      let successCallback = (location) => {
        this.success = true;

        this.coordinates = {
          accuracy: location.coords.accuracy,
          latitute: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        this.initApi();
      };

      let errorCallback = (location) => {
        this.thinking = false;
        console.log("Error Location");
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    },

    async initApi() {
      let responseForecast = await fetch(
        this.baseUrl +
          this.endpoints.forecast +
          "lat=" +
          this.coordinates.latitute +
          "&lon=" +
          this.coordinates.longitude +
          "&units=" +
          this.units +
          "&APPID=" +
          this.apiKey
      );

      let responseWeather = await fetch(
        this.baseUrl +
          this.endpoints.weather +
          "lat=" +
          this.coordinates.latitute +
          "&lon=" +
          this.coordinates.longitude +
          "&units=" +
          this.units +
          "&APPID=" +
          this.apiKey
      );

      this.forecastApiResult = await responseForecast.json();

      this.weatherApiResult = await responseWeather.json();
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
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
      <img src="/images/loading_gif.gif" />
      <h2 v-if="thinking && !success">
        We need your location to show the weather
      </h2>
      <h2 v-if="thinking && success">Loading...</h2>
      <h2 v-if="!thinking">We're sorry you don't trust us :c</h2>
      <div>
        <p>Assets:</p>
        <p>https://giphy.com/gifs/ae-everyday-aftereffects-W9qCmeTuUoaFG</p>
        <p>https://dribbble.com/shots/3761552-Free-Weather-Icons</p>
      </div>
    </div>
    <div :class="[$style.weather_data_content]">
      <Banner :class="[$style.banner]" v-if="!loading" :propApiResult="this.weatherApiResult"/>
      <Forecast :class="[$style.forecast]" v-if="!loading" :propApiResult="this.forecastApiResult" :propWeatherResult="this.weatherApiResult" />
    </div>
  </main>
</template>

<style module>
@import "./assets/welcome.module.css";
</style>
