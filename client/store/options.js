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
const CHANGE_OPTION = 'CHANGE_OPTION'

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
const changeOption = (option, value) => ({type: CHANGE_OPTION, option, value})

/**
 * THUNK CREATORS
 */

export const changeSpecifiedOption = (option, value) => (dispatch) => {
  dispatch(changeOption(option, value))
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_OPTIONS:
      return {...state, [action.option]: action.value}
    default:
      return state
  }
}

