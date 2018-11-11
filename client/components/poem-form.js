import React, { Component } from 'react'
import { connect } from 'react-redux';
// import CaretCoordinates from 'textarea-caret-position'
import { PoemFormDropdown, PoemFormSearch, PoemInput, FilterBox } from './index'
import { changeSpecifiedValue, toggleAuto, getInfoFromServer } from '../store/options'
import { getLookupFromServer, getFilteredSuggestions, pickSuggestion } from '../store/suggestion'
import { getCaretCoordinates } from '../util'



class PoemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filtersOpen: false,
      filters: {
        commonWords: 0
      }
    }
    this.changeFilter = this.changeFilter.bind(this)
    this.toggleFilters = this.toggleFilters.bind(this)
  }

  componentDidMount() {
    this.props.getInfoFromServer()
  }

  changeFilter(target) {
    console.log('filtering at ', target.value)
    this.setState({
      filters: {
        [target.name]: target.value
      }
    })
  }

  toggleFilters() {
    this.setState(prevState => ({
      filtersOpen: !prevState.filtersOpen
    }))
  }

  render() {
    // const { styles, poets, emotions } = this.props
    return (
      <div id='main-form-container'>
        <div id='parameter-bar-container' className='flex'>
          <PoemFormDropdown title='Genre' value={this.props.genre} names={this.props.genres} />
          <PoemFormDropdown title='Author' value={this.props.author} names={this.props.authors} />
          <span>Filters</span><button onClick={this.toggleFilters}>
            {this.state.filtersOpen ? '-' : '+'}
          </button>
          {this.state.filtersOpen && <FilterBox changeFilter={this.changeFilter} 
            values={this.state.filters} />}
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
  }
})

export default connect(mapState, mapDispatch)(PoemForm)