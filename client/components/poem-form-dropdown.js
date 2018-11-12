import React from 'react'
import { connect } from 'react-redux'
import { sanitizeName, stylizeName, categoryTree } from '../util'
import { changeSpecifiedOption, selectGenre, selectAuthor } from '../store/options'
import { getLookupFromServer, getFilteredSuggestions } from '../store/suggestion'

let lowerCaseTitle

const PoemFormDropdown = (props) => {
  const {title, names } = props
  lowerCaseTitle = sanitizeName(title)
  return (
    <div id={`${lowerCaseTitle}-container`}>
      <label for={lowerCaseTitle}>{title}</label>
      <select id={lowerCaseTitle} name={title} value={props.value} disabled={props.autoDisabled} onChange={(event) => props.changeOption(event.target.value)}>
        <option value='all'>All</option>
        {names && names.map(name => <option value={name}>{stylizeName(name)}</option>)}
      </select>
    </div>
  )
}

const mapState = (state) => ({
  autoDisabled: state.optionsReducer.auto
})

const mapDispatch = (dispatch) => ({
  changeOption(value) {
    console.log(lowerCaseTitle)
    dispatch(changeSpecifiedOption(lowerCaseTitle, value))
    dispatch(selectGenre(categoryTree[value]))
    dispatch(getLookupFromServer(value))
  },
  changeGenre(value) {
    dispatch(selectGenre(value))
  }
})

export default connect(mapState, mapDispatch)(PoemFormDropdown)