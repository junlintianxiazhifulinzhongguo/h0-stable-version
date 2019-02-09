import { 
    controller,
    get,
    post,
    put,
    del,
    use,
    all,
    router
} from '../lib/decorator'

import mongoose from 'mongoose'

const Administrators = mongoose.model("Administrators")

import {  
    auth_url,
    getAccessToken,
    getUserInfo
} from '../service/alipay'

import { 
    getToken, 
    addUserByAlipay,
    getInfo
} from '../service/administrators'


@controller('/api/v0/login')
export class loginController
{
    @get("/alipay/authUrl")
    getAlipayAuthUrl(ctx,next)
    {
        ctx.body = {
            auth_url
        }
    }

    @get("/qq/authUrl")
    getAlipayAuthUrl(ctx,next)
    {
        ctx.body = {
            auth_url
        }
    }

    @get("/wechat/authUrl")
    getAlipayAuthUrl(ctx,next)
    {
        ctx.body = {
            auth_url
        }
    }

    @post("/getToken")
    async getToken(ctx,next)
    {
        const { type,value } = ctx.request.body
        const token = await getToken(type,value)
        ctx.body = {
            token
        }
    }

    @get("/getUserInfo")
    async getInfo(ctx,next)
    {
        const { token } = ctx.query
        const data = await getInfo(token)
        ctx.body =  data
    }
    
    @get("/authRedirect")
    async getAlipayAuthUrlById(ctx,next)
    {
        const { app_id,source,scope,auth_code } = ctx.query
        const resultToken = await getAccessToken(auth_code)
        const resultInfo = await getUserInfo(resultToken.accessToken)
        const result = await addUserByAlipay(resultInfo)
        const auth_redirect = 'http://www.junlintianxiazhifulinzhongguo.top/#/auth-redirect?type=alipay&code=' + result.alipayUserId
        ctx.redirect(auth_redirect)
    }   
}