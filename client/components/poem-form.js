import React, { Component } from 'react'
import { PoemFormDropdown, PoemFormSearch } from './index'

export default class PoemForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineLength: { value: 2 }, //1-4; short, medium, long, prose (hash table in form state changer)
      strictness: { value: 2 }, //1-3, same
      style: { value: 'all', auto: false },
      poet: { value: 'all', auto: false }, // auto dynamically changes the value depending on the result? or a thing below?
      emotions: { value: [], auto: false } // unchecking auto keeps the auto-generated value(s)!
    }
  }

  render() {
    const { styles, poets, emotions } = this.props
    return (
      <div id='parameter-bar-container' className='flex'>
        <div id='line-length-container'>
          <label for='line-length'>Line Length</label>
          <select id='line-length' name='line-length'>
            <option value='1'>short</option>
            <option value='2' selected='selected'>medium</option>
            <option value='3'>long</option>
            <option value='4'>prose</option>
          </select>
        </div>
        <div id='strictness-container'>
          <label for='strictness'>Strictness</label>
          <select id='line-length' name='line-length'>
            <option value='1'>low</option>
            <option value='2' selected='selected'>medium</option>
            <option value='3'>high</option>
          </select>
        </div>
        <div id='style-container'>
          <label for='style'>Style/Genre</label>
          <select id='style' name='style'>
            {styles && styles.map(style => <option value={style.value}>{style.name}</option>)}
          </select>
        </div>
        <div id='poet-container'>
        <label for='poet'>Poet</label>
          <select id='poet' name='poet'>
            <option value='all'>all</option>
            {poets && poets.map(poet => <option value={poet.value}>{poet.name}</option>)}
          </select>
          
        </div>
      </div>
    )
  }
}