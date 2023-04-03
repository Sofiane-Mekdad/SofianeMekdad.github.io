<template>
  <div class="base displayhourly">
    cloudcover : {{cloudcover}} <br/>
    rain : {{rain}} <br/>
    snowfall : {{snowfall}} <br/>
    temperature : {{temperature}} <br/>
    time : {{time}}
  </div>
</template>

<script>
export default {
  props : {
    cloudcover : 0,
    rain : 0,
    snowfall : 0,
    temperature : 0,
    time : 0,
    index : 0

  }
}
</script>

<style>
  .base{
    display: block;
    min-width: 150px;
    border: 1px black solid;
    margin: 10px;
  }
</style>