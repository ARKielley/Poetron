import React from 'react'
import { sanitizeName } from '../util'

const PoemFormDropdown = ({ title, params }) => {
  const lowerCaseTitle = sanitizeName(title)
  return (
    <div id={`${lowerCaseTitle}-container`}>
      <label for={lowerCaseTitle}>{title}</label>
      <select id={lowerCaseTitle} name={title}>
        {params && params.map(param => <option value={param.value}>{param.name}</option>)}
      </select>
    </div>
  )
}

export default PoemFormDropdown