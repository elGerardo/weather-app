<script>
import { getStamp } from "../classes/Stamp.js";

export default {
  props: ["propApiResult", "propWeatherResult"],

  data() {
    return {
      weatherResult: this.propWeatherResult,
      apiResult: this.propApiResult,
      weatherCondition: "",
      stamp: "",
      weather: "",
      data: {
        stamp: null,
        weatherCondition: null,
        temp: null,
      },
      styleVersion: {
        bgBody: "background_gray",
        bgItems: "background_white",
      },
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
    changeStyleVersion() {
      if (this.styleVersion.bgBody == "background_gray") {
        this.styleVersion.bgBody = "background_black";
        this.styleVersion.bgItems = "background_semi_black";
        return;
      }
      this.styleVersion.bgBody = "background_gray";
      this.styleVersion.bgItems = "background_white";
      return;
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
@import "../assets/backgrounds.css";
</style>
<template>
  <main :class="[styleVersion.bgBody]">
    <div :class="[$style.container]">
      <div :class="[$style.content]">
        <div :class="[$style.container_dark_light]">
          <h2>Forecast</h2>
          <button
            :class="[
              $style.btn_dark_light,
              styleVersion.bgBody === 'background_gray'
                ? 'background_black'
                : 'background_white',
            ]"
            @click="changeStyleVersion()"
          >
            <p v-if="styleVersion.bgBody == 'background_gray'">
              <font-awesome-icon icon="sun" />
              Light Mode
            </p>
            <p v-if="styleVersion.bgBody == 'background_black'">
              Dark Mode
              <font-awesome-icon icon="moon" />
            </p>
          </button>
        </div>
        <table cellspacing="0" cellpadding="0">
          <tr v-for="item in this.apiResult.list" :key="item.dt">
            <div :class="[styleVersion.bgItems]">
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
              <td>{{ item.main.temp }}??</td>
              <td>{{ item.weather[0].description.toUpperCase() }}</td>
            </div>
          </tr>
          <footer>
            <a href="https://gerardovillalobos.netlify.app/"
              >Visit my website
            </a>
            <a href="https://github.com/elGerardo">My GitHub</a>
          </footer>
        </table>
      </div>
    </div>
  </main>
</template>
