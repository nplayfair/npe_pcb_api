const Koa           = require('koa')
const KoaRouter     = require('koa-router')
const json          = require('koa-json')
const render        = require('koa-ejs')
const serve         = require('koa-static')
const mount         = require('koa-mount')
const bodyParser    = require('koa-bodyparser')
const responseTime  = require('koa-response-time')
const path          = require('path')
const routes        = require('./routing')

// Environment variables
const PORT    = process.env.PORT || 3000;

// Database
const db = require('./models');

const app     = new Koa();
const router  = new KoaRouter();


// Static files
app.use(mount('/public', serve(path.join(__dirname, 'public'))));

// Response time
app.use(responseTime())

// JSON Prettier middleware
app.use(json());
// Bodyparser middleware
app.use(bodyParser());

// Use ejs renderer
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

// === Route Methods
// List all PCBs from temp data
async function index(ctx) {
  let pcbs = await db.Pcb.findAll({ raw: true })
    .then(pcbs => {
      return pcbs
    })
    .catch(err => console.log(err));
  await ctx.render('index', {
    title: 'NPE PCB Utility',
    pcbs: pcbs
  })
}

// Get all PCBs from database to display
async function allPcbs(ctx) {
  let pcbs = await db.Pcb.findAll({ raw: true })
    .then(pcbs => {
      return pcbs
    })
    .catch(err => console.log(err));
  await ctx.render('pcbs', {
    title: 'NPE PCB Utility',
    pcbs: pcbs
  })
}

// Show Add PCB page
async function showAdd(ctx) {
  await ctx.render('add');
}

// Router middleware
app.use(router.routes()).use(router.allowedMethods());
app.use(routes.routes());

// Start server
module.exports = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})