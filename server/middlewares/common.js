import json from 'koa-json'
import onerror from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'

export const common = (app) =>{
    onerror(app)
    app.use(bodyparser())
       .use(json())
       .use(logger())
       .use(async (ctx, next) => {
            const start = new Date()
            await next()
            const ms = new Date() - start
            console.log(`${ctx.method} ${ctx.url} - $ms`)
        })
        .on('error', (err, ctx) => {
            console.log(err)
            logger.error('server error', err, ctx)
        })
}