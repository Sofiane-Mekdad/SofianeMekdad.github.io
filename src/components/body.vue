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
    timezone : String,

    firstIndexHourly : 0,
    numberToShow : 7
    }
  },
    
  methods : {
    moveLeft(){
      if(this.firstIndexHourly<=0){return}
      
      let tab = document.querySelectorAll(".displayhourly")
      for(let i = 0; i<tab.length; i++){
        let lmn =tab[i]

        lmn.classList.add('anim')

        if(lmn.id == "left"){
          lmn.addEventListener("animationend", ()=>{
            this.firstIndexHourly--
            let tab = document.querySelectorAll(".displayhourly")
            for(let i = 0; i<tab.length; i++){
              let lmn =tab[i]
              lmn.classList.remove("anim")
            }
          }, {once : true})
        }
      }
    },

    moveRight(){
      if(this.firstIndexHourly>=this.hourly.time.length-this.numberToShow){return}

            let tab = document.querySelectorAll(".displayhourly")
      for(let i = 0; i<tab.length; i++){
        let lmn =tab[i]

        lmn.classList.add('anim2')

        if(lmn.id == "left"){
          lmn.addEventListener("animationend", ()=>{
            this.firstIndexHourly++
            let tab = document.querySelectorAll(".displayhourly")
            for(let i = 0; i<tab.length; i++){
              let lmn =tab[i]
              lmn.classList.remove("anim2")
            }
          }, {once : true})
        }
      }
    }
  }
}

</script>

<template>
  <div class="daily">
    <DisplayHourly id="left"
      :id:index='firstIndexHourly-1'
      :cloudcover="hourly.cloudcover[firstIndexHourly-1]"
      :rain="hourly.rain[firstIndexHourly-1]" 
      :snowfall="hourly.snowfall[firstIndexHourly-1]" 
      :temperature="hourly.temperature[firstIndexHourly-1]" 
      :time="hourly.time[firstIndexHourly-1]"

    />
    <DisplayHourly  v-for="index in numberToShow" :key="index" 
      :index='index-1'
      :cloudcover="hourly.cloudcover[index+firstIndexHourly-1]"
      :rain="hourly.rain[index+firstIndexHourly-1]" 
      :snowfall="hourly.snowfall[index+firstIndexHourly-1]" 
      :temperature="hourly.temperature[index+firstIndexHourly-1]" 
      :time="hourly.time[index+firstIndexHourly-1]"
    />
    <DisplayHourly id="right"
    
      :id:index='firstIndexHourly+1+numberToShow'
      :cloudcover="hourly.cloudcover[firstIndexHourly+1+numberToShow]"
      :rain="hourly.rain[firstIndexHourly+1+numberToShow]" 
      :snowfall="hourly.snowfall[firstIndexHourly+1+numberToShow]" 
      :temperature="hourly.temperature[firstIndexHourly+1+numberToShow]" 
      :time="hourly.time[firstIndexHourly+1+numberToShow]"

    />
  </div>
  <button @click="moveLeft()">test2</button>
  <button @click="moveRight()">test</button>
</template>

<style>
  .daily{
    width: 1200px;
    display: flex;
    margin-right: auto;
    margin-left: auto;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px black solid;
  }

  .anim{
    animation: slideLeft 0.25s linear 0s 1 normal none running;
  }

  .anim2{
    animation: slideRight 0.25s linear 0s 1 normal none running;
  }

  @keyframes slideLeft {
    from {
      transform: translateX(0);
    } to {
      transform: translateX(171px);
    }
  }

  @keyframes slideRight {
    from {
      transform: translateX(0);
    } to {
      transform: translateX(-171px);
    }
  }

</style>