var http = require("http");
var config = require("./config.json");
var path=require("path");    //require加载模块
var fs=require("fs");

http.createServer(function (req, res) {
    var url = req.url;    //把请求的 URL 字符串给到变量上
    if(url=="/favicon.ico"){  //如果请求的数据有/favicon.icon这个路径给他终止
        fs.readFile("."+url,function (err,data) {
            res.setHeader("content-type","application/x-ico");
            res.end()
        })

    } else {
        var root=path.resolve(config.root);//把json文件里的root属性给到一个变量上去
        fs.readdir(root,function (err,data) {     //异步的 readdir读取一个目录的内容 |||回调有两个参数 (err, files)，其中 files 是目录中不包括 '.' 和 '..' 的文件名的数组。
            if(err){   //如果发生错误给响应头返回信息，目录不存在时：在页面显示根目录不存在
                res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
                res.end("根目录不存在");
            }else{  //否则
                if(path.extname(url)){    //判断path 是否存在扩展名
                    var fullUrl=path.join(__dirname,config.root,"."+url);//使用join拼接路径（文件夹+www+.+请求的url字符串）
                }else{
                    var fullUrl=path.join(__dirname,config.root,"."+url+"/"+config.index);
                }

                fs.readFile(fullUrl,function(err,data){//异步地读取fullUrl文件的全部内容  data是文件的内容
                    if(err){  //如果发生错误给响应头返回404信息，以及在页面显示页面不存在
                        res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
                        res.end("页面不存在");
                    }else{ //如果正常给响应头返回200正常信息，以及把data里的内容在页面显示
                       var exname=path.extname(fullUrl);
                        res.writeHead(200,{"content-type":config.type[exname]+";charset=utf-8"});
                        res.end(data);
                    }
                })

            }
        })

    }
}).listen(8833);
// setHeader可以一条一条设置，writeHead可以批量设置
// buffer   操作系统 4g 软件限制
// 把大的数据放在buffer类型里前台像canvas后台操作文件