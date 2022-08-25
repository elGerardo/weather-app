<template>
  <div :class="[$style.content, $style.flex_space_around, this.weather]">
    <div :class="[$style.flex_space_between]">
      <div>
        <h2>{{ data.temp }}</h2>
      </div>
      <div>
        <p>Tuesday, 22 september</p>
        <p>{{ data.location }}, {{ data.country }}</p>
      </div>
    </div>
    <div :class="[$style.flex_space_between]">
      <p>{{ data.weatherCondition }}</p>
      <img :src="'src/assets/images/weathers/' + this.weather + '.png'" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiKey: "1f5fcbe856a9fe8fb9b0dc7ca8b0c232",
      units: "metric",
      baseUrl: "http://api.openweathermap.org/data/2.5/weather?",
      // Complete Url http://api.openweathermap.org/data/2.5/weather?q=Tijuana&units=metric&APPID=3350bfc696c299a2821c0453680eb1c5
      weather: "",
      data: {
        location: "Tijuana",
        weatherCondition: "",
        country: "",
        temp: "",
        stamp: "",
      },
    };
  },

  async created() {
    try {
      /*let response = await fetch(
        this.baseUrl +
          "q=" +
          this.data.location +
          "&units=" +
          this.units +
          "&APPID=" +
          this.apiKey
      );
      let body = await response.json();

      let weatherCondition = body.weather[0].description;
      this.data.country = body.sys.country;
      this.data.temp = body.main.temp;

      console.log(body);*/
      let weatherCondition = "clear sky";
      this.data.country = "MX";
      this.data.temp = "27.03";


      let hour = new Date().getHours();
      if (hour > 16) {
        this.data.stamp = "night";
      } else {
        this.data.stamp = "day";
      }
      this.data.weatherCondition = weatherCondition.toUpperCase();

      this.weather =
        this.data.stamp + "_" + weatherCondition.replace(/\s+/g, "_");
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
<style module>
@import "../assets/banner.module.css";
@import "../assets/global.module.css";
</style>
<style>
@import "../assets/weathers.css";
</style>
