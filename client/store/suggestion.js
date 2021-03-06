import axios from 'axios'
import brain from 'brain.js'
import { filterCommonWords, shuffle, categoryTree } from '../util'

const filterBank = {
  commonWords: filterCommonWords
}



/**
 * ACTION TYPES
 */
const GET_NEW_LOOKUP = 'GET_NEW_LOOKUP'
const GET_SUGGESTIONS = 'GET_SUGGESTIONS'
const GET_SUGGESTION_INDEX = 'GET_SUGGESTION_INDEX'

/**
 * INITIAL STATE
 */
const defaultState = {
  lookup: {},
  suggestions: [],
  suggestionIndex: 0
}

/**
 * ACTION CREATORS
 */
const getNewLookup = (lookup) => ({type: GET_NEW_LOOKUP, lookup})
const getSuggestions = (suggestions) => ({type: GET_SUGGESTIONS, suggestions})
const getSuggestionIndex = (index) => ({type: GET_SUGGESTION_INDEX, index})

/**
 * THUNK CREATORS
 */

export const getLookupFromServer = (category) => async (dispatch) => {
  try {
    // const query = Object.keys(options).map(optKey => `${optKey}=${options[optKey]}`).join('&')
    const {data} = await axios.get(`/api/lookups/${category}`)
    getFilteredSuggestions(data, 'the', [])
    dispatch(getNewLookup(data))
  } catch (err) {
    console.error(err)
  }
}

export const getFilteredSuggestions = (lookup, input, filters = {}) => async (dispatch) => {
  try {
    console.log(lookup)
    let results = lookup.data[input] || []
    if (!results || !results.length) {
      const allWords = Object.keys(lookup.data)
      results = lookup.data[allWords[Math.floor(Math.random() * allWords.length)]] // results for random word in the lookup
      console.log('results: ', results)
    }
    for (let name in filters) {
      if (filters[name] > 0) results = filterBank[name](results, filters[name] / 100)
    }
    let categoryParent = categoryTree[lookup.category]
    while (results.length < 5 && categoryParent) {
      const {data} = await axios.get(`/api/lookups/${categoryParent}`)
      console.log('PARENT: ', categoryParent)
      categoryParent = categoryTree[categoryParent]
      let additionalResults
      if (data) additionalResults = data[input]
      if (Array.isArray(filters)) filters.forEach(fil => additionalResults = fil(additionalResults))
      results.concat(additionalResults)
    }
    dispatch(getSuggestions(shuffle(results).slice(0, 10)))
  } catch (err) {
    console.error(err)
  }
}

export const pickSuggestion = (suggestions, suggestionIndex) => (dispatch) => {
  let nextIndex = 0
  while (nextIndex === suggestionIndex && suggestions.length > 1) {
    nextIndex = Math.floor(Math.random() * suggestions.length)
  }
  suggestionIndex = nextIndex
  dispatch(getSuggestionIndex(suggestionIndex))
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_NEW_LOOKUP:
      return {...state, lookup: action.lookup}
    case GET_SUGGESTIONS:
      return {...state, suggestions: action.suggestions}
    case GET_SUGGESTION_INDEX:
      return {...state, suggestionIndex: action.index}
    default:
      return state
  }
}

