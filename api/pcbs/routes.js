const Router = require('koa-router')
const controller = require('./controller')

const router = new Router()
// router.get('/', async ctx => { ctx.status = 200 })

// Create
router.post('/', async ctx => {
  const pcb = await controller.create()
  // TODO create a pcb
})

// Read all
router.get('/', async ctx => {
  ctx.body = await controller.readAll()
})

// Read one
router.get('/:prodCode', async ctx => {
  const prodCode = ctx.params.prodCode;
  ctx.body = await controller.readOne(prodCode)
})

// Update a PCB
router.put('/:prodCode', async ctx => {
  const prodCode = ctx.params.prodCode;
  // TODO update a pcb
})

// Delete a PCB
router.delete('/:prodCode', async ctx => {
  const prodCode = ctx.params.prodCode;
  // TODO delete a pcb
})


module.exports = router