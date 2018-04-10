"use strict";

var light = require("ueklight");
var router = light.Router();
var xlsx = require("node-xlsx");
var md5 = require("./md5");
var mysql = require("./mysql");
var async = require('async');

router.post('/ddhome/upPostUser', function (req, res) {
    var xlsxdata = xlsx.parse(res.upInfo.path)[0].data.slice(1);
    //用来存表中的部门名称
    var tablePartData = [];
    for (var i = 0; i < xlsxdata.length; i++) {
        tablePartData.push(xlsxdata[i][2]);
    }
    var obj = new Set(tablePartData);
    tablePartData = Array.from(obj);
    // console.log(tablePartData)
    /*
      * 1、找所有的信息 -> 缓存  ->  大数据技术
      * 2、找最小单位（在一万条数据中，找到最小单位，递归）
      * 3、和上传的数据进行比对，串行执行（一个走完再接着走）
      * */
    var datas = [];
    async.series([
    //async串行执行，执行流程必须是第一个执行完成后，才能执行下一条
    //1、找所有的信息
    function (next) {
        mysql.query("select * from part", function (err, data) {
            if (err) {
                res.end('err'); //给客户端返回的数据，但并不会结束
                next(); //执行下一步
            } else {
                datas = data;
                next(null); //null表示没错，第二个参数返回的数据
            }
        });
    },
    //2、找最小单位
    function (next, data1) {

        function tree(data) {
            var arr = [];
            for (var i = 0; i < data.length; i++) {
                var flag = true;
                for (var j = 0; j < data.length; j++) {
                    if (data[i].pid == data[j].parentid) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    arr.push(data[i]);
                }
            }
            return arr;
        }

        next(null, tree(datas));
    }], function (err, data) {
        //data包含上面所有执行完成后输出的数据，没有的话就是undefined
        // console.log(data[1]);
        // console.log(tablePartData)

        //3、上传的数据比对
        var errorArr = [];
        // 映射  数据字典
        var same = {};
        for (var i = 0; i < tablePartData.length; i++) {
            var flag = false;
            for (var j = 0; j < data[1].length; j++) {
                if (tablePartData[i] == data[1][j].pname) {
                    same[data[1][j].pname] = data[1][j].pid;
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                errorArr.push(tablePartData[i]);
            }
        }
        // console.log(errorArr);
        if (errorArr.length > 0) {
            res.end(JSON.stringify(errorArr));
        } else {
            // 放到数据库
            var newarr = [];
            for (var i = 0; i < xlsxdata.length; i++) {
                var max = [];
                var pass = md5('123456');
                var uphoto = 'upload/1516464531894ban661.jpg';
                max.push(xlsxdata[i][0].replace(/\'/, ''));
                max.push(pass);
                max.push(xlsxdata[i][1]);
                max.push(uphoto);
                max.push(same[xlsxdata[i][2]]);
                newarr.push(max);
            }
            // console.log(newarr)
            mysql.query('REPLACE INTO user (uname,upass, uphone, uphoto, pid) VALUES ?', [newarr], function (err, result1) {
                if (err) {
                    console.log(err);
                    res.end('err2');
                } else {
                    if (result1.affectedRows > 0) {
                        res.end('ok');
                    } else {
                        res.end('err1');
                    }
                }
            });
        }
    });
});

// router.post('/ddhome/addUsersCons',function (req,res) {
//     var arr=req.body.arr
//     arr=JSON.parse(arr)
//     console.log(arr)
//     var str=''
//     var pass=md5('123456')
//     var uphoto='upload/1516464531894ban661.jpg';
//     for(var i=0;i<arr.length;i++){
//         str +='('+'NULL,'+"'"+arr[i].uname+"'"+','+"'"+pass+"'"+','+"'"+arr[i].uphone+"'"+','+"'"+uphoto+"'"+','+arr[i].pid+')'+','
//     }
//     str=str.substring(0,str.length - 1)
//     var sql='REPLACE INTO user (uid, uname,upass, uphone, uphoto, pid) VALUES '+str
//     console.log(sql)
//     mysql.query(sql,function (err,result) {
//         if(err){
//             res.end('err')
//         }else{
//             console.log(result)
//            if(result.affectedRows>0){
//                res.end('ok')
//            } else{
//                res.end('err')
//            }
//         }
//     })
// })