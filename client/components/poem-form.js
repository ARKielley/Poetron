import React, { Component } from 'react'
import { connect } from 'react-redux';
// import CaretCoordinates from 'textarea-caret-position'
import { PoemFormDropdown, PoemFormSearch, PoemInput, FilterBox } from './index'
import { changeSpecifiedValue, changeSpecifiedAuto } from '../store/options'
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
        {/*REPLACE LATER*/}
          <div id='line-length-container'>
            <label for='line-length'>Line Length</label>
            <select id='line-length' name='line-length'>
              <option value='1'>short</option>
              <option value='2' selected='selected'>medium</option>
              <option value='3'>long</option>
              <option value='4'>prose</option>
            </select>
          </div>
          {/*REPLACE LATER*/}
          <div id='strictness-container'>
            <label for='strictness'>Strictness</label>
            <select id='line-length' name='line-length'>
              <option value='1'>low</option>
              <option value='2' selected='selected'>medium</option>
              <option value='3'>high</option>
            </select>
          </div>
          <PoemFormDropdown title='Style/Genre' params={[{name: 'test', value: 'test genre'}]} />
          <PoemFormDropdown title='Poet' params={[{name: 'Thomas Delahaye', value: 'thomas-delahaye'}]} />
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
  }
})

export default connect(mapState, mapDispatch)(PoemForm)