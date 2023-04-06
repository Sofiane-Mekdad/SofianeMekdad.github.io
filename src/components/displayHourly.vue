<script>
export default {
  props : {
    cloudcover : 0,
    rain : 0,
    snowfall : 0,
    temperature : 0,
    time : 0,
    index : 0
  },
  computed :{
    getHour(){
      if(this.time !=undefined){
        return  `${new Date(this.time*1000).toLocaleDateString().slice(0, -5)} ${new Date(this.time*1000).getHours()}:00`
      }
      return ""
    },

    getTemperature(){
      if(this.temperature == undefined){
        return ""
      }

      return this.temperature + "°C"
    },

    getIcon(){
      if(this.cloudcover<30){
        return '../src/assets/sun-regular.svg'
      } else if(this.cloudcover<70){
        return "../src/assets/cloud-sun-solid.svg"
      } else {
        return "../src/assets/cloud-solid.svg"
      }
    }
  }
}
</script>

<template>
  <div class="base displayhourly">
    <img class="icon" :src="getIcon"/>
    <span class="temp">{{getTemperature}}</span>
    <span class="time">{{getHour}}</span>
  </div>
</template>

<style>
  .base{
    display: block;
    min-width: 160px;
    max-width: 170px;

    min-height: 120px;
    border: 1px black solid;
    margin: 10px;
    position: relative;
  }

  .temp{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 40px;
  }

  .time{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .icon{
    position: absolute;
    width: 90px;
    height: 90px;
    left: 40%;
    top: 55%;
    transform: translate(-50%, -50%);
  }
</style>