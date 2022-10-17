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
      <img :src=srcImage />
    </div>
  </div>
</template>
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
      srcImage: null
    };
  },

  created() {
    let weatherCondition = this.apiResult.weather[0].description;
    this.data.country = this.apiResult.sys.country;
    this.data.temp = this.apiResult.main.temp;

    //let apiDate = this.apiResult.list[0].dt_txt;
    //this.date = new Date(apiDate).toUTCString().substr(0, 11);
    //this.data.stamp = getStamp();
    let objectDate = new Date().toJSON().slice(0, 10);
    let objectTime = new Date().toJSON().slice(11, 19);
    let apiDate = objectDate + ' ' +objectTime
    console.log(apiDate);
    this.date = new Date(apiDate).toUTCString().substr(0, 11);
    this.data.stamp = getStamp();
    this.data.weatherCondition = weatherCondition.toUpperCase();

    this.weather =
      this.data.stamp + "_" + weatherCondition.replace(/\s+/g, "_");

      if( this.weather == "day-broken-clouds" ) this.srcImage = "https://i.ibb.co/59SyMwz/day-broken-clouds.png";
      if( this.weather == "day-clear" ) this.srcImage = "https://i.ibb.co/bbMGqQ9/day-clear.png";
      if( this.weather == "day-clouds" ) this.srcImage = "https://i.ibb.co/m83Vq4Z/day-clouds.png";
      if( this.weather == "day-few-clouds" ) this.srcImage = "https://i.ibb.co/2tyn9CL/day-few-clouds.png";
      if( this.weather == "day-clouds" ) this.srcImage = "https://i.ibb.co/m83Vq4Z/day-clouds.png";
      if( this.weather == "day-broken-clouds" ) this.srcImage = "https://i.ibb.co/59SyMwz/day-broken-clouds.png";
      if( this.weather == "night-broken-clouds" ) this.srcImage = "https://i.ibb.co/7rshqj1/night-broken-clouds.png";
      if( this.weather == "night-clear" ) this.srcImage = "https://i.ibb.co/k14LgBx/night-clear.png";
      if( this.weather == "day-clouds" ) this.srcImage = "https://i.ibb.co/m83Vq4Z/day-clouds.png";
      if( this.weather == "night-few-clouds" ) this.srcImage = "https://i.ibb.co/PF7zw3R/night-few-clouds.png";
      if( this.weather == "day-clouds" ) this.srcImage = "https://i.ibb.co/m83Vq4Z/day-clouds.png";
      if( this.weather == "night-broken-clouds" ) this.srcImage = "https://i.ibb.co/7rshqj1/night-broken-clouds.png";
      if( this.weather == "non-drizzle" ) this.srcImage = "https://i.ibb.co/BTcMggL/non-drizzle.png";
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
