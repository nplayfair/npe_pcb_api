const Koa       = require('koa');
const KoaRouter = require('koa-router')
const json      = require('koa-json');

const app     = new Koa();
const router  = new KoaRouter();

// JSON Prettier middleware
app.use(json());

router.get('/test', ctx => (ctx.body = { message: "Hello" }));

// Router middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started`)
});