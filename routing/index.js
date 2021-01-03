const Router = require('koa-router')
const pcbs = require('../api/pcbs/routes')
const frontend = require('./frontend')

const router = new Router()
router.get('/test', async ctx => { ctx.status = 200 })

router.use('/', frontend.routes())
router.use('/pcbs', pcbs.routes())


module.exports = router