#!/usr/bin/env node
var http = require("http");
var config = require("./config.json");
var path = require("path");  //require加载模块
var fs = require("fs");
const zlib = require('zlib');

http.createServer(function (req, res) {

    var url = req.url;   //把请求的 URL 字符串给到变量上
    if (req.headers.cookie !== "name=zhangsan" && req.headers.cookie !== undefined) {
        res.end("login");
    } else {
        if (url == "/favicon.ico") {    //如果请求的数据有/favicon.icon  写到icon上  出现错误就终止
            fs.readFile("." + url, function (err, data) {
                if (err) {
                    res.end();
                } else {
                    res.setHeader("content-type","application/x-ico");
                    res.end(data);
                }
            })

        } else {

            var root = path.resolve(config.root);   //把json文件里的root属性给到一个变量上去
            fs.readdir(root, function (err, data) {   //异步的 readdir读取一个目录的内容 |||回调有两个参数 (err, files)，其中 files 是目录中不包括 '.' 和 '..' 的文件名的数组。
                if (err) { //如果发生错误给响应头返回信息，目录不存在时：在页面显示根目录不存在
                    res.writeHead(404, {"content-type": "text/html;charset=utf-8"});
                    res.end("根目录不存在");
                } else {
                    if (path.extname(url)) {   //判断path 是否存在扩展名
                        var fullUrl = path.resolve(config.root, "." + url);//使用join拼接路径（文件夹+www+.+请求的url字符串）

                    } else {
                        var fullUrl = path.resolve(config.root, "." + url + "/" + config.index);
                    }

                    fs.stat(fullUrl, function (err, info) {//读取fullUrl文件的全部内容  data是文件的内容

                        if (err) {//如果发生错误给响应头返回404信息，以及在页面显示页面不存在
                            res.writeHead(404, {"content-type": "text/html;charset=utf-8"});
                            res.end("页面不存在");
                        } else {//如果正常给响应头返回200正常信息，以及把data里的内容在页面显示

                            if (config["server-info"]) {
                                res.setHeader("server", config["server-info"]);  //在header里边设置server类型nodejs
                            }
                            if (config["cache-control"]) {        //判断cache-control属性是true/flase
                                res.setHeader("cache-control", config["cache-control"]) //如果为true在header里边设置缓存时间
                            }
                            // console.log(req.headers)
                            var time1 = (new Date(req.headers["if-modified-since"]).getTime());
                            var time2 = new Date(info.mtime).getTime();
                            console.log(time1)
                            // console.log(time2)
                            // If-Modified-Since是标准的HTTP请求头标签，在发送HTTP请求时，把浏览器端缓存页面的最后修改时间一起发到服务器去，
                            // 服务器会把这个时间与服务器上实际文件的最后修改时间进行比较。
                            if (time1 && time1 == time2 && config["last-modified"]) {
                                // 如果时间一致，那么返回HTTP状态码304（不返回文件内容），
                                // 客户端接到之后，就直接把本地缓存文件显示到浏览器中。
                                res.writeHead(304);
                                res.end();
                            } else
                            // 如果时间不一致，就返回HTTP状态码200和新的文件内容，
                            // 客户端接到之后，会丢弃旧文件，把新文件缓存起来，并显示到浏览器中。
                                if (config["last-modified"]) {   //Last-Modified，告诉客户端页面的最后修改时间。
                                    res.setHeader("Last-Modified", info.mtime.toUTCString());
                                }


                                var extname = path.extname(fullUrl);
                                res.setHeader("set-cookie", "name=zhangsan");  //设置cookie
                                res.setHeader("Content-Encoding", "gzip");   //通用头设置压缩方式是gzip

                                res.writeHead(200, {"content-type": config.type[extname] + ";charset=utf-8"});

                                fs.createReadStream(fullUrl).pipe(zlib.createGzip()).pipe(res)   //进行压缩


                            }
                    })


                }
            })

        }
    }

}).listen(config.port, function () {
    console.log(config.message);
});





