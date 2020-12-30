const Sequelize = require('sequelize')
const db        = require('../config/database')

const Pcb = db.define('pcb', {
  name: {
    type: Sequelize.STRING
  },
  productCode: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  image_url: {
    type: Sequelize.STRING
  },
  bom: {
    type: Sequelize.STRING
  }
})

module.exports = Pcb;