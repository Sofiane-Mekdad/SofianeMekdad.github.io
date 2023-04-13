<template>
  <svg height="400" width="1200">
    <polygon :points="new_graphDraw">
      <animate ref="animation"
        begin="indefinite"
        attributeName="points"
        :from="old_graphDraw"
        :to="new_graphDraw"
        dur="0.25s"
        repeatCount="once"
        />
    </polygon>
  </svg>
</template>

<script>
export default {
  data(){return{
    pointArray : [],
    datas : [],
    oldDatas : [],
    newDatas : []
  }},

  computed: {
    new_graphDraw : function(){
      if(this.new_arrayMaking.length == 0){
        return ""
      }
      let string = "0 400, "
      for(let i = 0; i<this.new_arrayMaking.length; i++)
      { 

        string = string.concat(this.new_arrayMaking[i].x, " ", 400-this.new_arrayMaking[i].y, ", ")
      }
      string = string.concat("1200 400")
      return string
    },

    old_graphDraw : function(){

      if(this.old_arrayMaking.length == 0)
      {
        let string = ""
      }
      let string = "0 400, "
      for(let i = 0; i<this.old_arrayMaking.length; i++)
      { 

        string = string.concat(this.old_arrayMaking[i].x, " ", 400-this.old_arrayMaking[i].y, ", ")
      }
      string = string.concat("1200 400")
      return string
    },

    old_arrayMaking : function(){
      if(this.oldDatas.length==0)
      { 
        let array = []
        let widht = 1200/this.newDatas.length
        for(let i = 0; i<this.newDatas.length; i++)
        {
        array[i] = {
          x: Math.trunc(i*widht),
          y: 0
        }
        }
        return array
      }
      let array = []
      
      let widht = 1200/this.oldDatas.length
      let min = Math.min(...this.oldDatas)
      let max = Math.max(...this.oldDatas)

      for(let i = 0; i<this.oldDatas.length; i++){
        array[i] = {
          x: Math.trunc(i*widht),
          y: Math.trunc((this.oldDatas[i]-min)/ (max-min) * 400)
        }
      }
      return array 
    },

        new_arrayMaking : function(){
      if(this.newDatas.length==0){return []}
      let array = []
      
      let widht = 1200/this.newDatas.length
      let min = Math.min(...this.newDatas)
      let max = Math.max(...this.newDatas)

      for(let i = 0; i<this.newDatas.length; i++){
        array[i] = {
          x: Math.trunc(i*widht),
          y: Math.trunc((this.newDatas[i]-min)/ (max-min) * 400)
        }
      }
      return array 
    }
  },

  watch:{
    datas : {
      handler(value){
        this.oldDatas = this.newDatas
        this.newDatas = value

        this.$refs.animation.beginElement()
      },
      deep: true
    }
  }
}
</script>

<style>
  svg{
    margin-top: 50px;
  }
</style>