var light=require("ueklight");
require("./router/index")
require("./router/index/index")
require("./router/upload")
require("./router/upPostUser")
var query=require("uekquery");
var body=require("uekpost");
var cookie=require("uekcookie");
var multer=require("uekmulter");
var app=light();
app.use(query());
app.use(body());
app.use(multer({filename:function () {
    return new Date().getTime()
}}));
app.use(cookie("12312"));
app.listen(18080,function () {
    console.log('服务器8888开启...')
});