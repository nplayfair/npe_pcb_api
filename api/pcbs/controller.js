const Pcb = require('./model'); 
 
 exports.readOne = async function (prodCode) {
  const pcb = await Pcb.readOne(prodCode)
  return pcb
 }

 exports.readAll = async function () {
  const pcbs = await Pcb.readAll()
  return pcbs
 }