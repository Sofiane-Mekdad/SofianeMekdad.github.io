<script>
import Header from './components/header.vue'
import Body from './components/body.vue'
export default {
  components : {Header, Body},

  methods : {
    returnRef(){
      console.log(this.$refs)
    }
  }
}
</script>

<template>
  <div class="app">
    <Header/>
    <Body ref="test"/>
  </div>
</template>

<style scoped>
  Header{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
