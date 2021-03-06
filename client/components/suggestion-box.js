import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { pickSuggestion } from '../store/suggestion'

class SuggestionBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  handleToggle() {
    this.setState(prevState => ({
      open: !prevState.open
    }))
  }

  handleRefresh() {
    const { suggestions, suggestionIndex } = this.props
    this.props.pickSuggestion(suggestions, suggestionIndex)
  }

  render() {
    const opacity = this.state.open ? 1 : 0.75
    const backgroundColor = this.state.open ? 'rgba(250,250,250,0.85)' : 'transparent'
    const borderColor = this.state.open ? '#B5342F' : 'transparent'
    const currentSuggestion = this.props.suggestions[this.props.suggestionIndex]
    return (
      <div id='suggestion-box-container' style={{...this.props.style, borderColor, opacity, backgroundColor}}>
        {this.state.open && (
          <Fragment>
            <img className='suggestion-icon' src='/edit.svg' onClick={() => this.props.add(currentSuggestion || 'the')} />
            <span>{currentSuggestion || 'the'}</span>
            <img className='suggestion-icon' src='/two-circling-arrows.svg' onClick={this.handleRefresh} />
          </Fragment>
        )}
        <img className='suggestion-icon' 
        src={this.state.open ? '/left-arrow-inside-a-circle.svg' : '/play-button.svg'} 
        onClick={this.handleToggle} />
      </div>
    )
  }
}

const mapState = (state) => ({
  suggestions: state.suggestionReducer.suggestions,
  suggestionIndex: state.suggestionReducer.suggestionIndex,
  filters: state.optionsReducer.filters
})

const mapDispatch = (dispatch) => ({
  pickSuggestion: (suggestions, index) => dispatch(pickSuggestion(suggestions, index))
})

export default connect(mapState, mapDispatch)(SuggestionBox)