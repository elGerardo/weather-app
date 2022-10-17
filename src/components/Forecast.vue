<template :class>
  <main :class="[this.weather]">
    <div :class="[$style.container]">
      <div :class="[$style.flex_center, $style.content]">
        <table cellspacing="0" cellpadding="0">
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr v-for="item in this.apiResult.list" :key="item.dt">
            <td>
              <img
                :src="
                  srcImage
                "
              />
            </td>
            <td>{{ item.dt_txt }}</td>
            <td>{{ item.main.temp }}°</td>
            <td>{{ item.weather[0].description.toUpperCase() }}</td>
          </tr>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
import { getStamp } from "../classes/Stamp.js";

export default {
  props: ["propApiResult"],

  data() {
    return {
      apiResult: this.propApiResult,
      weatherCondition: "",
      stamp: "",
      weather: "",
      srcImage: null
    };
  },

  created() {
    let weatherCondition = this.apiResult.list[0].weather[0].description;
    this.weatherCondition = weatherCondition.toUpperCase();
    this.stamp = getStamp();
    this.weather = this.stamp + "_" + weatherCondition.replace(/\s+/g, "_");

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
@import "../assets/global.module.css";
@import "../assets/forecast.module.css";
</style>
<style>
@import "../assets/weathers.css";
</style>
