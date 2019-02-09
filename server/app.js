import Koa from "koa"
const app = new Koa()

import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
const debug = require('debug')('koa2:server')
import path from 'path'
import bcrypt from 'bcrypt'

import config from './config'
import { connect,iniSchema } from './database/init'
import { routers } from './routes'

const port = process.env.PORT || config.port

// error handler
onerror(app)

// middlewares
app.use(bodyparser())
  .use(json())
  .use(logger())

routers(app)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - $ms`)
})

app.on('error', (err, ctx) => {
  console.log(err)
  logger.error('server error', err, ctx)
})

;(async () => {
  await connect()
  await iniSchema()
})()
module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
