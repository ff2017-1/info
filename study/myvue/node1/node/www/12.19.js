// 具有接受和响应的能力  web服务器
// 浏览器->输入网址(接收到键盘指令通过键盘协议)->
// ->cpu调动内存->存到内存->硬盘->cup(高速缓存)
// ->显卡->屏幕
// cpu->地址->网卡->交换机->路由->dns->地址->dns->机器->
//     这样表明机器有接受能力


// 响应  网卡->cpu->node.js->找响应的资源
// ->请求端的地址网卡
// http://tool.oschina.net/commons/    规范

// iis是微软的服务器
// wramp中的apache服务器


// 客户端curl https://baike.baidu.com/
// postman可以发送接受put和deleet请求    apache阿帕奇


// 记一下状态码
// var http=require("http")
// // var fs=require("fs")
// var server=http.createServer() ;
//
// server.on("request",function () {
//     console.log("request")
// })
// server.listen(8000);

// 查哪个进程在用端口

// kill 6472（进程）杀掉
// http是一种无状态协议，只能由客户端发起，不能由服务器发起
// 三次握手（3次请求发送数据）  四次挥手（4次确认断开连接）
// 当我们访问某个服务器时，客户端->服务器，1.看地址在不在（服务器），2.发信息3.接受4.告诉是否接受完与发完了，
// 断开（客户端与服务器都确认要断开），一方说断开了发送另一方断开



// http.IncomingMessage 类上有什么方法  req上就有什么方法
// http.ServerResponse 类上有什么方法  res上就有什么方法
// http.Server 类
// http一般使用的1.1版本


// 服务器模板
// var http=require("http")
// var server=http.createServer() ;
// server.on("request",function (req,res) {
//    if(req.url == "/favicon.icon" ) {
//        res.end("icon")
// }else{
//        if(req.url == "/123"){
//            res.end("124")
//        }else{
//            res.end("mmp")
//        }
//    }
// })
// server.listen(8853);
// 路径： 1.本地资源的路径  C:/a/b/c    /124
//        2.url的路径,网址的路径




// http模块的属性
// 1.http.METHODS              返回解析器支持的 HTTP 方法的列表(Array)。
// 2.http.STATUS_CODES，       返回标准的 HTTP 响应状态码的集合，以及各自的简短描述。
//                           例如，http.STATUS_CODES[404] === 'Not Found'。
// 3.》？？http.createServer([function]) 返回一个新建的 http.Server类 实例
// 4.http.get(options[, callback])    因为大多数请求都是 GET 请求且不带请求主体，所以 Node.js 提供了该便捷方法。 该方法与 http.request() 唯一的区别是它设置请求方法为 GET 且自动调用 req.end()。
//                                    注意，回调函数务必消耗掉响应数据，原因详见 http.ClientRequest 章节。
//                                    callback 被调用时只传入一个参数（res），
// 5.http.request(options[, callback])


// zlib压缩模块
// zlib模块提供通过 Gzip 和 Deflate/Inflate 实现的压缩功能
//                 压缩或者解压数据流(例如一个文件)通过zlib流将源数据流传输到目标流中来完成。



