export const sanitizeName = name => name.toLowerCase().replace(/(\w\._\/)/, '-')

export const dictionarizeString = (str, dictionary) => {
  return tokenizeString(str).map(token => dictionary[token])
}