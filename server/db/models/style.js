const Sequelize = require('sequelize')
const db = require('../db')

const Style = db.define('style', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    verify: {
      notEmpty: true
    }
  }
})

module.exports = Style