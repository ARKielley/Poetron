const brain = require('brain.js')
// let testNet = new brain.recurrent.LSTMTimeStep()
// testNet.train([[1,2,3,4,5,6,1,7,4,9,4,6,1,2,3,4,5,6]])
// testNet.train([[1,2,3,4,5,6]])
// testNet.train([[1,5,3,4,5,6]])
// testNet.train([[1,9,3,4,5,6]])
// console.log(testNet.run([1]))
let thomasDelahaye = require('./data/thomas-delahaye')
const tenThousand = require('./data/ten-thousand-words')
const { shuffle, createDictionary, mergeDictionaries, dictionaryFromAll, dictionarizeString, dictionarizeAuthor, lookUpEntry, filterCommonWords, filterAuthor } = require('./scripts')

// const thomasDictionary = dictionaryFromAll([thomasDelahaye])
const thomasDictionary = createDictionary(thomasDelahaye.data[0])
// console.log(thomasDictionary)
const baseDictionary = createDictionary(shuffle(tenThousand.split(' ')).join(' '))
const commonDictionary = mergeDictionaries([baseDictionary, thomasDictionary])
console.log(commonDictionary.length)

function trainAll(net, dictionary, authorObj) {
  const filteredAuthorObj = filterAuthor(authorObj, 1, 0.9)
  const dictionarizedAuthor = dictionarizeAuthor(filteredAuthorObj, dictionary)
  const joinedPoems = dictionarizedAuthor.reduce((total, poemData) => [...total, ...poemData])
  console.log(joinedPoems)

  // for (let i = 5; i < 10; i++) {
  //   console.log(`training poem number ${i+1}`)
  //   console.log(`poem starts with ${dictionarizedAuthor[i][0]}, length of ${dictionarizedAuthor[i].length}`)
  //   net.train([dictionarizedAuthor[i]])
  // }
  net.train([joinedPoems.slice(0, 100)])
  console.log(net.toJSON())
}
// console.log(thomasDictionary[1973])



function sendNick() {
  let thomasNet = new brain.recurrent.LSTMTimeStep()
  trainAll(thomasNet, commonDictionary, thomasDelahaye)
  return thomasNet.toJSON()
}

module.exports = sendNick



// let testRun = dictionarizeString('blood', thomasDictionary)
// console.log(testRun)
// let thomasNumber = thomasNet.run(testRun)
// console.log(thomasNumber)
// let word = lookUpEntry(Math.round(thomasNumber), thomasDictionary)
// testStr = word
// console.log(testStr)
// testRun = dictionarizeString(testStr, thomasDictionary)
// console.log(testRun)
// thomasNumber = thomasNet.run(testRun + 10)
// word = (lookUpEntry(Math.round(thomasNumber), thomasDictionary))
// testStr = word
// console.log(testStr)
// testRun = dictionarizeString(testStr, thomasDictionary)
// console.log(testRun)
// thomasNumber = thomasNet.run(testRun + 10)
// word = (lookUpEntry(Math.round(thomasNumber), thomasDictionary))
// testStr = word
// console.log(testStr)
// testRun = dictionarizeString(testStr, thomasDictionary)
// console.log(testRun)
// thomasNumber = thomasNet.run(testRun + 10)
// word = (lookUpEntry(Math.round(thomasNumber), thomasDictionary))
// testStr = word
// console.log(testStr)