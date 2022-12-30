<script>
import { getStamp } from "../classes/Stamp.js";
import Footer from "./Footer.vue";
export default {
  components:{
    Footer
  },
  props: ["propApiResult", "propWeatherResult"],

  data() {
    return {
      weatherResult: this.propWeatherResult,
      apiResult: this.propApiResult,
      weatherCondition: "",
      stamp: "",
      weather: "",
      data:{
        stamp: null,
        weatherCondition: null,
        temp: null,
      }
    };
  },

  created() {
    let weatherCondition = this.weatherResult.weather[0].description;
    this.data.temp = this.weatherResult.main.temp;

    let objectDate = new Date().toJSON().slice(0, 10);
    let objectTime = new Date().toJSON().slice(11, 19);
    let apiDate = objectDate + " " + objectTime;
    this.date = new Date(apiDate).toUTCString().substr(0, 11);
    this.data.stamp = getStamp();
    this.data.weatherCondition = weatherCondition.toUpperCase();

    this.weather =
      this.data.stamp + "_" + weatherCondition.replace(/\s+/g, "_");
  },

  methods: {
    hourToState(time) {
      let data = time.slice(11, 13);
      if (data > 17 || data < 5) {
        return "night";
      } else {
        return "day";
      }
    },
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
                  '/images/weathers/' +
                  hourToState(item.dt_txt) +
                  '_' +
                  item.weather[0].main +
                  '.png'
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
    <Footer />
  </main>
</template>
