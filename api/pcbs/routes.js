const Router = require('koa-router')
const controller = require('./controller')

const router = new Router()
// router.get('/', async ctx => { ctx.status = 200 })

// Create
router.post('/', async ctx => {
  const pcb = await controller.create()
  ctx.body = pcb
})

// Read all
router.get('/', async ctx => {
  ctx.body = await controller.readAll()
})

// Read one
router.get('/:prodCode', async ctx => {
  ctx.body = await controller.readOne(ctx.params.prodCode)
})

module.exports = router