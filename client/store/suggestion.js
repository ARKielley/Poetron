import axios from 'axios'
import brain from 'brain.js'
import { SSL_OP_CIPHER_SERVER_PREFERENCE } from 'constants';

const categoryTree = {
  thomasDelahaye: {type: 'style', value: 'poetronSpecial'},
  poetronSpecial: {type: 'all', value: 'all'}
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
    const lookup = await axios.get(`/api/lookups?${category.type}=${category.value}`)
    dispatch(getNewLookup(lookup))
  } catch (err) {
    console.error(err)
  }
}

export const getFilteredSuggestions = (category, input, filters = []) => async (dispatch) => {
  try {
    let results = lookup[input]
    filters.forEach(fil => results = fil(results))
    let categoryParent = categoryTree[lookup.category.value]
    while (results.length < 5 && categoryParent) {
      const additionalLookup = await axios.get(`/api/lookups?${categoryParent.type}=${categoryParent.value}`)
      categoryParent = categoryTree[categoryParent.value]
      const additionalResults = additionalLookup[input]
      filters.forEach(fil => additionalResults = fil(additionalResults))
      results.concat(additionalResults)
    }
    dispatch(getSuggestions(results.slice(0, 10)))
  } catch (err) {
    console.error(err)
  }
}

export const pickSuggestion = (suggestions, suggestionIndex) => (dispatch) => {
  const nextIndex = 0
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
      return {...state, lookups: [action.lookup]}
    case GET_SUGGESTIONS:
      return {...state, suggestions: action.suggestions}
    case GET_SUGGESTION_INDEX:
      return {...state, suggestionIndex: action.suggestionIndex}
    default:
      return state
  }
}

