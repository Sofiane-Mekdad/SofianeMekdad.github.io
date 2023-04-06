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

  <div class="centerhourly">
    <button class="scrollbutton" @click="moveLeft()">⟨</button>
    <div class="hourly">
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
      
        :id:index='firstIndexHourly+numberToShow'
        :cloudcover="hourly.cloudcover[firstIndexHourly+numberToShow]"
        :rain="hourly.rain[firstIndexHourly+numberToShow]" 
        :snowfall="hourly.snowfall[firstIndexHourly+numberToShow]" 
        :temperature="hourly.temperature[firstIndexHourly+numberToShow]" 
        :time="hourly.time[firstIndexHourly+numberToShow]"
      />
    </div>
    <button class="scrollbutton" @click="moveRight()">⟩</button>
  </div>
</template>

<style>
  .hourly{
    width: 1280px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px black solid;
  }

  .centerhourly{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1600px;
    margin-right: auto;
    margin-left: auto;
  }

  .scrollbutton{
    height: 117px;
    font-size: 50px;
    vertical-align: middle;
    width: 67px;
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