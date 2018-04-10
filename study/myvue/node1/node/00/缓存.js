var http = require("http");
var config = require("./config.json");
var path=require("path");    //require加载模块
var fs=require("fs");
const zlib=require("zlib");
/*
* Cache-Control的值
* private   只有一次访问的时候访问服务器，之后缓存
* no-cache  每一次都会请求服务器
* max-age=10  秒计时
* html头信息设置：http-equiv="X-UA-Compatible"    content="IE=Edge"  只对ie8浏览器有用，解决兼容性问题
*
* */
http.createServer(function (req, res) {
    var url = req.url;    //把请求的 URL 字符串给到变量上
    // if(req.headers.cookie != "name=zhangshan "&& req.headers.cookie)
    if(url=="/favicon.ico"){  //如果请求的数据有/favicon.icon这个路径给他终止
        fs.readFile("."+url,function (err,data) {
            if(err){
                res.end()
            }else{
                res.setHeader("content-type","application/x-ico");
                res.end(data)
            }

        })

    } else {
        //异步：能捕获到错误，但不会断掉
        //fs.readdir：访问目录       fs.readFile：访问文件
        var root=path.resolve(config.root);//把json文件里的root属性给到一个变量上去
        fs.readdir(root,function (err,data) {     //异步的 readdir读取一个目录的内容 |||回调有两个参数 (err, files)，其中 files 是目录中不包括 '.' 和 '..' 的文件名的数组。
            if(err){   //如果发生错误给响应头返回信息，目录不存在时：在页面显示根目录不存在
                res.writeHead(404,{"content-type":"text/html;charset=utf-8"});
                res.end("根目录不存在");
            }else{  //否则
                // console.log(fs.stat)
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
                        fs.stat(fullUrl,function(err,info){
                            /*res.setHeader('content-Encoding','gzip');
                        fs.createReadStream('content-Encoding','gzip')*/
                            var time1=(new Date(req.headers["Last-Modified"]).getTime());
                            var time2=(new Date(req.headers["Last-Modified"]).getTime());
                            // var time2=info.mtime.toUTCString();
                            if(time1&&time1 ==time2){
                                res.writeHead(304);
                                res.end()
                            }else{
                                res.end()
                            }
                        })

                        res.writeHead(200,{"content-type":config.type[exname]+";charset=utf-8"});
                        res.end(data);
                    }
                });


            }
        })
        //同步：有错误会终止,但写在回掉函数try中，就和异步一样
        //         try{
        //             fs.readFileSync('www')
        //         }catch(err){
        //             console.log(err);
        //         }
    }
}).listen(8832);