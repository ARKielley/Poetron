import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getNetsFromServer, getFilteredSuggestions, pickSuggestion } from '../store/suggestion'

class SuggestionBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div id='suggestion-box-container'>
        {this.state.open && (
          <Fragment>
            <span>{this.props.suggestion}</span>
            <img src='refresh-placeholder' />
          </Fragment>
        )}
        <img src={this.state.open ? 'close-placeholder' : 'open-placeholder'} />
      </div>
    )
  }
}

const mapState = (state) => ({
  suggestion: state.suggestionReducer.suggestions[state.suggestionReducer.suggestionIndex]
})

const mapDispatch = (dispatch) => ({
  getNets: () => dispatch(getNetsFromServer(this.props.options)),
  getSuggestions: () => dispatch(getFilteredSuggestions(this.props.nets, this.props.input, this.props.filters))
})

export default connect(mapState, mapDispatch)(SuggestionBox)