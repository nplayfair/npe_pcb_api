const db = require('../../models'); 

exports.readAll = async function () {
  return db.Pcb.findAll({ raw: true })
}

exports.readOne = async function (prodCode) {
  return db.Pcb.findOne({ where: { productCode: prodCode } })
}