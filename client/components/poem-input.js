import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SuggestionBox } from './index'
import { getLookupFromServer, getFilteredSuggestions } from '../store/suggestion'
import { detectUserStyle } from '../store/detection'
import { getCaretCoordinates, lastElem } from '../util'
import { TrainStream } from '../../node_modules/brain.js';

const punctuationRegEx = /[\s,\.;—\-\/]/g
const breakRegEx = /[\s —\/]/g

class PoemInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: {top: 3, left: 0},
      text: ''
    }
    this.setCoords = this.setCoords.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.add = this.add.bind(this)
  }

  componentDidMount() {
    this.box.focus()
    this.setCoords()
    this.props.getLookup('thomas-delahaye')
  }

  setCoords(extra, newState = {}) {
    const coords = getCaretCoordinates(this.box, this.box.selectionEnd, extra)
    this.setState(prevState => ({...prevState, ...newState, coords}))
  }

  handleChange(event) {
    console.log('HANDLING CHANGE')
    const { lookup, filters } = this.props
    console.log('LOOKUP IN INPUT: ', lookup)
    // const coords = getCaretCoordinates(this.box, this.box.selectionEnd)
    // this.setState({
    //   coords,
    //   text: event.target.value
    // })
    this.setCoords('', {text: event.target.value})
    const lastWord = this.state.text ? 
      lastElem(this.state.text.split(punctuationRegEx).filter(v => v))
        .replace("'", "’")
      : ''
    // let lookbackIndex = /*allPrevText.length - filters.lookback*/ 10 //add when it exists
    // if (lookbackIndex > allPrevText.length - 2) lookbackIndex = 0
    // const limitedPrevText = allPrevText.slice(lookbackIndex, allPrevText.length - 1)
    //train into dynamic net?
    if (punctuationRegEx.test(lastElem(event.target.value))) {
      this.props.getSuggestions(lookup, lastWord, filters)
    }
  }

  add(input) {
    const { text } = this.state
    console.log(text[this.box.selectionEnd - 1])
    if (!breakRegEx.test(text[this.box.selectionEnd - 1])) input = ' ' + input
    if (text[this.box.selectionEnd] && !punctuationRegEx.test(text[this.box.selectionEnd])) input += ' '
    const newText = text.substring(0, this.box.selectionEnd) 
      + input 
      + text.substring(this.box.selectionEnd)
    // const coords = getCaretCoordinates(this.box, this.box.selectionEnd, input)
    // this.setState({coords, text: newText})
    this.setCoords(input, {text: newText})
    this.box.focus()
    this.props.getSuggestions(this.props.lookup, input.trim(), this.props.filters)
  }

  render() {
    return (
      <div id='entry-container'>
        <textarea  
          value={this.state.text} 
          rows='32' cols='96' 
          ref={(textarea) => this.box = textarea}
          onClick={() => this.setCoords()}
          onChange={this.handleChange} />
        <SuggestionBox filters={this.props.filters} 
          add={this.add} 
          style={{position: 'absolute', top: `${this.state.coords.top + 176}px`, left: `${this.state.coords.left + 22}px`}} />
       </div>
    )
  }
}

const mapState = (state) => ({ 
  lookup: state.suggestionReducer.lookup,

})

const mapDispatch = (dispatch) => ({
  getLookup: (options) => dispatch(getLookupFromServer(options)),
  getSuggestions: (lookup, input, filters) => dispatch(getFilteredSuggestions(lookup, input, filters)),
  detectStyle: (input) => dispatch(detectUserStyle(input))
})

export default connect(mapState, mapDispatch)(PoemInput)