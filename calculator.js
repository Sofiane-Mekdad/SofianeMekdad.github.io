export class Calculator {

  static regexOperation =  /[\+\-\*\^\/]/g
  static regexNumber = /[\d.]/g

  static regexFunction = /[a-zA-Z]+\([a-zA-Z0-9\+\-\*\^\/,.]+\)/g
  static regexFuncName = /[a-zA-Z]+/g
  static regexArgument = /[0-9.\+\-\*\^\/]+/g
  
  static regexParenthesis = /\([0-9\+\-\*\^\/]+\)/g

  

  static maxPriorityLevel = 2
  static operationArray = {
    "+" : 
    {
      function : (a, b)=>Number(a)+Number(b),
      priority : 0
  
    }, 
    "-" : 
    {
      function : (a,b)=>Number(a)-Number(b),
      priority : 0
    },
    "/" : 
    {
      function : (a,b)=>Number(a)/Number(b),
      priority : 1
    },
    "*" : 
    {
      function : (a,b)=> Number(a)*Number(b),
      priority : 1
    },
    "%" : 
    {
      function : (a,b)=>Number(a)%Number(b),
      priority : 1
    },

    "^" :
    {
      function : (a,b)=>Math.pow(Number(a),Number(b)),
      priority : 2
    }
  }

  static shortcutList = [
    {
      short : /[pP][iI]/g,
      value : Math.PI
    },
    {
      short : /[eE]/g,
      value : "*10^"
    }
  ]

  static removeSpaces(string)
  {
    let regex = /\s/g
    return string.replaceAll(regex, "")
  }

  static splitNumber(string)
  {
    let regexOperation = new RegExp(Calculator.regexOperation)
    let array = string.split(regexOperation)
    for(let i = array.length-1; i>=0; i--)
    {
      if(array[i] === ""){
        array.splice(i, 1)
      }
    }

    return array
  }

  static splitSymbol(string)
  { 
    let regexNumber = new RegExp(Calculator.regexNumber)
    let array = string.split(regexNumber)

    for(let i = array.length-1; i>=0; i--)
    {
      if(array[i] === ""){
        array.splice(i, 1)
      }
    }
    return array
  }

  static parseParenthesis(string)
  {
  while(true)
  {
    let funcArray = string.match(new RegExp(Calculator.regexFunction))
    if(funcArray != null)
    {
      for(let i=0; i<funcArray.length; i++){
        
        let func = funcArray[i]
        
        let funcName = func.match(new RegExp(Calculator.regexFuncName))[0]
        let argument = func.match(new RegExp(Calculator.regexArgument))
        
        for(let j =0; j<argument.length;j++){
          argument[j] = Calculator.parseParenthesis(argument[j])
        }
        
        let result = Math[funcName](...argument)
        
        string = string.replace(func, result)
      }

      continue
    }

    let subStringArray = string.match(new RegExp(Calculator.regexParenthesis))
    
    if(subStringArray == null)
    {
      break
    }
    for(let i = 0; i<subStringArray.length; i++){
      
      let copy = subStringArray[i].substring(1, subStringArray[i].length-1)
      let result = Calculator.resolve(copy)
      string = string.replace(subStringArray[i], result)
    }

  }
  return Calculator.resolve(string)
  }

  static shortcut(string)
  {
    for(let i = 0; i<Calculator.shortcutList.length; i++)
    {
      let entries = Calculator.shortcutList[i]
      let shortcut = entries.short
      let value = entries.value
      string = string.replaceAll(shortcut, value)

    }

    return string
  }

  static resolve(string)
  {
    let whiteLess = Calculator.removeSpaces(string)
    let arrayNumber = Calculator.splitNumber(whiteLess)
    let arraySymbol = Calculator.splitSymbol(whiteLess)
    let priorityLevel = Calculator.maxPriorityLevel
    while(arraySymbol.length>0)
    {
      let isBreak = false
      for(let i = 0; i<arraySymbol.length; i++)
      {

        let symbol = arraySymbol[i]
        if(symbol.length ==2)
        {
          arraySymbol[i] = symbol.slice(0,1)
          console.log(symbol[1])
          if(symbol[1] == "-")
          {
            console.log("return -")

            arrayNumber[i+1] *= -1 
          }else if(symbol[1] == "+")
          {
            console.log("return +")
          } else
          {
            console.log("error")
            throw null
          }

        }
        let operation = Calculator.operationArray[arraySymbol[i]]
        if(operation.priority === priorityLevel)
        {
          console.log(arrayNumber[i], arraySymbol[i], arrayNumber[i+1])
          let result = operation.function(arrayNumber[i], arrayNumber[i+1])
          arrayNumber.splice(i,1)
          arrayNumber[i] = result
          arraySymbol.splice(i,1)
          isBreak = true
          break
        }
      }
      if(!isBreak){
        priorityLevel--
      }
    }

    return arrayNumber[0]
  }

  static calculate(string)
  {
    string = Calculator.shortcut(string)
    string = Calculator.removeSpaces(string)
    return Calculator.parseParenthesis(string)
  }

}
