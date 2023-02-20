// Arrow functions takes parameters and can return a datatype or objects

// arrow functions can be passed as a callback parameter
const sayHello = () => console.log('Hello World')
setTimeout(sayHello, 1000)

//=== Arrow functions takes parameters like normal functions === //

// no need for the return keyword and the parameter brackets are optional
const oneParamArrowFunction = (name) => 'hello' + name

// no need for curly braces because it does'nt return nothing
const twoParamArrowFunctionWithoutReturn = (first, last) =>
  `Hello ${first} ${last}`

// since the code returns a value using the 'return' keyword, it MUST be in curly brackets
const twoParamArrowFunctionWithReturn = (first, last) => {
  return `Hello ${first} ${last}`
}

const twoParamATwoLinesArrowFunction = (first, last) => {
  const greeting = `Hello`
  return `${greeting} ${first} ${last}`
}
