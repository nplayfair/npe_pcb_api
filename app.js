const Koa         = require('koa')
const KoaRouter   = require('koa-router')
const json        = require('koa-json')
const render      = require('koa-ejs')
const bodyParser  = require('koa-bodyparser')
const path        = require('path')
require('dotenv').config()

const app     = new Koa();
const router  = new KoaRouter();

// Data source
const pcbs = [
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
router.get('/pcb/:productCode', showPcb);


// List all PCBs
async function index(ctx) {
  await ctx.render('index', {
    title: 'NPE PCB Utility',
    pcbs: pcbs
  });
}

// Show a single PCB
async function showPcb(ctx) {
  let pcb = pcbs.filter(o => o.productCode === ctx.params.productCode)[0];
  await ctx.render('pcb', {
    title: 'PCB Info',
    pcbData: pcb
  });
}

// Show Add PCB page
async function showAdd(ctx) {
  await ctx.render('add');
}

// Add a new PCB
async function addPcb(ctx) {
  const body = ctx.request.body;
  pcbs.push({name: body.pcbName, type: body.pcbType});
  await ctx.redirect('/');
}

router.get('/test', ctx => (ctx.body = [
  ...pcbs
]));

// Router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`)
});