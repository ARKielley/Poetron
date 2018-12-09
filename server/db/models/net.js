const Sequelize = require('sequelize')
const db = require('../db')
const brain = require('brain.js')
const {netWrapper} = require('../../util')

const Net = db.define('net', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    verify: {
      notEmpty: true
    }
  },
  characterTable: {
    type: Sequelize.JSON,
    allowNull: false
  },
  indexTable: {
    type: Sequelize.JSON,
    allowNull: false
  },
  characters: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false
  },
  json: {
    type: Sequelize.JSON,
    allowNull: false
  }
})

Net.prototype.getAuthorIndexTest = function(text) {
  const { characterTable, indexTable, characters, json } = this
  return netWrapper(characterTable, indexTable, characters, json)(text).match(/\d/)[0]
}

Net.prototype.failsafeRun = function(runData) { // takes an arr of string tokens
  let loadNet = new brain.recurrent.LSTM()
  // loadNet.train([{input: 'the quick', output: 'brown'}])
  // const tempJSON = loadNet.toJSON()
  // let tempNet = new brain.recurrent.LSTM()
  // console.log(loadNet.toJSON().input)
  // console.log(this.data.type)
  // tempNet.fromJSON(this.data)
  // console.log(loadNet)
  // return tempNet.run(runData).match(/\d/)[0]
}

Net.prototype.backEndRun = function (characterTable, indexTable, characters, json, input) {
  return runNet(input)
}

Net.prototype.miniBackEndRun = function (input) {
  const {characterTable, indexTable, characters, json} = this
  // console.log(runNet)
  console.log('RUNNUNG NET BACK HEER', netWrapper(characterTable, indexTable, characters, json, input))
  return netWrapper(characterTable, indexTable, characters, json, input)
}

module.exports = Net