// 想让函数中的this指向环境用箭头函数
// var c=(message)=>console.log(message)
// c('123')
// var c=(message,sd)=>console.log(message+sd)
// c(1,23)
// // 剩余与展开
// var c=(message,...sd)=>{console.log(message+sd)
//     console.log(message)
//     console.log(...sd)//...展开  放在实参   剩余放在形参
//
// }
// c(1,2,3,4,5,6,7,8)
// 解构 让对象调用起来跟方便
// var obj={
//     name:'zhangshan',
//     age:12,
//     sex:'nan',
//     son:{
//         name:'xiangzhangsan'
//     }
// }
// // 解构用法
// with(obj){
//     console.log(name);
//     console.log(age);
//     console.log(sex);
// }
// es6定义语法解构
// var {name,age,sex}=obj;
// console.log(name);
// console.log(age);
// console.log(sex);
// var {son:{name}}=obj;
// console.log(name)
// var {son:{name},son:{son1}}=obj;   错的
// console.log(son1)
// 模板字符串
// 加变量的方式去进行拼接模板字符串`${变量} `
// 函数的用法
// 1.函数他就是把特定的功能的代码分装，重复的利用
// 2.函数当做对象
// function c(message) {
//     console.log(message)
// }
// c.slice=function (str) {
//     return str.slice(0,-2)
// }
// 3.函数可以当做类去使用。继承
// class person{
//     constructor(){
//         console.log('dasd')
//     }
// }
// console.log( new person)
// class person{
//     constructor(){
//        this.name='zhangsan'
//         this.sex='nan'
//     }
// }
// console.log( new person)
// var obj=new person();
// console.log(obj.name)
// 防止this指向混乱用super()
// 数组的方法



// 模板引擎：是为了使用户界面与业务数据（内容）分离而产生的，它可以生成特定格式的文档，用于网站的模板引擎就会生成一个标准的HTML文档。
// 基于v8引擎的javascript运行环境基于事件驱动，非阻塞型// 耗时的异步的放在最后加载//服务器端的语言
// 具有接受和响应的能力

// 1.安装运行环境
// node.js的安装
// 浏览器与编程有关的2个模块,一块解析html与css，一部分解析js
// node就是给浏览器一个运行环境，解析js代码，
// node+运行的文件来执行当前文件 dir列出当前目录下的东西。
// 2.搭建开发环境 phpstorm命令Run
// 3.nodejs
// 模块：一种编程思想，模块是完整功能的一个结合，模块能让我们代码高内聚，低耦合，
//      node是由一个有一个模块组成的（以模块为核心），用哪个模块因那个模块，
//
// 注意：import xxx from "xxx"
// 没有任何环境可以解析，vue使用bable识别的
// cmd是common  module defined正常的模块处理加载定义方式（后台应用）    与amd异步的模块定义加载方式（前台）（运行在服务器即自己电脑上）
// cmd与amd有访问的差别

// js是单线程异步机制，运行在前端，（需要耗时或者不确定代码执行时间的地方运行异步机制）
// 单线程同一时间执行一条命令
// 异步（例子：onclick事件）(正常执行完执行异步)执行顺序：同步->异步->回调
//// 后台操作内容更多的操作本机内容   node.js访问的是本机上的文件读取速度可以忽略不计，读取速度取决于硬件
//前台所有文件都是远程的，速度时间度不确定，是异步的所以用amd   用在amd用require.js去体现。

//在html中会发起http请求的script    link img form a 等
// cmd用require体现
// require()正常化的进行模块化的处理   前端异步模块加载方式用require.js去加载


// a m d   （为什么用amd）
// script上的属性async进行异步执行  true与flase
// 用define去定义模块，必须每个js中用define定义      自己写的异步加载（首先引require.js，定义一个入口文件，
// define(["1.js"],function(a){    当期js依赖1.js
//   return a+20;
// })




// http协议                                                  建立在tcp/ip上建立在硬件上




// c m d   (require)
// 模块如何引入和依赖
// require("./1.js") 在当前js中引入1.js    引入其他模块
// 每个模块都有一个顶层变量module（module有个方法exports导出）即引入的模块要返回一个东西，别的模块才能用这个功能  例modele.exports.a=a;   modele.exports={}与不屑的意思是一样的




// node.js定义全局变量global（不要这样去定义会导致变量的污染）global不需要引用，方法直接应用




// require的用法
// 概念：核心模块，自定义模块，第三方模块
// 核心模块（包）:
//        node.js提供的模块(文档中的模块)  引用var fs=require("fs") // fs.writefile('dmo.txt','1111')
// 自定义模块（包）
        // 自己去写的一些功能作为一个包  引入需要加路径
// 第三方模块（包）   // 别人写好的模块
            //     去npm搜比如request  npm install  模块名字
            //     安装好后直接用,即var fs=require("request")
            // request("url",function(err,head,body){
            //     console.log(body)
            // 抓取其他网站用做爬虫用
            // })
// 看一遍npm命令  npm ~代表进入当前文件的根目录








// require()访问规则（就近原则）  ar fs=require("./1.js")（引入文件用require，被引入文件用exports）
// 1.不带路径
    // a.先访问核心模块，
    // b.如果没有访问当前目录的node_modeles里边的模块（如request）
    // c.如果当前目录没有，就访问他的上一级目录，以此往上推，直到访问到根目录
    // d.如果更目录也没有就报错  not find module
// 2.带路径的
    // a.按照指定路径去找相应模块（可以是相对路径也可以是绝对路径，一般最好指定为绝对路径）（处理路径的核心模块path.resolve()转换为绝对路径，ewtname获取扩展名，dirname获取路径，jion把路径连起来（__dirname,'a1.js'））
    // __dirname当前// badename文件名  __filename当前文件名
// 3.后缀名
   // a.带后缀名按照你指定的后缀名去查找（只要你的js代码规范，后缀名写什么都无所谓）
   // b.不带后缀名，首先会查找后缀名是.js的文件，
      //如果没有.js这个后缀名会找.json这个后缀名（文件里边的内容必须符合）
      //如果没有.json，会找.node这个后缀名（文件里边是c++的代码，语法也是c++，可以用c++扩展代码）





// npm 的用法（就远原则）（如果安装了以后不在当前目录一级一级往上找）
// npm init
// npm install安装想要让别人安装需要推送到npm官网上
//     1.// npm login      （直接登录）（没有用户名npm adduser添加一个用户名）
//     2.npm init 后进行设置描述与入口文件，关键字，等->  会出现一个package.json文件（包说明）
//         3.上传npm publish    删除npm unpublish




