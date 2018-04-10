var light=require("ueklight");
var router=light.Router();
var md5=require('./md5.js');
var Dec=require('./Dec.js');
var mysql = require('./mysql.js');
mysql.connect();
router.get("/",function (req,res){
    res.render('index.html', { name: light });
})
router.get("/login",function (req,res) {
    res.send('login')
})
router.get("/fetch",function(req,res){
    setTimeout(function () {
    mysql.query("select * from text", function (error, result) {
        if (error) {
            res.end('error');
        } else {
            res.send(JSON.stringify(result));
        }
    });
    },500)
})
router.get("/addCon",function(req,res){
    setTimeout(function () {
    console.log(req.query)
    var name = req.query.name;
    var age = req.query.age;
    var sex = req.query.sex;
    mysql.query(`insert into text (id,name,age,sex) values (null,'${name}','${age}','${sex}')`, function (error, result) {
        if (error) {
            console.log(error);
            res.end();
        } else {
            res.send('ok')

        }
    });
    },1000)
})
router.get("/loginCon",function(req,res){
        var uname = req.query.uname;
        var pass = req.query.pass;
    setTimeout(function () {
        mysql.query(`select * from user where uname='${uname}'`, function (error, result) {
            if (error) {
                res.end();
            } else {
                // console.log(result)
                if(uname==result[0].uname){
                    if(md5(pass)==result[0].pass){
                        res.send('ok')
                    }else{
                        res.send('1')
                    }
                }else{
                    res.send('0')
                }
            }
        });
    },1000)

})

router.get("/regCon",function (req,res) {
    var uname = req.query.uname;
    var pass = md5(req.query.pass);
    // console.log(2)
    mysql.query(`insert into user (uid,uname,pass) values (null,'${uname}','${pass}')`, function (error, result) {
        if (error) {
            // console.log(error)
            res.end('error');
        } else {
            if(result.affectedRows>0){
                res.end('ok')
            }else{
                res.end('error1');
            }
        }
    })
})
router.get("/del/:id",function(req,res){
    setTimeout(function () {
    var id = req.params.id;
console.log(id)
    mysql.query("delete from text where id = " + id, function (error, result) {
        if (error) {
            console.log(error);
            res.end();
        } else {
            res.send('ok');
        }
    });
    },1000)
})
router.get("/up/:id",function (req,res) {
    setTimeout(function () {
    var id=req.params.id;
    mysql.query("select * from text where id="+id,function (err,result) {
        if(err){
            res.end("err");
        }else{
            res.send(JSON.stringify(result));
        }
    })
    },500)
});
router.get("/updas",function (req,res) {
    setTimeout(function () {
    var name=req.query.name;
    var age=req.query.age;
    var id=req.query.id;
    var sex=req.query.sex;
    mysql.query(`UPDATE text SET name = '${name}',age = '${age}',sex = '${sex}' WHERE text.id =`+id,function (err,result) {
        if(err){
            res.end("err");
        }else{
            res.send("ok")
        }
    })
    },500)
})
