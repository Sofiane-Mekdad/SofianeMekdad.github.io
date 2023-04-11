<template>
  <svg height="400" width="1200">
    <polygon :points="graphDraw"></polygon>
  </svg>
</template>

<script>
export default {
  data(){return{
    pointArray : [],
    datas : []
  }},

  computed: {
    graphDraw : function(){
      if(this.arrayMaking.length == 0){
        return ""
      }
      let string = "0 400, "
      for(let i = 0; i<this.arrayMaking.length; i++)
      { 

        string = string.concat(this.arrayMaking[i].x, " ", this.arrayMaking[i].y, ", ")
      }
      string = string.concat("1200 400")
      return string
    },

    arrayMaking : function(){
      if(this.datas.length==0){return []}
      let array = []
      
      let widht = 1200/this.datas.length
      let min = Math.min(...this.datas)
      let max = Math.max(...this.datas)

      for(let i = 0; i<this.datas.length; i++){
        array[i] = {
          x: Math.trunc(i*widht),
          y: Math.trunc((this.datas[i]-min)/ (max-min) * 400)
        }
      }
      return array 
    }
  }
}
</script>

<style>
  svg{
    margin-top: 50px;
  }
</style>