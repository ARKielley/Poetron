import React from 'react'

const FilterBox = (props) => {
  return (
    <div id='filter-box' className='container'>
      <p>Filters:</p>
      <label for='commonWords'>Common Words</label>
      <input type='range' id='common-words' name='commonWords' 
        value={props.values.commonWords}
        onChange={(evt) => props.changeFilter(evt.target)} />
    </div>
  )
}

export default FilterBox