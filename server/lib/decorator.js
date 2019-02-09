import Router from 'koa-router'
import glob from 'glob'
import { resolve, normalize } from 'path'
import _ from 'lodash'
const isArray = c => _.isArray(c) ? c : [c]
const symbolPrefix = Symbol()
const routerMap = new Map()
export class Route
{
    constructor (app,apiPath)
    {
        this.app = app
        this.apiPath = apiPath
        this.router = new Router()
    }

    init ()
    {
        glob.sync(resolve(__dirname,this.apiPath,'./**/*.js')).forEach(require)
        for(let [conf, middleware] of routerMap)
        {
            const middlewares=isArray(middleware)
            const prefix = conf.target[symbolPrefix]
            if(prefix) prefix = normalizePath(prefix)
            const routerPath=prefix + conf.path
            this.router[conf.method](routerPath,...middlewares)
        }
        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())
    }
}


export const controller = path => target => (target.prototype[symbolPrefix] = path)
export const  normalizePath = path => path.startsWith('/') ? path : `/${path}`
export const router = conf => (target,key,descripor) => {
    conf.path = normalizePath(conf.path)
    routerMap.set({
        target:target,
        ...conf
    },target[key])
}
export const get = path => router({
    method: 'get',
    path: path
})
export const post = path => router({
    method: 'post',
    path: path
})
export const put = path => router({
    method: 'put',
    path: path
})
export const del = path => router({
    method: 'del',
    path: path
})
export const use = path => router({
    method: 'use',
    path: path
})
export const all = path => router({
    method: 'all',
    path: path
})

// export {
//     get,
//     post,
//     put,
//     del,
//     use,
//     all
// }
