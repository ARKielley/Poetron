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
const CHANGE_GENRE = 'CHANGE_GENRE'
const CHANGE_AUTHOR = 'CHANGE_AUTHOR'
const CHANGE_AUTO = 'CHANGE_AUTO'

/**
 * INITIAL STATE
 */
const defaultState = {
  authors: [],
  genres: [],
  auto: false,
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
const changeGenre = (value) => ({type: CHANGE_GENRE, value})
const changeAuthor = (value) => ({type: CHANGE_AUTHOR, value})
const changeAuto = () => ({type: CHANGE_AUTO})

/**
 * THUNK CREATORS
 */

export const getInfoFromServer = () => async (dispatch) => {
  try {
    let allAuthors = await axios.get('/api/lookups/authors')
    let authorData = allAuthors.data.map(entry => entry.category)
    let allGenres = await axios.get('/api/lookups/genres')
    let genreData = allGenres.data.map(entry => entry.category)
    dispatch(getInfo(authorData, genreData))
  } catch (err) {
    console.error(err)
  }
}

export const changeSpecifiedOption = (option, value) => (dispatch) => {
  console.log('CHANGING OPTION ', option, 'WITH VALUE ', value)
  dispatch(changeValue(option, value))
}

export const selectGenre = (value) => (dispatch) => {
  dispatch(changeGenre(value))
}

export const selectAuthor = (value) => (dispatch) => {
  dispatch(changeAuthor(value))
}

export const handleCheck = (option, setting) => (dispatch) => {
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
    case CHANGE_GENRE:
      return {...state, genre: action.value}
    case CHANGE_AUTHOR:
      return {...state, author: action.value}
    case CHANGE_AUTO:
      return {...state, auto: !state.auto}
    default:
      return state
  }
}

