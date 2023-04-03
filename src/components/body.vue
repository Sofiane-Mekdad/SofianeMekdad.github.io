<script>
import DisplayHourly from './displayHourly.vue'


export default {

  components : {DisplayHourly},

  data(){return {
    daily :{
      time : [],
      sunrise : [],
      sunset : []
    },

    hourly : {
      cloudcover : [],
      rain : [],
      snowfall : [],
      temperature : [],
      time : []
    },
    timezone : String
    }
  }
}
</script>

<template>
  <div class="daily">
    <DisplayHourly v-for="(time, index) in hourly.time" :key="index" :temperature="hourly.temperature[index]"/>
  </div>
</template>

<style>

</style>