var request=require('request')
var cheerio=require('cheerio')
var async=require("async");
var mysql=require("./router/mysql.js");
var md5=require("./router/md5.js");
var fs=require("fs");
var buf=Buffer.alloc(65535)

// request("http://news.baidu.com",function (err,head,body) {
// // console.log(body)//获取主题部分
// //////获取图片
//     var $=cheerio.load(body);
//     $("img").each(function (index,obj) {
//         if($(obj).attr("src").replace(/\s*/g,"")){
//             var src="";
//             if($(obj).attr("src").indexOf("http")>-1){
//                 src=$(obj).attr("src");
//             }else{
//                 src="http:"+$(obj).attr("src")
//             }
//             console.log(src)
//             var name=Math.random()+".png";
//             var write=fs.createWriteStream("./imgs/"+name)
//             request(src).pipe(write)
//         }
//     })
// })
// request("http://news.ifeng.com",function (err,head,body) {
// // console.log(body)//获取主题部分
// //////获取图片
//     var $=cheerio.load(body);
//     $("img").each(function (index,item) {
//         if($(item).attr("src").replace(/\s*/g,"")){
//             var src=$(item).attr("src");
//             // console.log(src)
//             var name=Math.random()+src.substr(src.lastIndexOf("."));
//             var write=fs.createWriteStream("./imgs/"+name)
//             request(src).pipe(write)
//         }
//     })
// })
// request("http://tech.ifeng.com",function (err,head,body) {
// // console.log(body)//获取主题部分
// //////获取图片
//     var $=cheerio.load(body);
//     var arr1=$('.hotNews h2 a');
//     var arr2=$('.hotNews h2 p');
//     var arr3=Array.prototype.slice.call(arr1)
//     var arr4=Array.prototype.slice.call(arr2)
//     var arr=arr3.concat(arr4)
//     console.log(arr.length)
//     arr.forEach(function (item,index) {
//         console.log($(item).text())
//         console.log($(item).attr('href'))
//     })
// })
//buffer--是一种缓存
//操作系统（属于计算机软工）
//内容4g
// 内部 安全机制 有效给每个进程有效内存使用空间
//
var CronJob=require("cron").CronJob
new CronJob('1 * * * * *', function(){
    go()
    console.log('You will see this message every second');

},null,true,'America/Los_Angeles');
function go(){


var datas=[];
var links=[];
async.series([
        //获取数据库已有的内容   布隆过滤器   buffer
        //1.数据库内的内容
        function (next)  {
            mysql.query("select * from information",function (err,result) {
                if(err){
                    console.log(err)
                }else{
                    for(var i=0;i<result.length;i++){
                        save(result[i].title,8)
                    }
                    next();
                }
            })
        },
        //2.获取列表内容
        function (next) {
            request("http://tech.ifeng.com/listpage/803/1/list.shtml",function (err,head,body) {
                var $=cheerio.load(body);
                var arr1=$('.zheng_list h1 a');
                var arr2=$('.zheng_list h2 a');
                var arr3=Array.prototype.slice.call(arr1)
                var arr4=Array.prototype.slice.call(arr2)
                var arr=arr3.concat(arr4)
                arr.forEach(function (item,index) {
                    links.push($(item).attr('href'))
                })
                next()
            })
        },
        //2.获取内容页
        function (next) {
            async.eachSeries(links,function (url,next1) {
                request(url,function (err,head,body){
                    var arr=[];
                    var $=cheerio.load(body);
                    var title=$("#artical_topic").text();
                    diff(title,8,function () {
                        var content=$("#artical_real").text();
                        arr.push(title);
                        arr.push(content);
                        var thumb='123'
                        arr.push(thumb);
                        datas.push(arr);
                        next1()
                        console.log(title)
                    },function () {
                        next()
                        console.log(title+"---已经存在")
                    })

                })
            })
        },
        // 4.放入数据库
        function (next) {
            mysql.query("replace into information (title,content,thumb) values ?",[datas],function (err,result) {
                if(err){
                    console.log(err)
                }else{
                    next(null,result.affectedRows)
                }
            })
        }
    ],
    function (err,num) {
        if(err){
            console.log(err)
        }else{
            console.log(num)
        }
    })


function save(str,num) {
    var md5str=md5(str);
    var nums=32/num;
    for(var i=0;i<32;i+=nums){
        buf[parseInt(md5str.substr(i,nums),16)]=1;
    }
}
function diff(str,num,success,err) {
    var md5str=md5(str);
    var nums=32/num;
    var flag=true;
    for(var i=0;i<32;i+=nums){
        if(buf[parseInt(md5str.substr(i,nums),16)]==1){
            flag=false;
        }
    }
    if(flag){
        if(success()){
            success()
        }
    }else{
        if(err()){
            err()
        }
    }
}
}
// save("http://baidu.com",8)
// diff("http://baidu.com",8,function () {})
