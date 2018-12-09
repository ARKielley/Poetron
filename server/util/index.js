const { filterPunctuation, filterReturns, filterCommonWords } = require('./net-filters')
const netWrapper = require('./net-runner')

module.exports = {
  filterPunctuation,
  filterReturns,
  filterCommonWords,
  netWrapper
}