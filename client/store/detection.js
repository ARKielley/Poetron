import axios from 'axios'
import brain from 'brain.js'
import { tokenizeString, filterCommonWords, authorNetFunction, categoryTree } from '../util'

const authorLookup = [null, 
  'thomas-delahaye', 'allen-ginsberg', 
  'edmund-spenser', 'gary-snyder', 
  'john-ashbery', 'miglior fabbro',
  'w-h-auden', 'william-shakespeare']

/**
 * ACTION TYPES
 */
const DETECTED_AUTHOR = 'DETECTED_AUTHOR'

/**
 * INITIAL STATE
 */
const defaultState = {
  author: '',
  genre: ''
}

/**
 * ACTION CREATORS
 */
const detect = (author, genre) => ({type: DETECT, author, genre})

/**
 * THUNK CREATORS
 */

export const detectUserStyle = (userText) => (dispatch) => {
  const detectedIndex = authorNetFunction(tokenizeString(userText))
  console.log('detectedIndex: ', detectedIndex)
  const authorName = authorLookup[detectedIndex]
  console.log('authorName: ', authorName)
  if (authorName) dispatch(detect(authorName, categoryTree[authorName]))
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case DETECT:
      return {...state, author, genre}
    default:
      return state
  }
}