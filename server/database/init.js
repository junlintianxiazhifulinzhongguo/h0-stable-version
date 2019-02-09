import mongoose from 'mongoose' 
import { mongodb } from '../config/index'
// import glob from 'glob'
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
    // iniSchema:()=>{
    //     glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)              
    // }

export {
    connect
}