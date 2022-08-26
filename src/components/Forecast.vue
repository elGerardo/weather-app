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
          <tr v-for=" item in this.apiResult.list " :key="item.dt">
            <td><img :src="'src/assets/images/weathers/' + this.stamp + '_' + item.weather[0].main + '.png'" /></td>
            <td>{{item.dt_txt}}</td>
            <td>{{item.main.temp}}°</td>
            <td>{{item.weather[0].description.toUpperCase()}}</td>
          </tr>
        </table>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  props: ["propApiResult"],

  data() {
    return {
      apiResult: this.propApiResult,
      weatherCondition: "",
      stamp: "",
      weather: ""
    };
  },

  created() {
    let weatherCondition = this.apiResult.list[0].weather[0].description;

    this.weatherCondition = weatherCondition.toUpperCase();
    //reutilizar este bloque
    let hour = new Date().getHours();
    if (hour > 17) {
      this.stamp = "night";
    } else {
      this.stamp = "day";
    }
    //reutilizar este bloque
    this.weather = this.stamp + "_" + weatherCondition.replace(/\s+/g, "_");
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
