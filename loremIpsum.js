/*
  la seule propriété interessante : "length" équivaut au nombre de paragraphe. Au vu de l'api utilisée, ca change pas grand chose mais la longueur générale du texte

  Note : mettre le loremIpsum.css dans le même dossier (css d'un paragraphe)

*/



function load()
{

    let link = "./loremIpsum.css"
    let head = document.querySelector("head")
    let balise = head.insertBefore( document.createElement("link"), head.firstChild)

    balise.setAttribute("href", link)
    balise.setAttribute("rel", 'stylesheet')
}

class LoremIpsum extends HTMLElement 
{
  constructor()
  {
    super()

    this.shadow = this.attachShadow({mode : "open"})
  }

  async callApi(p){
    let req = new XMLHttpRequest()

    req.open("GET", `https://api.api-ninjas.com/v1/loremipsum?paragraphs=${p}`)

    req.setRequestHeader("X-Api-Key", "uGzfUAwJAjYL5He00AtRlw==8qctJKjDHBwNXOH5")

    req.responseType = "json"

    req.onreadystatechange = ()=>{
      if(req.readyState == XMLHttpRequest.DONE)
      {
        this.shadow.innerHTML = req.response.text
      }
    }

    req.send()
  }

  attributeChangedCallback(key, old, _new){
    this.callApi(_new)
  }

  
  shadow
  static get observedAttributes(){return ["length"]}
}

customElements.define("lorem-ipsum", LoremIpsum);
load()
