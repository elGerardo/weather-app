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
      // Complete Url http://api.openweathermap.org/data/2.5/weather?q=Tijuana&units=metric&APPID={API_KEY}
      weather: "",
      location: "Tijuana",
      apiResult: {},
    };
  },

  async created() {
    console.log("init app...");
    let response = await fetch(
      this.baseUrl +
        "q=" +
        this.location +
        "&units=" +
        this.units +
        "&APPID=" +
        this.apiKey
    );
    let body = await response.json();

    this.apiResult = body;
    this.loading = false;
    console.log(body);
  },

  components: {
    Banner,
    Forecast,
  },
};


</script>

<template>
  <main>
    <Banner v-if="!loading" :propApiResult="this.apiResult" />
    <Forecast v-if="!loading" :propApiResult="this.apiResult" />
  </main>
</template>
