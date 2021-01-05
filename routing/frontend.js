const Router = require('koa-router')
const db = require('../models'); 

const router = new Router()

// Homepage
router.get('/', async ctx => {
  let pcbs = await db.Pcb.findAll({ raw: true })
  await ctx.render('index', {
    title: 'NPE PCB Utility',
    pcbs: pcbs
  })
})

// View all PCBs
router.get('view', async ctx => {
  let pcbs = await db.Pcb.findAll({ raw: true })
  await ctx.render('pcbs', {
    title: 'NPE PCB Utility',
    pcbs: pcbs
  })
})

// Add a new PCB
router.get('add', async ctx => {
  await ctx.render('add', {
    title: 'NPE PCB Utility',
    errors: [],
    message: null,
    pcbName: '',
    pcbType: '',
    productCode: '',
    description: '',
    image_url: '',
    bom: ''
  })
})

module.exports = router