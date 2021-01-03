const Router = require('koa-router')
const pcbs = require('../api/pcbs/routes')

const router = new Router()
router.get('/test', async ctx => { ctx.status = 200 })

router.use('/pcbs', pcbs.routes())

module.exports = router