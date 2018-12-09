import React, { Component } from 'react'
import { connect } from 'react-redux';
// import CaretCoordinates from 'textarea-caret-position'
import { PoemFormDropdown, PoemFormGenre, PoemInput, FilterBox } from './index'
import { changeSpecifiedValue, getInfoFromServer, handleCheck } from '../store/options'
import { createNet, getNet } from '../store/detection'
import { getLookupFromServer, getFilteredSuggestions, pickSuggestion } from '../store/suggestion'
import { getCaretCoordinates } from '../util'



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

  async componentDidMount() {
    // this.props.createNet(testMain)
    this.props.getNet('smallAuthors')
    this.props.getInfoFromServer()
    await this.props.getLookup('all')
    this.props.getSuggestions(this.props.lookup, '', this.state.filters)
    console.log('UPDATED AGAIN', this.props.net(['n']))
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

const mapState = (state) => ({...state.optionsReducer, lookup: state.suggestionReducer.lookup, net: state.detectionReducer.net})

const mapDispatch = (dispatch) => ({
  handleChangeValue: (event) => dispatch(changeSpecifiedValue(event.target.name, event.target.value)),
  handleCheck: () => dispatch(handleCheck()),
  getInfoFromServer: () => dispatch(getInfoFromServer()),
  getLookup: (options) => dispatch(getLookupFromServer(options)),
  getSuggestions: (lookup, input, filters) => dispatch(getFilteredSuggestions(lookup, input, filters)),
  createNet: (net) => dispatch(createNet(net)),
  getNet: (name) => dispatch(getNet(name))
})

export default connect(mapState, mapDispatch)(PoemForm)