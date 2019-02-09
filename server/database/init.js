import mongoose from 'mongoose' 
import { mongodb } from '../config/index'
import glob from 'glob'
import { resolve } from 'path'

mongoose.Promise=global.Promise
const connect = () => {
        let maxConnectTimes=0
        return new Promise((resolve,reject)=>{
            if(process.env!='production')
            {
                mongoose.set('debug',true)
            }
            mongoose.connect(mongodb.db, {useNewUrlParser: true})
            mongoose.connection.on('disconnected',()=>{
                maxConnectTimes++
                if(maxConnectTimes<5)
                {
                    mongoose.connect(mongodb.db, {useNewUrlParser: true})
                }
                else
                {
                    throw new Error('数据库挂了，请维修')
                }
            })
            mongoose.connection.on('error',(err)=>{
                maxConnectTimes++
                if(maxConnectTimes<5)
                {
                    mongoose.connect(mongodb.db, {useNewUrlParser: true})
                }
                else
                {
                    throw new Error('数据库挂了，请维修')
                }
            })
            mongoose.connection.once('open',()=>{
                maxConnectTimes=0
                resolve('连接成功')
                console.log('Mongodb connected succsefully')
            })
        })       
}

const iniSchema = ()=>{
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
    const Administrators = mongoose.model("Administrators");
    // const administrators = new Administrators({
    //     username: '李',
    //     password: '123',
    //     email:'22116728@qq.com'
    // });
    // Administrators.comparePassword('123','$2b$10$/hu2sJVUY16DPtXaZA0lR.jiIpHOMMmUioDFMs.19XtXKmmKyjROS').then(function(data){
    //     console.log(data)
    // })
   // console.log(Administrators)
    
}

export {
    connect,
    iniSchema
}