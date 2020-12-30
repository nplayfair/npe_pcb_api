const Koa           = require('koa')
const KoaRouter     = require('koa-router')
const json          = require('koa-json')
const render        = require('koa-ejs')
const bodyParser    = require('koa-bodyparser')
const path          = require('path')

// Database
// const db = require('./config/database')
const db = require('./models');

const app     = new Koa();
const router  = new KoaRouter();
const PORT    = process.env.PORT || 3000;

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

router.get('/test', ctx => (ctx.body = [
  ...temp_pcbs
]));
router.get('/testadd', tempAdd);

// PCB Routes
router.get('/pcb/:productCode', showPcb);
router.get('/all', allPcbs);



// Route Methods
// List all PCBs from temp data
async function index(ctx) {
  await ctx.render('index', {
    title: 'NPE PCB Utility',
    pcbs: temp_pcbs
  });
}

// List all PCBs from database
async function allPcbs(ctx) {
  await Pcb.findAll()
    .then(pcbs => {
      console.log(pcbs);
      ctx.body = 'Done';
    })
    .catch(err => console.log(err));
}

// Show a single PCB
async function showPcb(ctx) {
  let pcb = temp_pcbs.filter(o => o.productCode === ctx.params.productCode)[0];
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
  temp_pcbs.push({name: body.pcbName, type: body.pcbType});
  await ctx.redirect('/');
}

// Test method to add db entry
async function tempAdd(ctx) {
  const data = {
    name: 'Tube Screamer',
    productCode: 'screamer',
    type: 'Overdrive',
    description: 'Green overdrive pedal',
    image_url: 'screamer.png',
    bom: 'testbom'
  }

  let { name, productCode, type, description, image_url, bom } = data;
  console.log(name, productCode);
  // Insert into db
  await Pcb.create({
    productCode,
    name,
    type,
    description,
    image_url,
    bom
  })
    .then(pcb => ctx.redirect('/'))
    .catch(err => console.log(err));

}


// Router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
});