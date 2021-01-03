const Router = require('koa-router')
const controller = require('../api/pcbs/controller')

const router = new Router()

// Homepage
router.get('/', async ctx => {
  let pcbs = await controller.readAll()
  await ctx.render('index', {
    title: 'NPE PCB Utility',
    pcbs: pcbs
  })
})

// View all PCBs
router.get('view', async ctx => {
  let pcbs = await controller.readAll()
  await ctx.render('pcbs', {
    title: 'NPE PCB Utility',
    pcbs: pcbs
  })
})

// Add a new PCB
router.get('add', async ctx => {
  await ctx.render('add', {
    title: 'NPE PCB Utility'
  })
})

module.exports = router