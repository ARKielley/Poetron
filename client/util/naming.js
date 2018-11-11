const onlyWordsRegEx = /[^a-zA-Z’ ]/g

export const sanitizeName = name => name.toLowerCase().replace(/(\w\._\/)/, '-')

export const lastElem = coll => coll[coll.length - 1]

export const dictionarizeString = (str, dictionary) => {
  return tokenizeString(str).map(token => dictionary[token])
}

export const tokenizeString = (str) => {
  //fix this dumb double-replace
  return str.toLowerCase()
    .replace(onlyWordsRegEx, ' ')
    .split(' ')
    .filter(t => t)
}