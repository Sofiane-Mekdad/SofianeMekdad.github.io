

const button = document.getElementById("button")
const audio = document.getElementById("audio")

let state = "false"
button.addEventListener("click", function(e){
  if(state === "false"){
    const audioContext = new AudioContext()
    const track = audioContext.createMediaElementSource(audio)
    track.connect(audioContext.destination)
    audio.play()
    state = "played"
  }else if (state === "played"){
    audio.pause()
    state = "paused"
  }else{
    audio.play()
    state = "played"
  }
  
})