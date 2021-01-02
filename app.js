const Koa           = require('koa')
const KoaRouter     = require('koa-router')
const json          = require('koa-json')
const render        = require('koa-ejs')
const serve         = require('koa-static')
const mount         = require('koa-mount')
const bodyParser    = require('koa-bodyparser')
const path          = require('path')

// Database
// const db = require('./config/database')
const db = require('./models');

const app     = new Koa();
const router  = new KoaRouter();
const PORT    = process.env.PORT || 3000;

// Static files
app.use(mount('/public', serve(path.join(__dirname, 'public'))));

// Data source
const temp_pcbs = [
  {productCode: 'FACE', name: 'Fuzz Face', type: 'Fuzz' },
  {productCode: 'tim', name: 'Timmy', type: 'Overdrive' },
  {productCode: 'viper', name: 'Naga Viper', type: 'Boost' }
]

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

// Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', addPcb);
router.get('/pcbs', allPcbs);
router.get('/pcbs/:productCode', showPcb);

// API Routes
router.post('/api/pcbs/:productCode', getPcb);
router.post('/api/pcbs', allPcbsJSON);



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

// List all PCBs from database as JSON
async function allPcbsJSON(ctx) {
  await db.Pcb.findAll()
    .then(pcbs => {
      ctx.body = pcbs
    })
    .catch(err => console.log(err));
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

// Show a single PCB
async function showPcb(ctx) {
  let pcb = temp_pcbs.filter(o => o.productCode === ctx.params.productCode)[0];
  await ctx.render('pcb', {
    title: 'PCB Info',
    pcbData: pcb
  });
}

// Get a single PCB from database
async function getPcb(ctx) {
  await db.Pcb.findOne({ where: { productCode: ctx.params.productCode } })
    .then(pcb => {
      ctx.body = pcb.toJSON();
    })
    .catch(err => console.log('Error: ', err));
}

// Show Add PCB page
async function showAdd(ctx) {
  await ctx.render('add');
}

// Add a new PCB
async function addPcb(ctx) {
  const body = ctx.request.body;
  temp_pcbs.push({name: body.pcbName, type: body.pcbType});
  await ctx.redirect('/');
}

// Router middleware
app.use(router.routes()).use(router.allowedMethods());


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});