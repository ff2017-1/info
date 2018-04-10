var light=require("ueklight");
var router=light.Router();
var mysql=require("../mysql");
var md5=require("../md5");
var fs=require('fs')
var path=require('path')
router.get("/ddhome/newsList",function(req,res){
  mysql.query('select * from information limit 1,20',function (err,result) {
      if(err){
          res.end('err')
      }else{
          if(result.length>0){
              res.end(JSON.stringify(result))
          }else{
              res.end('err')
          }
      }
  })
});
router.get("/ddhome/ListRef",function(req,res){
    var page=req.query.page;
    var num=req.query.num
    var pages=page*num

    mysql.query(`select * from information limit ${pages},${num}`,function (err,result) {
        if(err){
            var obj={result:result,message:'err'}
            res.end(JSON.stringify(obj))
        }else{
            if(result.length>0){
                var obj={result:result,message:'ok'}
                res.end(JSON.stringify(obj))
            }else if(result.length>0&&result.length<10){
                var obj={result:result,message:'no'}
                res.end(JSON.stringify(obj))
            }else{
                var obj={result:result,message:'err'}
                res.end(JSON.stringify(obj))
            }
        }
    })
});
router.get('/ddhome/newsListCon',function (req,res) {
var id=req.query.id
    mysql.query('select * from information where Iid='+id,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result))
            }else{
                res.end('err')
            }
        }
    })
});
// 登录
router.get('/ddhome/indexLogin',function (req,res) {
    var name=req.query.name
    var pass=md5(req.query.pass)
    mysql.query(`select * from user where uname='${name}' and upass='${pass}'`,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.end(JSON.stringify({uid:result[0].uid,uname:result[0].uname,upass:result[0].upass,uphone:result[0].uphone,uphoto:result[0].uphoto,message:"ok"}))
            }else{
                res.end('err')
            }
        }
    })
})
// 提交日志
router.get('/ddhome/logsSubmit',function (req,res) {
    var uid1=req.query.uid1;
    var uid2=req.query.uid2;
    var title=req.query.title;
    var content=req.query.content;
    var sql=`INSERT INTO journal (jid, uid1, uid2, title, content, icid, jtime) VALUES (NULL, ${uid1}, ${uid2}, '${title}', '${content}', '1', CURRENT_TIMESTAMP)`
    // console.log(sql)
    mysql.query(sql,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
});
// 查看日志/发送日志
router.get('/ddhome/logsSend',function (req,res) {
    var uid=req.query.uid
console.log(uid)
    var obj={}
    mysql.query('select journal.*,user.uname from journal,user where journal.uid2=user.uid and journal.uid1='+uid,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                obj.result=result
                obj.message='ok'
                res.end(JSON.stringify(obj))
            }else{
                obj.result=result
                obj.message='err'
                res.end(JSON.stringify(obj))
            }
        }
    })
})
// 查看日志/接收日志
router.get('/ddhome/logsAccept',function (req,res) {
    var uid=req.query.uid
    var obj={}
    mysql.query('select journal.*,user.uname from journal,user where journal.uid1=user.uid and journal.uid2='+uid,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                obj.result=result
                obj.message='ok'
                res.end(JSON.stringify(obj))
            }else{
                obj.result=result
                obj.message='err'
                res.end(JSON.stringify(obj))
            }
        }
    })
})
// 根据用户id查部门/个人设置
router.get('/ddhome/personPart',function (req,res) {
    var uid=req.query.uid
    mysql.query('select * from user where uid='+uid,function (err,result) {
        if(err){
            res.end('err')
        }else{
            // console.log(result)
            var pid=result[0].pid
            // console.log(pid)
            mysql.query('select * from part where pid='+pid,function (err,result1) {
                if(err){
                    res.end('err')
                }else{
                    res.end(JSON.stringify(result1))
                    // console.log(result1)
                }
            })
        }
    })
})
// 修改用户密码
router.get('/ddhome/updataPass',function (req,res) {
    var name=req.query.name
    var pass=md5(req.query.pass)
    var uid=req.query.uid
    // console.log(name)
    // console.log(pass)
    // console.log(uid)
    var sql=`UPDATE user SET uname = '${name}',upass = '${pass}' WHERE uid = ${uid};`
    // console.log(sql)
    mysql.query(sql,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.affectedRows){
                res.end('ok')
            }else{
                res.end('err')
            }
        }
    })
})
// 搜索用户电话
router.get('/ddhome/telSearchChange',function (req,res) {
    var str=req.query.str
    console.log(str)
    var sql=`SELECT * FROM user WHERE  uname LIKE  '%${str}%'`
    // console.log(sql)
    mysql.query(sql,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.end(JSON.stringify(result))
            }else{
                res.end('err')
            }
        }
    })
})