<script>
import { getStamp } from "../classes/Stamp.js";

export default {
  props: ["propApiResult"],

  data() {
    return {
      apiResult: this.propApiResult,
      data: {
        location: "Tijuana",
        weatherCondition: "",
        country: "",
        temp: "",
        stamp: "",
        date: "",
      },
    };
  },

  created() {

    let weatherCondition = this.apiResult.weather[0].description;
    this.data.country = this.apiResult.sys.country;
    this.data.temp = this.apiResult.main.temp;

    let objectDate = new Date().toJSON().slice(0, 10);
    let objectTime = new Date().toJSON().slice(11, 19);
    let apiDate = objectDate + " " + objectTime;
    this.date = new Date(apiDate).toUTCString().substr(0, 11);
    this.data.stamp = getStamp();
    this.data.weatherCondition = weatherCondition.toUpperCase();

    this.weather =
      this.data.stamp + "_" + weatherCondition.replace(/\s+/g, "_");


      console.log(this.weather)
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
<template>
  <div :class="[$style.content, $style.flex_space_around, this.weather]">
    <div :class="[$style.flex_space_between]">
      <div>
        <h2>{{ data.temp }}°</h2>
      </div>
      <div>
        <p>{{ date }}</p>
        <p>{{ data.location }}, {{ data.country }}</p>
      </div>
    </div>
    <div :class="[$style.flex_space_between]">
      <p>{{ data.weatherCondition }}</p>
      <img :src="'images/weathers/' + this.weather + '.png'" />
    </div>
  </div>
</template>
