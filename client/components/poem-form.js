import React, { Component } from 'react'
import { connect } from 'react-redux';
// import CaretCoordinates from 'textarea-caret-position'
import { PoemFormDropdown, PoemFormGenre, PoemInput, FilterBox } from './index'
import { changeSpecifiedValue, getInfoFromServer, handleCheck } from '../store/options'
import { createNet } from '../store/detection'
import { getLookupFromServer, getFilteredSuggestions, pickSuggestion } from '../store/suggestion'
import { getCaretCoordinates } from '../util'
import { throws } from 'assert';



class PoemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        commonWords: 0
      }
    }
    this.changeFilter = this.changeFilter.bind(this)
    // this.toggleFilters = this.toggleFilters.bind(this)
  }

  componentDidMount() {
    this.props.getInfoFromServer()
    this.props.createNet()
  }

  changeFilter(target) {
    console.log('filtering at ', target.value)
    this.setState({
      filters: {
        commonWords: target.value
      }
    })
  }

  // toggleFilters() {
  //   this.setState(prevState => ({
  //     filtersOpen: !prevState.filtersOpen
  //   }))
  // }

  render() {
    // const { styles, poets, emotions } = this.props
    return (
      <div id='main-form-container'>
        <div id='parameter-bar-container' className='flex'>
          <PoemFormGenre key='1' title='Genre' value={this.props.genre} names={this.props.genres} /> <br />
          <PoemFormDropdown key='2' title='Author' value={this.props.author} names={this.props.authors} />
          <input type='checkbox' id='check-me' checked={this.props.auto} onClick={this.props.handleCheck} />
          <span>Auto</span>
          <br />
          {/*<FilterBox changeFilter={this.changeFilter} 
          values={this.state.filters} />*/}
        </div>
        <PoemInput filters={this.state.filters} />
      </div>
    )
  }
}

const mapState = (state) => ({...state.optionsReducer})

const mapDispatch = (dispatch) => ({
  handleChangeValue(event) {
    dispatch(changeSpecifiedValue(event.target.name, event.target.value))
    //handleChangeAuto, look up what toggling dues
  },
  getInfoFromServer() {
    dispatch(getInfoFromServer())
  },
  createNet() {
    dispatch(createNet())
  },
  handleCheck() {
    dispatch(handleCheck())
  }
})

export default connect(mapState, mapDispatch)(PoemForm)