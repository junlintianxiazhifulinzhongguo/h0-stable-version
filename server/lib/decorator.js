import Router from 'koa-router'
import glob from 'glob'
import { resolve, normalize } from 'path'
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

    ini ()
    {
        glob.sync(resolve(__dirname,this.apiPath,'./**/*.js')).forEach(require)
        for(let [conf, controller] of routerMap)
        {
            
        }
    }
}


const controller = path => target => (target.prototype[symbolPrefix] = path)
const  normalizePath = path.startsWith('/') ? path : `/${path}`
const router = conf => (target,key,descripor) => {
    conf.path = normalizePath(conf.path)
    routerMap.set({
        target:target,
        ...conf
    },target[key])
}
const get = path => router({
    method: 'get',
    path: path
})
const post = path => router({
    method: 'post',
    path: path
})
const put = path => router({
    method: 'put',
    path: path
})
const del = path => router({
    method: 'del',
    path: path
})
const use = path => router({
    method: 'use',
    path: path
})
const all = path => router({
    method: 'all',
    path: path
})

export {
    get,
    post,
    put,
    del,
    use,
    all
}
