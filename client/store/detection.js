import axios from 'axios'
import brain from 'brain.js'
import { tokenizeString, filterCommonWords,  categoryTree } from '../util'
const { thomas, ginsberg, spenser, snyder, ashbery, fabbro, auden, shakespeare } = require('../../script/training/data')

  const firstHundredAuthors = [
    {
      input: (tokenizeString(thomas.data.join(' '))).slice(0, 30),
      output: '1'
    },
    {
      input: (tokenizeString(ginsberg.data.join(' '))).slice(0, 30),
      output: '2'
    },
    {
      input: (tokenizeString(spenser.data.join(' '))).slice(0, 30),
      output: '3'
    },
    {
      input: (tokenizeString(snyder.data.join(' '))).slice(0, 30),
      output: '4'
    },
    {
      input: (tokenizeString(ashbery.data.join(' '))).slice(0, 30),
      output: '5'
    },
    {
      input: (tokenizeString(fabbro.data.join(' '))).slice(0, 30),
      output: '6'
    },
    {
      input: (tokenizeString(auden.data.join(' '))).slice(0, 30),
      output: '7'
    },
    {
      input: (tokenizeString(shakespeare.data.join(' '))).slice(0, 30),
      output: '8'
    }
  ]
  
   

/**
 * ACTION TYPES
 */
const DETECT = 'DETECT'
const GOT_NET = 'GOT_NET'

/**
 * INITIAL STATE
 */
const defaultState = {
  author: '',
  net: () => undefined
}

/**
 * ACTION CREATORS
 */
const detect = (author, genre) => ({type: DETECT, author, genre})
const gotNet = (net) => ({type: GOT_NET, net})

/**
 * THUNK CREATORS
 */

export const detectUserStyle = (userText) => (dispatch) => {
  console.log('UH OH')
  // const detectedIndex = authorNetFunction(tokenizeString(userText))
  // const test = require('../util/author-net-function.txt')
  console.log(test)
  console.log('detectedIndex: ', detectedIndex)
  const authorName = authorLookup[detectedIndex]
  console.log('authorName: ', authorName)
  if (authorName) dispatch(detect(authorName, categoryTree[authorName]))
}

export const detectBackEnd = (userText) => dispatch => {
  console.log('hmmmm')
  // const authorIdx = axios.post('/api/nets/help', {text: userText})
  console.log('GOT IT?', authorIdx)
  const authorName = authorLookup[authorIdx]
  if (authorName) dispatch(detect(authorName, categoryTree[authorName]))
}

export const createNet = () => (dispatch) => {
  console.log('starting!')
  let net = new brain.recurrent.LSTM()
  
  net.train(firstHundredAuthors, {
    // Defaults values --> expected validation
  iterations: 200,    // the maximum times to iterate the training data --> number greater than 0
  errorThresh: 0.005,   // the acceptable error percentage from training data --> number between 0 and 1
  log: true,           // true to use console.log, when a function is supplied it is used --> Either true or a function
  logPeriod: 20,        // iterations between logging out --> number greater than 0
  learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1
  momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
  callback: null,       // a periodic call back that can be triggered while training --> null or function
  callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
  timeout: Infinity     // the max number of milliseconds to train for --> number greater than 0
  })
  // await axios.post('api/nets/session', {net})
  dispatch(gotNet(net))
}

/**
 * REDUCER
 */
export default function(state = defaultState, action) {
  switch (action.type) {
    case DETECT:
      return {...state, author: action.author}
    case GOT_NET:
      return {...state, net: action.net}
    default:
      return state
  }
}