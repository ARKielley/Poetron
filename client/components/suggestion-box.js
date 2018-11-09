import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

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