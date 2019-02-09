module.exports = {
  port: 3000,
  mongodb:{
    db:'mongodb://localhost:27017/fulinzhongguo'
  },
  qiniu:{
      AK:'zI-iFQd7XLHKgYd0CP5kLjOSvJV2y2huwGzGapo3',
      SK:'oiLp9X3mQ1VAvxFM9RIuAum1e3JSdKqtEWxRBWpT',
      bucket:'test'
  },
  alipay: {
    URL: 'https://openapi.alipay.com/gateway.do',
    Redirect_uri:'http://www.junlintianxiazhifulinzhongguo.top/api/v0/login/authRedirect',
    APPID: '2018123062714467',
    FORMAT: 'json',
    CHARSET: 'UTF-8',
    ALIPAY_PUBLIC_KEY: '',
    SIGN_TYPE: 'RSA2',
    TIMESTAMP: 'yyyy-MM-dd HH:mm:ss',
    VERSION: 1.0
  } 
}
