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
    <header>
      <Header/>
    </header>
    <Body ref="test"/>
  </div>
</template>

<style scoped>
  Header{
    display: block;
    margin-left : auto;
    margin-right: auto; 
    width: 300px;
  }
</style>
