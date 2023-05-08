import { createApp } from 'vue'
import App from './App.vue'

let app = createApp(App).mount('#app')

app.returnRef()
navigator.geolocation.getCurrentPosition((a)=>{
  console.log(a.coords)
  let req = new XMLHttpRequest()
  req.open("GET", `https://api.open-meteo.com/v1/forecast?latitude=${a.coords.latitude}&longitude=${a.coords.longitude}&hourly=temperature_2m,rain,snowfall,cloudcover&daily=sunrise,sunset&timeformat=unixtime&timezone=auto`)
  

  req.onreadystatechange = ()=>{
    if(req.readyState !=4){return}
    let jsonData = JSON.parse(req.response)
    console.log(jsonData)

    for(let i = 0; i<jsonData.hourly.time.length; i++){

      app.$refs.test.hourly.cloudcover[i] = jsonData.hourly.cloudcover[i]
      app.$refs.test.hourly.rain[i] = jsonData.hourly.rain[i]
      app.$refs.test.hourly.snowfall[i] = jsonData.hourly.snowfall[i]
      app.$refs.test.hourly.temperature[i] = jsonData.hourly.temperature_2m[i]
      app.$refs.test.hourly.time[i] = jsonData.hourly.time[i]

      app.$refs.chart.datas[i] = jsonData.hourly.temperature_2m[i]
    }

    for(let i = 0; i<jsonData.daily.time.length; i++){
      app.$refs.test.daily.sunrise[i] = jsonData.daily.sunrise[i]
      app.$refs.test.daily.sunset[i] = jsonData.daily.sunset[i]
      app.$refs.test.daily.time[i] = jsonData.daily.time[i]
    }
  }

  req.send()

}, ()=>{console.log("fail")})