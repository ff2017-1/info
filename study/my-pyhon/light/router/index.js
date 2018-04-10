var light=require("ueklight");
var getData=require("./client");
var cheerio=require("cheerio");
var request=require("request");
var router=light.Router();
router.get("/",function(req,res){
    res.render("index.html",{name:"light"});
})
router.get("/ajax",function(req,res){
    var url=(req.query.url);
    getData(url,function(body){
        // res.end(JSON.stringify(body))
        $=cheerio.load(body)
        var s=$('.yyxwCon>.lyn-science-title').text()
        res.send(s)
    })
    // ?????????????????????????????????????????????
    // request(url,function (err,res,body) {
        // var $=cheerio.load(body)
    //     var con=$('#wzq_link').find("a").text();
    //     console.log(con)

})