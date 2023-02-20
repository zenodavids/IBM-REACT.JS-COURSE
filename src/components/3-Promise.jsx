// ! Promises are use to avoid callbacks
// the promise object represents the eventual completion of an asynchronous operation and its value
//  When you invoke an asynchronous operation, a promise is in a pending state.
//  When the operation executes successfully, the promise is said to be fulfilled.
// When the operation fails, the promise is said to be rejected.

// instead of this ❌
let promiseArgument = (resolve, reject) => {
  setTimeout(() => {
    let currentTime = newDate().getTime()
    currentTime % 2 == 0 ? resolve('success') : reject('failed')
  }, 2000)
}

let myBadPromise = new Promise(promiseArgument)

// Do this ✅
let myCorrectPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let currentTime = newDate().getTime()
    currentTime % 2 == 0 ? resolve('success') : reject('failed')
  }, 2000)
})
