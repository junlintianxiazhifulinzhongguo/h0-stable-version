import config  from '../config'

import { 
    auth,
    conf,
    youtu
} from '../plug/youtu-nodejs_sdk'

import { resolve } from 'path'

const getFlow = async () => {
    try {
            conf.setAppInfo(config.youtu.appid, config.youtu.secretId, config.youtu.secretKey, config.youtu.userid, config.youtu.domain)
            auth.appSign(20000, config.youtu.userid)
            const imagePath = resolve(__dirname,'../1.png')
            const result = await youtu.generalocr(imagePath);
            return result
    } catch (err) {
            console.log(err)
    }
}

export{
    getFlow
}