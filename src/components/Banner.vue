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
      <img :src="'src/assets/images/weathers/' + this.weather + '.png'" />
    </div>
  </div>
</template>
<script>
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

    let weatherCondition = this.apiResult.list[0].weather[0].description;
    this.data.country = this.apiResult.city.country;
    this.data.temp = this.apiResult.list[0].main.temp;
    
    let apiDate = this.apiResult.list[0].dt_txt;
    this.date = new Date(apiDate).toUTCString().substr(0,11);
    /*let weatherCondition = "clear sky";
    this.data.country = "MX";
    this.data.temp = "27.03";*/

    //reutilizar este bloque
    let hour = new Date().getHours();
    if (hour > 17) {
      this.data.stamp = "night";
    } else {
      this.data.stamp = "day";
    }
    //reutilizar este bloque
    this.data.weatherCondition = weatherCondition.toUpperCase();

    this.weather =
      this.data.stamp + "_" + weatherCondition.replace(/\s+/g, "_");
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
