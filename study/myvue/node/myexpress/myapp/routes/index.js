'use strict';

var express = require('express');
var router = express.Router();
var mysql = require('./mysql.js');
mysql.connect();
/* GET home page. */
router.get('/', function (req, res) {
    mysql.query("select * from text", function (error, result) {
        if (error) {
            console.log(error);
            res.end();
        } else {
            // console.log(result);
            res.render('index', { data: result });
        }
    });
});
router.get('/add', function (req, res) {
    res.render('add');
});
router.get('/addCon', function (req, res) {

    var name = req.query.name;
    console.log(name);
    var age = req.query.age;
    console.log(age);
    var sex = req.query.sex;
    console.log(sex);
    mysql.query('insert into text (id,name,age,sex) values (null,\'' + name + '\',\'' + age + '\',\'' + sex + '\')', function (error, result) {
        if (error) {
            console.log(error);
            res.end();
        } else {
            res.render('message', { message: '添加成功', url: '/' });
        }
    });
});
router.get('/del/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    mysql.query("delete from text where id = " + id, function (error, result) {
        if (error) {
            console.log(error);
            res.end();
        } else {

            res.render('message', { message: "删除成功", url: "/" });
        }
    });
});
router.get('/updata/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    // var name=req.param.name;
    // var age=req.param.age;
    // var id=req.param.id;
    // // console.log(name)
    //
    mysql.query("select * from text where id=" + id, function (error, result) {
        if (error) {
            console.log(error);
            res.end();
        } else {
            console.log(result);
            res.render('updata', { data: result });
        }
    });
    // res.render('updata')
});
router.get('/updataCon', function (req, res) {
    var id = req.query.id;
    var name = req.query.name;
    // console.log(name)
    var age = req.query.age;
    // console.log(age)
    var sex = req.query.sex;
    // console.log(sex)
    mysql.query('UPDATE text SET name = \'' + name + '\', age = \'' + age + '\', sex = \'' + sex + '\' WHERE id = \'' + id + '\'', function (error, result) {
        // console.log(result);
        if (error) {
            // console.log(error)
            res.end();
        } else {

            res.render('message', { message: '修改成功', url: '/' });
        }
    });
});

module.exports = router;
/*
// 1.创建一个服务器(静态服务器，express动态服务器)
// 2.安装express进行配置
渲染index页面
动态的获取数据
mvc的意义：
控制器就是：路由，相应的数据放到相应的视图中（分离开目的，让工作更有条理，让前后端分离，即分离又统一）
vue的控制器是由js对象（vue对象）（绑定数据）的方式实现的（双向绑定）

*/