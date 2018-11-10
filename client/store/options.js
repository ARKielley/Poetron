import axios from 'axios'
import brain from 'brain.js'

/**
 * ACTION TYPES
 */
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
  lineLength: { value: 2 }, //1-4; short, medium, long, prose (hash table in form state changer)
  strictness: { value: 2 }, //1-3, same
  style: { value: 'all', auto: false },
  poet: { value: 'all', auto: false }, // auto dynamically changes the value depending on the result? or a thing below?
  emotions: { value: [], auto: false } // unchecking auto keeps the auto-generated value(s)!
}

/**
 * ACTION CREATORS
 */
// const changeLineLength = (length) => ({type: CHANGE_LINE_LENGTH, length})
// const changeStrictness = (stictness) => ({type: CHANGE_STRICTNESS, strictness})
const changeValue = (option, value) => ({type: CHANGE_VALUE, option, value})
const changeAuto = (option, setting) => ({type: CHANGE_AUTO, option, setting})

/**
 * THUNK CREATORS
 */

export const changeSpecifiedOption = (option, value) => (dispatch) => {
  dispatch(changeValue(option, value))
}
export const changeSpecifiedAuto = (option, setting) => (dispatch) => {
  dispatch(changeAuto(option, setting))
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_VALUE:
      return {...state, [action.option]: {...state[action.option], value: action.value}}
      case CHANGE_AUTO:
      return {...state, [action.option]: {...state[action.option], auto: action.auto}}
    default:
      return state
  }
}

