
import Koa from "koa"
import Router from'koa-router'
const app = new Koa()
const router = new Router()

import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
const debug = require('debug')('koa2:server')
import path from 'path'

import config from './config'
import routes from './routes'
import { connect } from './database/init'
const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods())

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

router.get('/', (ctx, next) => {
  ctx.body = 'Hello World'
})

routes(router)
app.on('error', (err, ctx) => {
  console.log(err)
  logger.error('server error', err, ctx)
})

;(async () => {
  await connect()
  console.log('wwo')
})()
module.exports = app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`)
})
