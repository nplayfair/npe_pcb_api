const Koa           = require('koa')
const json          = require('koa-json')
const render        = require('koa-ejs')
const serve         = require('koa-static')
const mount         = require('koa-mount')
const bodyParser    = require('koa-bodyparser')
const responseTime  = require('koa-response-time')
const path          = require('path')
const routes        = require('./routing')

// Instantiate app
const app     = new Koa();

// Environment variables
const PORT    = process.env.PORT || 3000;

// Database
const db = require('./models');

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

// Router middleware
app.use(routes.routes());

// Start server
module.exports = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})