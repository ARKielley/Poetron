const onlyWordsRegEx = /[^a-zA-Z’ ]/g

export const sanitizeName = name => name.toLowerCase().replace(/(\w\._\/)/, '-')
export const stylizeName = name => name.split('-').map(v => v[0].toUpperCase() + v.slice(1)).join(' ')

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

export const authorLookup = [null, 
  'thomas-delahaye', 'allen-ginsberg', 
  'edmund-spenser', 'gary-snyder', 
  'john-ashbery', 'miglior fabbro',
  'w-h-auden', 'william-shakespeare']