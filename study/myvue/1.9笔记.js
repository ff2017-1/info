// webpack
// 工作流的工具

//1. webpack之前也有相关的技术，gulp，grunt都是js的构建工具，
// 2.让整个工作变得简单，不去做一些不必要的重复工作，
// 3.以前那些过程化的方式不适合大型的项目，所以需要webpack，
//4.入口，出口，loader（载入进来的模块，比如bable等），插件（对webpack能力的增强）
// src  放img，css，js，html文件（生产环境下的文件）    开发目录
//dist        放img，css，js，html文件打包过的文件 生产目录
// 入口：：：用来指定任务的main.js 可以多个入口
// 出口可以是多个出口[name].js
// 插件功能的增强
// 命令 webpack 入口文件 出口文件
// loader
    // css  转化需要另外的模块解析（css-loader与style-loader结合使用）字体图标，图片用file-loaders
// es 模块化的开发方式  import webpack可以识别（本质上与require引入文件是一样的）





// import的用法
        // import返回只能有一个默认值返回语法
        // export default a
        // 接受语法
        // import  接收变量 form "访问文件"
        // import  a form "./b.js"

        // 如果需要返回多个,不是默认返回加{}，可以放多个值
        // export {
        //     aa,bb  多个值
        // }
        // export default a
        // export default 默认值
        // import  a,{aa,bb} form "./b.js"
        // 默认值可以用任意变量接收,不是默认值用{}括起来变量名字必须一致

// 步骤
    // 1.安装全局，安装本地
    // 2.使用webpack，能力：从a移动到b
    // 如果想要便利的监听webpack   在package.json中配置
    // "scripts": {
    //     "start": "webpack --watch"
    // },
    // 如果不是start需要npm run start

// 注意
    // css引入最好用require不要用import
// 插件
// 对js  css进行拆分 ExtractTextWebpackPlugin
// 自动引入css与js  html-webpack-plugin



