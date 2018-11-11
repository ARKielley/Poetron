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
    return (
      <div id='suggestion-box-container' style={{...this.props.style, opacity: `${this.state.open ? 1 : 0.75}`}}>
        {this.state.open && (
          <Fragment>
            <img src='add-placeholder' onClick={() => this.props.add('test!')} />
            <span>{this.props.suggestion}securitron</span>
            <img src='refresh-placeholder' onClick={this.handleRefresh} />
          </Fragment>
        )}
        <img src={this.state.open ? 'close-placeholder' : 'open-placeholder'} onClick={this.handleToggle} />
      </div>
    )
  }
}

const mapState = (state) => ({
  suggestion: state.suggestionReducer.suggestions[state.suggestionReducer.suggestionIndex]
})

const mapDispatch = (dispatch) => ({
  // getNets: () => dispatch(getNetsFromServer(this.props.options)),
  // getSuggestions: () => dispatch(getFilteredSuggestions(this.props.nets, this.props.input, this.props.filters)),
  pickSuggestion: (suggestions, index) => dispatch(pickSuggestion(suggestions, index))
})

export default connect(mapState, mapDispatch)(SuggestionBox)