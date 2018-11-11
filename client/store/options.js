import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_INFO = 'GET_INFO'
// const CHANGE_LINE_LENGTH = 'CHANGE_LINE_LENGTH'
// const CHANGE_STRICTNESS = 'CHANGE_STRICTNESS'
// const CHANGE_STYLE = 'CHANGE_STYLE'
// const CHANGE_POET = 'CHANGE_POET'
// const CHANGE_EMOTIONS = 'CHANGE_EMOTIONS'
const CHANGE_VALUE = 'CHANGE_VALUE'
const CHANGE_AUTO = 'CHANGE_AUTO'

/**
 * INITIAL STATE
 */
const defaultState = {
  authors: [],
  genres: [],
  lineLength: { value: 2 }, //1-4; short, medium, long, prose (hash table in form state changer)
  strictness: { value: 2 }, //1-3, same
  genre: 'all',
  author: 'all', // auto dynamically changes the value depending on the result? or a thing below?
  // emotions: { value: [], auto: false } // unchecking auto keeps the auto-generated value(s)!
}

/**
 * ACTION CREATORS
 */
const getInfo = (authors, genres) => ({type: GET_INFO, authors, genres})
// const changeLineLength = (length) => ({type: CHANGE_LINE_LENGTH, length})
// const changeStrictness = (stictness) => ({type: CHANGE_STRICTNESS, strictness})
const changeValue = (option, value) => ({type: CHANGE_VALUE, option, value})
const changeAuto = () => ({type: CHANGE_AUTO})

/**
 * THUNK CREATORS
 */

export const getInfoFromServer = () => async (dispatch) => {
  const allAuthors = await axios.get('/api/lookups/authors')
    .map(entry => entry.category)
  const allGenres = await axios.get('/api/lookups/genres')
  .map(entry => entry.category)
  dispatch(getInfo(allAuthors, allGenres))
}

export const changeSpecifiedOption = (option, value) => (dispatch) => {
  dispatch(changeValue(option, value))
}
export const toggleAuto = (option, setting) => (dispatch) => {
  dispatch(changeAuto())
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_INFO:
      return {...state, authors: action.authors, genres: action.genres}
    case CHANGE_VALUE:
      return {...state, [action.option]: action.value}
      case CHANGE_AUTO:
      return {...state, auto: !auto}
    default:
      return state
  }
}

