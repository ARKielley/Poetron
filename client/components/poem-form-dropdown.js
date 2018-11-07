import React from 'react'

const PoemFormDropdown = ({ title, params }) => {
  return (
    <div id={`${title.value}-container`}>
      <label for={title.value}>{title.name}</label>
      <select id={title.value} name={title.value}>
        {params.map(param => <option value={param.value}>{param.name}</option>)}
      </select>
    </div>
  )
}

export default PoemFormDropdown