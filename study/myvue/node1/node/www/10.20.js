// content-type   返回数据的类型以及编码
//Content-Encoding：gzip,deflate,compress  返回由什么压缩deflate是核心算法
// cookie做登录注册 保存状态的场景
// 例子:session  ()  如果没有cookie，session是不会运行的。
//              服务器      客户端
//     存钱        银行(把钱给了银行,银行给一个凭证,然后拿凭证去拿取)        凭证
// cookie   不安全的
//     存钱          银行(向银行要了你有1000元的凭证,钱还在自己手里,所以不安全)  凭证
// 为什么把header放在最上头：因为放下头就没用了，在浏览器输出之前设置头信息。

// 打包
// 1.先  cd到文件中
// 2.设置包 名（不能用中文空格）   -g全局安装npm install 包名  -g
// 3.全enter
// 4.上传到npm 上npm config get registry
// 5.登录   npm  login
// 6.npm publish上传
// 卸载全局安装npm uninstall 包名  -g

// 全局安装：要用在当前文件夹中start启动
// 在package.json里的bin里写"start1111":"./server.js"   version版本号提前
// 在server.js里写#!/user/bin/env node


// 步骤：
// 1创建系统级别的命令
// 1.在当前目录下创建package。json
// 2.在pack.json文件里添加配置项
// "bin":{命令：执行文件}
// 3.在要执行的文件头部
// #!/user/bin/env node
// 4.把当前的这个功能打包上传
// 登录   npm  login
// npm publish上传
// 5.将对应的包全局安装
// -g全局安装npm install 包名  -g
// 6.可以全局使用，你那个全局使用的命令就是你的bin里的命令；
// 7.可以忽略4 5步，不用打包上传，直接全局使用npm  link






// HTTP的If-Modified-Since头标签与客户端缓存相互配合，大大节约了网络流量

// package.json是个说明的文件
？// 加--save会把依赖放到package.json里边的依赖选项（dependencie，devDependencie）      如果出现^>是因为啥
// --save-dev可以简写为--D
// npm install可以简写为-i
// npm -save简写   -S
// ejs引擎
//



// 依赖
// 1.生产依赖   dependencie是一直都需要的
// 2.开发依赖   devDependencie在开发过程中需要的比如webpack


// node.js()如何连接数据库
// vue与react有什么区别


// 步骤使用express
