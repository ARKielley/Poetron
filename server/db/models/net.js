const Sequelize = require('sequelize')
const db = require('../db')
const brain = require('brain.js')

const Net = db.define('net', {
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    verify: {
      notEmpty: true
    }
  },
  data: {
    type: Sequelize.JSON,
    allowNull: false,
    verify: {
      notEmpty: true
    }
  }
})

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

module.exports = Net