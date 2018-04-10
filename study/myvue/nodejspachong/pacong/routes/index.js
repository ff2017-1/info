var express = require('express');
var router = express.Router();
var http = require('http');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: '简单nodejs爬虫' });
});
router.get('/getJobs', function(req, res, next) { // 浏览器端发来get请求
    var page = req.param('page');  //获取get请求中的参数 page
    console.log("page: "+page);
    var Res = res;  //保存，防止下边的修改
//url 获取信息的页面部分地址
    var url = 'http://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=https://www.lagou.com/jobs/list_%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91&spc=1&pl=&gj=&xl=&yx=&gx=&st=&labelWords=label&lc=&workAddress=&city=%E5%85%A8%E5%9B%BD&requestId=&pn=';
   // console.log(url+page)
    http.get(url+page,function(res){  //通过get方法获取对应地址中的页面信息
        var chunks = [];
        var size = 0;
        res.on('data',function(chunk){   //监听事件 传输
               chunks.push(chunk);
               size += chunk.length;
         });
        res.on('end',function(){  //数据传输完
            var data = Buffer.concat(chunks,size);
            var html = data.toString();
            // console.log(html);
            var $ = cheerio.load(html); //cheerio模块开始处理 DOM处理

            var jobs = [];
            console.log(4)

            var jobs_list = $(".item_con_list li");
            // console.log(jobs_list)
            $(".item_con_list>li").each(function(){   //对页面岗位栏信息进行处理  每个岗位对应一个 li  ,各标识符到页面进行分析得出
                alert(1)
                var job = {};
                job.company = $(this).find(".list_item_top .company div").eq(1).find("a").html(); //公司名
                job.period = $(this).find(".list_item_top .company div").eq(2).html(); //阶段
                job.scale = $(this).find(".list_item_bot div").eq(2).html(); //规模

                job.name = $(this).attr("data-positionname"); //岗位名
                job.src = $(this).find(".p_top a").attr("href"); //岗位链接
                job.city = $(this).find(".p_top span em").html(); //岗位所在城市
                job.salary = $(this).find(".li_b_l span").html(); //薪资
                job.exp = $(this).find(".li_b_l").html(); //岗位所需经验
                job.time = $(this).find(".p_top .format-time").html(); //发布时间
                // console.log(job);  //控制台输出岗位名
                jobs.push(job);
            });
            Res.json({  //返回json格式数据给浏览器端
                jobs:jobs
            });
        });
    });

});

module.exports = router;
