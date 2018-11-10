import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SuggestionBox } from './index'
import { getNetsFromServer, getFilteredSuggestions, pickSuggestion } from '../store/suggestion'
import { getCaretCoordinates } from '../util'

const punctuationRegEx = /[\s,\.;—\-\/]/g
const breakRegEx = /[\s—\/]/g

function triggerKeyPress() {
  const keyboardEvent = document.createEvent("KeyboardEvent")
  const initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? "initKeyboardEvent" : "initKeyEvent";

  keyboardEvent[initMethod](
    "keydown", // event type : keydown, keyup, keypress
    true, // bubbles
    true, // cancelable
    window, // viewArg: should be window
    false, // ctrlKeyArg
    false, // altKeyArg
    false, // shiftKeyArg
    false, // metaKeyArg
    40, // keyCodeArg : unsigned long the virtual key code, else 0
    0 // charCodeArgs : unsigned long the Unicode character associated with the depressed key, else 0
  )
  document.dispatchEvent(keyboardEvent);
}

class PoemInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coords: {top: 3, left: 0},
      text: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.add = this.add.bind(this)
  }

  componentDidMount() {
    this.box.focus()
  }

  // updateText(text) {
  //   this.setState({ text })
  //   const coords = getCaretCoordinates(this.box, this.box.selectionEnd)
  //   this.setState({ coords })
  // }

  handleClick() {
    const coords = getCaretCoordinates(this.box, this.box.selectionEnd)
    this.setState({coords})
  }

  handleChange(event) {
    console.log('HANDLING CHANGE')
    const { nets, filters } = this.props
    const newCoords = getCaretCoordinates(this.box, this.box.selectionEnd)
    this.setState({
      coords: newCoords,
      text: event.target.value
    })
    const allPrevText = this.state.text.split(punctuationRegEx).filter(v => v)
    let lookbackIndex = /*allPrevText.length - filters.lookback*/ 10 //add when it exists
    if (lookbackIndex > allPrevText.length - 2) lookbackIndex = 0
    const limitedPrevText = allPrevText.slice(lookbackIndex, allPrevText.length - 1)
    //train into dynamic net?
    if (punctuationRegEx.test(event.target.value)) this.props.getSuggestions(nets, limitedPrevText, filters)
  }

  add(input) {
    const { text } = this.state
    if (!breakRegEx.test(text[this.box.selectionEnd])) input = ' ' + input
    if (!punctuationRegEx.test(text[this.box.selectionEnd + 1])) input += ' '
    const newText = text.substring(0, this.box.selectionEnd) 
      + input 
      + text.substring(this.box.selectionEnd)
      const coords = getCaretCoordinates(this.box, this.box.selectionEnd, input)
    this.setState({coords, text: newText})
    this.box.focus()
    console.log(this.box.selectionEnd + input.length)
    // triggerKeyPress()
    // this.setState({coords})
  }

  render() {
    return (
      <div id='entry-container'>
        <textarea id='main-textarea' 
          value={this.state.text} 
          rows='32' cols='128' 
          ref={(textarea) => this.box = textarea}
          onClick={this.handleClick}
          onChange={this.handleChange} />
        <SuggestionBox filters={this.props.filters} 
          add={this.add} 
          style={{position: 'absolute', top: `${this.state.coords.top + 200}px`, left: `${this.state.coords.left + 26}px`}} />
       </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  getNets: (options) => dispatch(getNetsFromServer(options)),
  getSuggestions: (nets, input, filters) => dispatch(getFilteredSuggestions(nets, input, filters))
})

export default connect(null, mapDispatch)(PoemInput)