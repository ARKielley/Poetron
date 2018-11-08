const Sequelize = require('sequelize')
const db = require('../db')

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

module.exports = Net