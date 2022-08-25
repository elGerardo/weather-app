
<template>
  <main>
    <Banner/>
    <Forecast/>
  </main>
</template>

<script>
import Banner from '../src/components/Banner.vue';
import Forecast from '../src/components/Forecast.vue';

export default ({
  components: {
    Banner,
    Forecast
  },
  
  data(){
    return {
      
    }
  },

  

  created(){

  },

  methods:{
  }

})
</script>