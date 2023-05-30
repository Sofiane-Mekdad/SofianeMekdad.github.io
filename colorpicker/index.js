let buttons = document.querySelectorAll("button")

let inputs = document.querySelectorAll("input")
console.log(inputs)
inputs[0].addEventListener("change", (e)=>{
  document.querySelector(":root").style.setProperty("--colorOne", e.target.value)
  console.log("one")
})

inputs[1].addEventListener("change", (e)=>{
  console.log("two")
  document.querySelector(":root").style.setProperty("--colorTwo", e.target.value)
})