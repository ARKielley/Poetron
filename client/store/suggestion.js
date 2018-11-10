import axios from 'axios'
import brain from 'brain.js'

/**
 * ACTION TYPES
 */
const GET_NETS = 'GET_NETS'
const GET_SUGGESTIONS = 'GET_SUGGESTIONS'
const GET_SUGGESTION_INDEX = 'GET_SUGGESTION_INDEX'

/**
 * INITIAL STATE
 */
const defaultState = {
  nets: [],
  suggestions: [],
  suggestionIndex: 0
}

/**
 * ACTION CREATORS
 */
const getNets = (nets) => ({type: GET_NETS, nets})
const getSuggestions = (suggestions) => ({type: GET_SUGGESTIONS, suggestions})
const getSuggestionIndex = (index) => ({type: GET_SUGGESTION_INDEX, index})

/**
 * THUNK CREATORS
 */

export const getNetsFromServer = (options) => async (dispatch) => {
  try {
    const query = Object.keys(options).map(optKey => `${optKey}=${options[optKey]}`).join('&')
    const nets = await axios.get(`/api/nets?${query}`)
    dispatch(getNets(nets))
  } catch (err) {
    console.error(err)
  }
}

export const getFilteredSuggestions = (nets, input, filters) => (dispatch) => {
  const results = nets.map(net => net.run(input))
  filters.forEach(filter => {
    results = filter(results)
  })
  dispatch(getSuggestions(results))
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
    case GET_NETS:
      return {...state, nets: action.nets}
    case GET_SUGGESTION_INDEX:
      return {...state, suggestionIndex: action.suggestionIndex}
    default:
      return state
  }
}

