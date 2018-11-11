import React from 'react'
import { connect } from 'react-redux'
import { sanitizeName, stylizeName } from '../util'
import { changeSpecifiedOption } from '../store/options'

const PoemFormDropdown = ({ title, names }) => {
  const lowerCaseTitle = sanitizeName(title)
  return (
    <div id={`${lowerCaseTitle}-container`}>
      <label for={lowerCaseTitle}>{title}</label>
      <select id={lowerCaseTitle} name={title} value={this.props.value} onChange={(event) => props.changeOption(event.target.value)}>
        {names && names.map(name => <option value={name}>{stylizeName(name)}</option>)}
      </select>
    </div>
  )
}

mapDispatch = (dispatch) => ({
  changeOption(value) {
    dispatch(changeSpecifiedOption(lowerCaseTitle, value))
  }
})

export default connect(null, mapDispatch)(PoemFormDropdown)