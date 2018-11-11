export const sanitizeName = name => name.toLowerCase().replace(/(\w\._\/)/, '-')

export const lastElem = coll => coll[coll.length - 1]

export const dictionarizeString = (str, dictionary) => {
  return tokenizeString(str).map(token => dictionary[token])
}