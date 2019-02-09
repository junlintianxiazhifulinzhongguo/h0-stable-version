import mongoose from 'mongoose'
const Administrators = mongoose.model("Administrators");
import md5 from 'md5-nodejs'
const time = Date.now()
const  getToken = async (type,value) =>{
    let query = {}
    switch(type)
    {
        case 'name':
            query.name = value.username
            query.password = value.password
            break
        case 'email':
            query.email = value.email
            query.password = value.password
            break
        case 'alipay':
            query.alipayUserId = value
            break
        case 'wechat':
            query.wechatUserId = value
            break
        case 'qq':
            query.qqUserId = value
            break    
    }  
    const hashToken = md5(time + value);
    await Administrators.update(query,{$set:{token:hashToken}})
    const result = await Administrators.findOne(query)
    return result.token
}

const getInfo = async(token)=>{
    let query = {}
    if(token)
    {
        query.token = token
    }
    const { name,roles,avatar } =await Administrators.findOne(query)
    const info = {}
    switch(roles)
    {
        case 1:
            info.roles = ["admin"]
            info.introduction = "我是超级管理员"
            break
        case 2:
            info.roles = ["editor"]
            info.introduction = "我是文章编辑管理员"
            break
        case 3:
            info.roles = ["database"]
            info.introduction = "我是数据库管理员"
            break
        case 4:
            info.roles = ["admin"]
            info.introduction = "我是超级管理员"
            break            
    }
    info.name = name
    info.avatar = avatar
    info.token = token
    return info
}


const getAll = async () =>{
    let query = {}
    const result =await Administrators.find(query)
    return result
}

const  getByUsername = async (username) =>{
    let query = {}
    if(username)
    {
        query.username = username
    }
    const result =await Administrators.find(query)
    return result
}

const  addUserByAlipay = async (resultvalue) =>{
    const isExistence = await Administrators.find({ 'alipayUserId':resultvalue.userId })
    if (!isExistence.length)
    {
        const administrators = new Administrators({  
            name: resultvalue.nickName,
            avatar: resultvalue.avatar,
            email: '2211672s8@qq.com',
            alipayUserId: resultvalue.userId
        });
        await administrators.save();
    }  
    const result = await Administrators.findOne({'alipayUserId':resultvalue.userId})
    return result
}

export {
    getToken,
    getAll,
    getByUsername,
    addUserByAlipay,
    getInfo
}