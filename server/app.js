
import Koa from "koa"
const debug = require('debug')('koa2:server')
import config from './config'
import { connect,iniSchema } from './database/init'
import useMiddlewares from './middlewares'
const port = process.env.PORT || config.port

;(async () => {
  await connect()
  await iniSchema()
  const app = new Koa()
  await useMiddlewares(app)
  module.exports = app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
  })
})()

