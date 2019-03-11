var tencentyoutuyun = require('..');
var conf  = tencentyoutuyun.conf;
var youtu = tencentyoutuyun.youtu;

// 设置开发者和应用信息, 请填写你在开放平台
var appid = '';
var secretId = '';
var secretKey = '';
var userid = '';

conf.setAppInfo(appid, secretId, secretKey, userid, 0)


//youtu.imageporn('a1.jpg', function(data){
//    console.log("imagetag:" + JSON.stringify(data));
//});
youtu.imageporn('http://open.youtu.qq.com/app/img/experience/porn/image_porn01.jpg', function(data){
    console.log("imagetag:" + JSON.stringify(data));
});

//youtu.idcardocr('a.jpg', 0, function(data){
//    console.log("idcardocr:" + JSON.stringify(data));
//});

//youtu.namecardocr('a.jpg', false, function(data){
//    console.log("namecardocr:" + JSON.stringify(data));
//});

youtu.imageterrorism('http://open.youtu.qq.com/app/img/experience/terror/img_terror01.jpg', function(data){
    console.log("imageterrorism:" + JSON.stringify(data));
});

youtu.carclassify('http://open.youtu.qq.com/app/img/experience/car/car_01.jpg', function(data){
    console.log("carclassify:" + JSON.stringify(data));
});

youtu.creditcardocr('http://open.youtu.qq.com/app/img/experience/char_general/ocr_card_1.jpg', function(data){
    console.log("creditcardocr:" + JSON.stringify(data));
});

youtu.bizlicenseocr('http://open.youtu.qq.com/app/img/experience/char_general/ocr_yyzz_01.jpg', function(data){
    console.log("bizlicenseocr:" + JSON.stringify(data));
});

youtu.plateocr('http://open.youtu.qq.com/app/img/experience/char_general/ocr_license_1.jpg', function(data){
    console.log("plateocr:" + JSON.stringify(data));
});

youtu.multifaceidentify('http://open.youtu.qq.com/app/img/experience/face_img/face_01.jpg', 'test', [], 5, 40, function(data){
    console.log("multifaceidentify:" + JSON.stringify(data));
});

