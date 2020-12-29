const Koa       = require('koa')
const KoaRouter = require('koa-router')
const json      = require('koa-json')
const render    = require('koa-ejs')
const path      = require('path')

const app     = new Koa();
const router  = new KoaRouter();

// JSON Prettier middleware
app.use(json());

// Use ejs renderer
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

// Index route
router.get('/', async ctx => {
  await ctx.render('index');
})

router.get('/test', ctx => (ctx.body = { message: "Hello" }));

// Router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`)
});