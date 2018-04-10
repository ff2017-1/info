//varchar存储具有优势，读取无优势   因为varchar可以存储0-255个字符
// char储存无优势，读取有优势   因为char最少256
// init   12
// 密码  32

// 用户管理
// 权限管理     超级管理员/人事/相关部门可以查看相关人员/个人
// 员工表   账户/密码/头像/电话/pid部门id/  user
// //部门表   paertid  记录父id   部门id  部门名
// 例：pid     pname     parentid
//     1      运营中心       0
//     2      服务中心       0
//     3      技术部         1
//     4      前端           3
// 日志信息表    Journal
// jid     uid1发送者  uid2接收者  发送的标题title   发送内容content   是否被查看(选)
// 资讯表  information
// Iid     title    content   thumb
// 即时通讯表储存信息   message

// 数据库，关系型数据库与非关系型数据库
// 为什么要按需引入，因为打包的时会把不用的element也打包了
// webpack打包npm  build




// 服务器缓存原理，如果hmtl存在就不生成，存在就生成
// fs.stat("1.html",function (err) {
//         if(err){
//             res.build();
//             res.send("<em>qwqw</em>")
//         }else{
//             re.sendFile("1.html")
//         }
//     })
// 解决跨域jsonp，代理
// 代理原理   爬虫的原理一样
// 对方服务器配合情况下，jsonp  script标签对，自己的项目可以jsonp
// 代理是什么意思 :--->发起请求，需要地址，请求头的信息

// 方法1;
// const options = {
//     hostname: 'www.sxuek.com/',
//     port: 80,
//     method: 'GET',
//
// };
// var req=http.request(options,function (res) {
//     var datas=""
//     res.on("data",function (datas) {
//         datas+=datas
//     })
//     res.on("end",function (data) {
//         console.log(data)
//     })
// })
// 方法二

// var request=require("request");
// var cheerio=require("cheerio");
// request("",function (err,res,body) {
//     var $=cheerio.load(body)
//     var con=('').find("").text()
//     console.log(con)
// })

// 自己写的一个代理
function getData(url){

}

// 自己可以做一个浏览器
// 创建一个文件夹    client.html client.js
// 1.create-light   cd light   npm install
// 2.修改路由 res.reader("index.html")  index
// 3.修改html'----view
// // 4
// 跨域问题
// 当你使用ajax的时候会遇到跨域的问题
//
// 代理      本身访问不了外部地址，可以通过别人去代理，
// 缺点：使用起来比较复杂，用别的技术实现跨域，借住别的技术实现代理获取数据，
// php-》curl模块node.js->request
//
// 优势：通过代理可以获得任何想要的数据。
// json      script标签对   script标签对 有获取外部地址的能力，
// 缺点：范围小，如果返回的东西不是自己想要的，就没用了，需要对方服务器的配合（返回数据符合语法等）


// 闭包


// 工作流的网页没有扩展性，依赖性  后台优化数据的优化，前台注重前台的优化

//为什么要用vue   锤炼开发人员的编程能力，所有产品都有统一的开发模式，所以需要一个组件化开发
// websocket 做推送，qq微信
// 上传multer
//

// 查看角色 与添加角色   管理员-》角色-》权限
  // 管理员    管理员名   权限
  // 添加角色    角色名  权限
  // 添加权限    权限名   权限值
// 耗费时间，不确定时间的时候用异步
// 让一步的代码按照顺序执行  pomisie， async解决

// 登录隐患
// sql注入网络安全sql   'or 1=1 --    （正则解决）
// session的隐患






// 多个组件之间的数据如何传递
// 1.params
//2.query
//3.vuex  处理状态   vue 数据   多组件共享数据  用在最适合的地方（有需求的时候用）


// vue中 多个组件如何共享数据
// 1.如果里层的组件，要改变外层的，自定义事件的方式
// 2.如果有路由配合，地址传参的方式   query与params（数据一般是3-4k）
// 3.vuex方式定义全局组件的数据，组件(大量数据)

// vue是单页面应用，比较适合 增删改查
//具有 mvc   面向对象的编程思路

// 在vue中把数据叫做状态，应用vuex
// 实例化对象   更改数据的方法同步commit  异步action
// 优缺点  兴趣爱好



//1. 文件上传，2.文件保存的路径，存在数据库 点提交上传


// 权限：看角色里边有没有用户
// 用户删掉  异步
// 删除角色
// 删除照片fs.unlink   path.resolve(photo)
// 大量回调函数，（回调地狱）   于是用队列，promise，async
// try,catch 同步抛出错误
// php同步的 ，阻塞的   多线程  消耗资源
// nodejs开启多线程，多进程     单线程异步机制（不会阻塞）
//   线程   与进程  洪水与引流   线程是在进程的基础上的
// 数据库的事务处理::  在线支付  关系型数据库  停电了没删完直接回到原始状态（回滚回去）
// innoDB可以数据回滚   关系型数据库



// ajax获取数据  百度收录不了，暴露方式
// www.baidu.com/robots.txt       百度的协议规则
// cron爬虫包
// 分布式爬虫针对大量的数据



// react
// 1.  main.js   render:h=>h(App)
// 2.当前组件调用render  (createElement()）
// 3.当期那组件里边不能出现template
// 4.下载相关包
// 5.进行配置
// 6.开始使用
// 7.熟悉jsx语法
// jsx语法注意俩点：   1.html      2.{表达式}


// webpack打包
//  npm  run build   打包
// 建一个html  把打包好的html放进去后台
//后台访问  路由改变 router.get('ddhome/admin',function(req,res){
//render('/ddhome/index.html')
// })
//把打包好的js  css  img放到后台
//

// 上传用element与express比较简单
// mysql遇到大量数据用？代替
// 1。检查数据的格式是不是合理，
// 2.合理的数据放到数据库


// 去重
// var arr=[1,2,3,4,5,6,8,2,3,4,5];
// var obj=new Set(arr);
// var obj1=Array.from(obj)
// console.log(obj1);
// call用来转换this指针
// var obj2={0:'2',1:'w',length:2}
// aa=Array.prototype.slice.call(obj2)
// console.log(aa)


// request()括号里边的地址放的是uri   而url是一种具体的URI


// async.series
// 先获取数据库中已有的数据
// 布隆过滤器   搜索引擎之父
// 缓存      操作系统里边有安全机制，有效的给每个进程有效的内存使用空间
// buffer的特点
// 保存数据内存
// 数据的读取快
// []的格式
// 前台的javascript    实现了buffer数据类型，并没有实现buffer的接口
// nodejs可以操作buffer
// ASCII   unkie

// 鼠标精确到相熟的，在屏幕的任何活动都可以监控到  手机a->b是监控不到的
// e.couthes
// 打包    mui项目     页面入口  改一下
// 发行  原生安装包    android   打包1
// 为了别人能下载   加个路由   上传  /download
// res.download("地址",'虾子地址')