const fs = require('fs')

var operations = {
  sqrt: 'sqrt()',
  cbrt: 'cbrt()',
  division: '/',
  multiply: '*',
  addition: '+',
  subtraction: '-',
  exponent: '^',
  modulo: '%',
  functions : {
    sin: function (x) {
      return Math.sin(x)
    },
    cos: function (x) {
      return Math.cos(x)
    },
    tan: function (x) {
      return Math.tan(x)
    },
    asin: function (x) {
      return Math.asin()
    },
    acos: function (x) {
      return Math.acos()
    },
    atan: function(x) {
      return Math.atan()
    }
  }
}

var program  = {
  functions: {},
  variables: {},
  listed_variables: [],
  listed_functions: [],
}

contents = fs.readFileSync('math.mat', 'utf-8')

// console.log(contents)

contents.split("\n").forEach(function solve(line, index) {
  // console.log(line)
  // console.log(line.split("=")[0].split(" ").join("").match(/[A-Za-z]\((.*)\)/g) == line.split("=")[0].split(" ").join(""))
  if (line.includes('=') && (line.split("=")[0].split(" ").join("").match(/[A-Za-z]\((.*)\)/g) == line.split("=")[0].split(" ").join(""))) {
    console.log(`${index}: function: ${line}\n`)
    let name = line.split("(")[0]
    let args = line.split("(")[1].split(")")[0]
    let body = line.split("=")[1]
    program.functions[name] = {
      name: name,
      args: args,
      body: body
    }
    program.listed_functions.push(name)
  }
  else if (line.includes("=")) {
    console.log(`${index}: variable: ${line}\n`)
    let name = line.split("=")[0].split(" ").join("")
    let value = line.split("=")[1].split(" ").join("")
    program.variables[name] = value
    program.listed_variables.push(name)
  }
  else {
    let final = 0
    let cop = "+"
    line = line.replace('sqrt', 'Math.sqrt')
    line = line.replace('cbrt', 'Math.cbrt')
    let count = 0
    line.split(" ").forEach(function fixop(op) {
      if(op == "+"){
      cop = "+"
      return 
    }else if(op == "-"){
      cop = "-"
      return 
    }else if(op == "*"){
      cop = "*"
      return 
    }else if(op == "/"){
      cop = "/"
      return 
    }
      // console.log(op)
      if(program.listed_variables.includes(op)){
                // console.log(op)
          op = program.variables[op]

        }else if(program.listed_functions.includes(op.split("(")[0])){
          op = program.functions[op.split("(")[0]].body.split(program.functions[op.split("(")[0]].args).join(op.split("(")[1].split(")")[0])
        }

      // if(count != 1){
      //         count = 1
      //   fixop(op)
      // }
if(cop == '+'){
  // console.log(cop)
          final += eval(op)
        }else if(cop == "-"){
          final -= eval(op)
        }else if(cop == "*"){
          final *= eval(op)
        }else if(cop == "/"){
          final /= eval(op)
        }
    
    })
    console.log(`${index}: ${line} = ${final}\n`)
  }
});

// console.log(program)

// program.listed_variables.includes(query)
