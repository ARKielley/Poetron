const thomas = require('./data/thomas-delahaye')
const commonWords = require('./data/two-hundred-common')

module.exports = { 
  shuffle, tokenizeString,
  getAllIndices, findSurroundingTokens, 
  buildLookupFromAuthor, filterAuthor,
  mergeLookups
}

const irrelevantRegEx = /[^\s,\.;—\-’a-zA-Z]/g
const nonWordsRegEx = /[\r\n,\.;—\-]/g
const onlyWordsRegEx = /[^a-zA-Z’ ]/g

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

function filterCommonWords(str, commonPercent, filterPercent) { // <= 1
  const wordPortion = commonWords.slice(0, Math.floor(commonWords.length * commonPercent))
  const splitStr = tokenizeString(str)
  return splitStr.filter(word => {
    return !(commonWords.includes(word) && Math.random() <= filterPercent)
  })
  return splitStr.join(' ')
}

function filterAuthor(author, commonPercent, filterPercent) {
  let authorCopy = {...author}
  authorCopy.data.forEach(poem => poem = filterCommonWords(poem, commonPercent, filterPercent))
  return authorCopy
}

function tokenizeString(str) {
  //fix this dumb double-replace
  return str.toLowerCase()
    .replace(onlyWordsRegEx, ' ')
    .split(' ')
    .filter(t => t)
}

function getAllIndices(arr, val) {
  const indices = []
  let i = -1;
  while ((i = arr.indexOf(val, i + 1)) !== -1){
      indices.push(i);
  }
  return indices;
}

function findSurroundingTokens(arr, token) { //ADD WIDTH OPTION?
  const idxArr = getAllIndices(arr, token)
  return idxArr.map(idx => [arr[idx + 1], arr[idx - 1], arr[idx + 2], arr[idx + 3], arr[idx + 4]]
      .filter((v, i, arr) => v))
    .reduce((total, current) => [...total, ...current])
}

function buildLookupFromAuthor(author) {
  const tokenizedPoems = author.data.map(poem => tokenizeString(poem))
  const lookup = {}
  tokenizedPoems.forEach(tokPoem => {
    tokPoem.forEach(token => {
      if (!lookup[token]) lookup[token] = findSurroundingTokens(tokPoem, token)
    })
  })
  return lookup
}

function mergeLookups(...lookups) {
  return lookups.reduce((total, current) => {
    for (let word in current) {
      if (total[word]) total[word] = [...total[word], ...current[word]]
      else total[word] = current[word]
    }
    return total
  })
}

// console.log(buildLookupFromAuthor(thomas))