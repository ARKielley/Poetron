// const testingData = [
//   {
//     input: "Testing testing I am testing my neural net. Hopefully this test will pass testing.",
//     output: {testing: 1}
//   }
// ]

// const brain = require('brain.js')
// const {Net} = require('../../server/db/models')
// const {tokenizeString} = require('./new-approach.js')
// const twoHundred = require('./data/two-hundred-common.js')

// const williamShakespeare = require('./data/william-shakespeare')
// const garySnyder = require('./data/gary-snyder')

// function encode(str) {
//   return str.replace(/[^\x00-\x7F]/g, '')
//     .split('').map(x => (x.charCodeAt(0) / 255))
// }

// function filterThousand(arr) {
//   return arr.filter(elem => !twoHundred.includes(elem))
// }

// // function process(data) {
// //   return data.map(datum => ({
// //     input: encode(datum)
// //   }))
// // }

// const joinedShakespeare = encode(williamShakespeare.data.join())
// const joinedSnyder = encode(garySnyder.data.join())

// const numberCompare = [
//   {
//     input: joinedShakespeare.slice(0, 100),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedShakespeare.slice(100, 200),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedShakespeare.slice(200, 300),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedShakespeare.slice(300, 400),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedShakespeare.slice(400, 500),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedSnyder.slice(0, 100),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedSnyder.slice(100, 200),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedSnyder.slice(200, 300),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedSnyder.slice(300, 400),
//     output: {shakespeare: 1}
//   },
//   {
//     input: joinedSnyder.slice(400, 500),
//     output: {shakespeare: 1}
//   }
// ]


// const testCompare = [
//   {
//     input: (tokenizeString(williamShakespeare.data.join(' '))).slice(0, 50),
//     output: '0'
//   },
//   // {
//   //   input: williamShakespeare[0].slice(50, 100),
//   //   output: 'shakespeare'
//   // },
//   // {
//   //   input: garySnyder[1].slice(0, 50),
//   //   output: 'snyder'
//   // },
//   {
//     input: (tokenizeString(garySnyder.data.join(' '))).slice(0, 50),
//     output: '1'
//   }
// ]

// console.log('starting...')

// // let net = new brain.recurrent.LSTM()
// // let net = new brain.NeuralNetwork()

// // net.train(testCompare, {
// //   // Defaults values --> expected validation
// // iterations: 4000,    // the maximum times to iterate the training data --> number greater than 0
// // errorThresh: 0.0100,   // the acceptable error percentage from training data --> number between 0 and 1
// // log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
// // logPeriod: 100,        // iterations between logging out --> number greater than 0
// // learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1
// // momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
// // callback: null,       // a periodic call back that can be triggered while training --> null or function
// // callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
// // timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
// // });
// // console.log(net)

// // let netB = new  brain.recurrent.LSTM()
// // netB.train(numberCompareB)
// // console.log(netB.toFunction())

// // const res1 = net.run(filterThousand(tokenizeString(garySnyder[1])).slice(100, 160))
// // const res2 = net.run(filterThousand(tokenizeString(williamShakespeare[0])).slice(100, 160))

// // console.log(res1.match(/\d/)[0], res2.match(/\d/)[0])

const netFunc = require('../../genre-net-function.txt')
console.log(netFunc(['a']))