'use strict'
const brain = require('brain.js')
const db = require('../server/db')
const fs = require('fs')
const { Net } = require('../server/db/models')
const { thomas, ginsberg, spenser, snyder, ashbery, fabbro, auden, shakespeare } = require('./training/data')
const {tokenizeString} = require('./training/new-approach')
const {shuffle} = require('./new-approach')

const firstHundredAuthors = [
  {
    input: (tokenizeString(thomas.data.join(' '))).slice(0, 100),
    output: '1'
  },
  {
    input: (tokenizeString(ginsberg.data.join(' '))).slice(0, 100),
    output: '2'
  },
  {
    input: (tokenizeString(spenser.data.join(' '))).slice(0, 100),
    output: '3'
  },
  {
    input: (tokenizeString(snyder.data.join(' '))).slice(0, 100),
    output: '4'
  },
  {
    input: (tokenizeString(ashbery.data.join(' '))).slice(0, 100),
    output: '5'
  },
  {
    input: (tokenizeString(fabbro.data.join(' '))).slice(0, 100),
    output: '6'
  },
  {
    input: (tokenizeString(auden.data.join(' '))).slice(0, 100),
    output: '7'
  },
  {
    input: (tokenizeString(shakespeare.data.join(' '))).slice(0, 100),
    output: '8'
  }
]

 

let net = new brain.recurrent.LSTM()

net.train(firstHundredAuthors, {
  // Defaults values --> expected validation
iterations: 400,    // the maximum times to iterate the training data --> number greater than 0
errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
logPeriod: 20,        // iterations between logging out --> number greater than 0
learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1
momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
callback: null,       // a periodic call back that can be triggered while training --> null or function
callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
})

async function seed() {
  await db.sync()
  console.log('db synced!')

  const testFunc = net.toFunction().toString()
  const fullText = `module.exports = ${testFunc}`
  // console.log(testFunc(['a']))
  fs.writeFile('genre-net-function.js', fullText, function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  // const testNet = new brain.recurrent.LSTM()
  // testNet.fromJSON(testJSON)
  // console.log(testNet.run(['a']))

  // const nets = await Promise.all([
  //   Net.destroy({where: {category: 'authors'}}),
  //   Net.create({category: 'authors', data: net.toFunction().toString()}),
  // ])

  // console.log(`seeded ${nets.length - 1} nets`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
