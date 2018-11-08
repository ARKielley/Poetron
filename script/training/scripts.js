const brain = require('brain.js')

let trainedNet;

function shuffle(arr) { // faster than destructuring swap
  var i, j, temp
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
  }
  return arr
}

function getRandomSelection(arr, percentage) {
  if (arr.length < 2 || percentage >= 1) return arr
  const percentIndex = Math.ceil(arr.length * percentage)
  return shuffle(arr).slice(0, percentIndex)
}

function encodeBySingleChars(arg) {
   return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function tokenizeString(str) {
  return str.replace(/([\r\n,\.;-!?])/g, (match) => ' ' + match).split(' ')
}

function createDictionary(str) {
  let i = 1
  return tokenizeString(str).reduce((dict, curr) => {
      if (!dict[curr]) {
        dict[curr] = 1
        i++
      }
      return dict
    }, {})
}

function mergeDictionaries(...args) {
  let i = 1
  return args.reduce((totalDict, currDict) => {
    const entryKeys = Object.keys(currDict)
    entryKeys.forEach(key => {
      if (!totalDict[key]) {
        totalDict[key] = i
        i++
      }
    }, {})
  })
}

function pairWordInputOutput(str) {
  const tokens = tokenizeString(str)
  const coll = []
  for (let i = 0; i < tokens.length - 1; i++) {
    coll.push({ input: tokens[i], output: tokens[i+1] })
  }
  return coll
}

function trainWordPairs(coll) {
  let net = new brain.recurrent.LSTM()
}


module.exports = {
  encodeBySingleChars,

}

// const testTrainingData = [
//   {input: 'the', output: 'bear'},
//   {input: 'the', output: 'board'},
//   {input: 'the', output: 'wine'},
//   {input: 'the', output: 'level'},
//   {input: 'the', output: 'when'},
//   {input: 'the', output: 'two'},
//   {input: 'the', output: 'forshame'},
//   {input: 'the', output: 'why'},
  

// ]

// console.log('i am here')
// let net = new brain.recurrent.LSTM()
// net.train(testTrainingData, {
//   // Defaults values --> expected validation
// iterations: 200,    // the maximum times to iterate the training data --> number greater than 0
// errorThresh: 0.01,   // the acceptable error percentage from training data --> number between 0 and 1
// log: false,           // true to use console.log, when a function is supplied it is used --> Either true or a function
// logPeriod: 10,        // iterations between logging out --> number greater than 0
// learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1
// momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
// callback: null,       // a periodic call back that can be triggered while training --> null or function
// callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
// timeout: 10000     // the max number of milliseconds to train for --> number greater than 0
// })
// console.log('done')


// console.log(net.run('the'))
// console.log(net.run('the'))
// console.log(net.run('the'))
// console.log(net.run('the'))
// console.log(net.run('the'))
// console.log(net.run('the'))

console.log('initialized')

let net = new brain.recurrent.LSTMTimeStep()

net.train([[3,40,3,41,3,20,3,40,3,20]])
// const first = net.run([4])
// const secone = net.run([Math.round(first)])
// console.log(first, secone)
console.log(net.run([3]))