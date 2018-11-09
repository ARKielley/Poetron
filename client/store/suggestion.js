import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_NETS = 'GET_NETS'
const GET_SUGGESTION = 'GET_SUGGESTION'

/**
 * INITIAL STATE
 */
const defaultState = {
  nets: [],
  lastIndex: 999999,
  suggestion: ''
}

/**
 * ACTION CREATORS
 */
const getNets = (nets) => ({type: GET_NETS, nets})
const getSuggestion = (suggestion) => ({type: GET_SUGGESTION, suggestion})

/**
 * THUNK CREATORS
 */

export const getNetsFromServer = (options) => async (dispatch) => {
  try {
    const query = Object.keys(options).map(optKey => `${optKey}=${options[optKey]}`).join('&')
    const nets = await axios.get(`/api/nets?{query}`)
    dispatch(getNets(nets))
  } catch (err) {
    console.error(err)
  }
}

export const pickSuggestion = (nets, data, filter, lastIndex) => (dispatch) => {
  if (!nets.length) dispatch('')
  const nextIndex = 0
  while (nextIndex === lastIndex && nets.length > 1) {
    nextIndex = Math.floor(Math.random() * nets.length)
  }
  lastIndex = nextIndex
  dispatch(filter(nets[nextIndex](data))) // dispatch filtered results of nets
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_NETS:
      return {...state, nets: action.nets}
    case GET_SUGGESTION:
      return {...state, lastIndex: action.lastIndex, suggestion: action.suggestion}
    default:
      return state
  }
}
