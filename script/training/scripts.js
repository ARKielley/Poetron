const brain = require('brain.js')
const thomas = require('./data/thomas-delahaye')

module.exports = {
  filterPunctuation, filterReturnActive,
  getRandomSelection, tokenizeString,
  createDictionary, mergeDictionaries,
  dictionaryFromAll, dictionarizeString,
  dictionarizeAuthor, lookUpEntry, 
  makeIOTrainingData, filterCommonWords,
  filterAuthor, shuffle
}

let trainedNet;
const irrelevantRegEx = /[^\s,\.;—\-’a-zA-Z]/g
const nonWordsRegEx = /[\r\n,\.;—\-]/g

function shuffle(arr) { 
  var i, j, temp
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      temp = arr[i] // faster than destructuring swap
      arr[i] = arr[j] 
      arr[j] = temp
  }
  return arr
}

function filterPunctuation (percentage) {
  return Math.random() < percentage
}

function filterReturnActive (rate) {
  const RATE_TABLE = [0.2, 0.5, 0.8, 1]
  return Math.random() < RATE_TABLE[rate - 1] // true means filter, false means keep
}

function getRandomSelection(arr, percentage) {
  if (arr.length < 2 || percentage >= 1) return arr
  const percentIndex = Math.ceil(arr.length * percentage)
  return shuffle(arr).slice(0, percentIndex)
}

// function encodeBySingleChars(arg) {
//    return arg.split('').map(x => (x.charCodeAt(0) / 255));
// }

function tokenizeString(str) {
  //fix this dumb double-replace
  return str.toLowerCase()
    .replace(irrelevantRegEx, '')
    .replace(nonWordsRegEx, (match) => ` ${match} `)
    .split(' ')
    .filter(t => t)
}

// console.log(tokenizeString(`i have
// no real? friends—we? want. but, lo; happiness!`))

function createDictionary(str) {
  let i = 1
  return tokenizeString(str).reduce((dict, curr) => {
      if (!dict[curr]) {
        dict[curr] = i
        i++
      }
      return dict
    }, {})
}

function mergeDictionaries(dictionaries) {
  let i = 1
  return dictionaries.reduce((totalDict, currDict) => {
    const entryKeys = Object.keys(currDict)
    // console.log(entryKeys)
    entryKeys.forEach(key => {
      if (!totalDict[key]) {
        totalDict[key] = i
        i++
      }
    })
    return totalDict
  }, {})
}

function dictionaryFromAll(authorObjArr) { ////////////**********!!!!!!!!!!!********** */
  return mergeDictionaries(authorObjArr.map(authorObj => 
    mergeDictionaries(authorObj.data.map(poem => 
      createDictionary(poem)))))
}

function dictionarizeString(str, dictionary) { ///**********!!!!!!!!!!!!!!!!!!!!!!!/ */
  return tokenizeString(str).map(token => dictionary[token])
}

function dictionarizeAuthor(authorObj, dictionary) {
  return authorObj.data.map(poem => dictionarizeString(poem, dictionary))
} //returns array

function lookUpEntry(entryNum, dictionary) {
  for (let word in dictionary) {
    if (dictionary[word] === entryNum) return word
  }
  return ''
}




function makeIOTrainingData(authorObj, parameter) {
  return authorObj.data.map(poem => ({input: poem, output: authorObj[param]}))
}

// function recogTrainingDataFromAuthor(authorObj, type)


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

// console.log('initialized')

// let net = new brain.recurrent.LSTMTimeStep()

// const testPoem = `the rain in spain
// falls mainly on the plain`
// const tokenizedPoem = tokenizeString(testPoem)
// console.log(tokenizedPoem)
// const testDictionary = createDictionary(testPoem)
// console.log('Dictionary from poem: ', testDictionary)
// const netInput = dictionarizeString(testPoem, testDictionary)
// console.log('Dictionarized poem: ', netInput)
// netTestInput = dictionarizeString('rain', testDictionary)
// console.log('Net test input: ', netTestInput)

// net.train([netInput])
// console.log(net.run(netTestInput))
// const jsonized = net.toJSON()
// const regotten = new brain.recurrent.LSTMTimeStep()
// regotten.fromJSON(jsonized)
// console.log(regotten)


// net.train([[3,40,3,41,3,20,3,40,3,20]])
// net.train([[3, 99, 77, 3, 99, 77]])
// const first = net.run([4])
// const secone = net.run([Math.round(first)])
// console.log(first, secone)
// console.log(net.run([3, 99]))
// IF YOU CAN'T FIND 

// // const newThomas = createDictionary(thomas.data[0])
// const newThomas = dictionaryFromAll([thomas])
// console.log(newThomas)
// const dictionarizedThomasPoem = dictionarizeString(thomas.data[6], newThomas)
// // console.log(dictionarizedThomasPoem)

const commonWords = ['the','be','of','and','a','to','in','he','have','it','that','for','they','i','with',
'as','not','on','she','at','by','this','we','you','do','but','from','or','which','one','would','all',
'will','there','say','who','make','when','can','more','if','no','man','out','other','so','what','time',
'up','go','about','than','into','could','state','only','new','year','some','take','come','these','know',
'see','use','get','like','then','first','any','work','now','may','such','give','over','think','most',
'even','find','day','also','after','way','many','must','look','before','great','back','through','long',
'where','much','should','well','people','down','own','just','because','good','each','those','feel',
'seem','how','high','too','place','little','world','very','still','nation','hand','old','life','tell',
'write','become','here','show','house','both','between','need','mean','call','develop','under','last',
'right','move','thing','general','school','never','same','another','begin','while','number','part',
'turn','real','leave','might','want','point','form','off','child','few','small','since','against','ask',
'late','home','interest','large','person','end','open','public','follow','during','present','without',
'again','hold','govern','around','possible','head','consider','word','program','problem','however',
'lead','system','set','order','eye','plan','run','keep','face','fact','group','play','stand','increase',
'early','course','change','help','line']

function filterCommonWords(str, commonPercent, filterPercent) { // <= 1
  const wordPortion = commonWords.slice(0, Math.floor(commonWords.length * commonPercent))
  const splitStr = tokenizeString(str)
  return splitStr.filter(word => {
    console.log('word: ', word, !(commonWords.includes(word) && Math.random() <= filterPercent))
    return !(commonWords.includes(word) && Math.random() <= filterPercent)
  })
  return splitStr.join(' ')
}

function filterAuthor(author, commonPercent, filterPercent) {
  let authorCopy = {...author}
  authorCopy.data.forEach(poem => poem = filterCommonWords(poem, commonPercent, filterPercent))
  return authorCopy
}