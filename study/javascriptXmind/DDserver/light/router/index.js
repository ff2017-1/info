var light=require("ueklight");
var router=light.Router();
var mysql=require("./mysql");
var md5=require("./md5");
var setAdmin=require("./setAdmin");
var fs=require('fs')
var path=require('path')
router.get("/admin",function(req,res){
    res.render("index.html",{name:"light"});
});
// 查看管理员
router.get("/ddhome/adminQuery",function(req,res){
    var rid=req.query.rid;
    var aid=req.query.aid;
    // console.log(rid)
    if(rid==4){
        var sql='select * from admin,level where admin.rid=level.lid'
        // console.log(sql)
        mysql.query(sql,function (err,result) {
            if(err){
                res.end('err')
            }else{
                mysql.query("select * from level",function (err,levels) {
                    for(var i=0;i<result.length;i++){
                        result[i].levels=levels
                    }
                    res.send(JSON.stringify(result))
                })

            }
        })

    }else{
        var sql1=`select * from admin,level where admin.rid=level.lid and admin.rid=${rid} and admin.aid=${aid}`
        // console.log(sql1)
        mysql.query(sql1,function (err,result) {
            if(err){
                res.end('err')
            }else{
                mysql.query("select * from level",function (err,levels) {
                    for(var i=0;i<result.length;i++){
                        result[i].levels=levels
                    }
                    res.send(JSON.stringify(result))
                })

            }
        })
    }

});
// 添加管理员
router.get('/ddhome/addAdmin',function (req,res) {
    var name=req.query.name
    var pass=md5(req.query.pass)
    var header=req.query.header
    var rid=req.query.rid
    mysql.query(`INSERT INTO \`admin\` (\`aid\`, \`aname\`, \`apass\`, \`header\`, \`rid\`) VALUES (NULL, '${name}', '${pass}','${header}', '${rid}')`,function (err,result) {
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
// 删除管理员
    router.get('/ddhome/delAdmin',function (req,res) {
        var ids=req.query.ids;
        ids='('+ids+')'
        var aid=req.query.aid;
        var num=2;
        setAdmin(aid,num,function () {
        // console.log(ids)
        mysql.query('DELETE FROM admin WHERE aid in' +ids,function (err,result) {
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
        },function () {
            // console.log(21)
            res.end('no')
        })
    })
// 查看某一条管理员数据
router.get('/ddhome/UpAdminCon',function (req,res) {
    var aid=req.query.aid;
    // console.log(name)
    mysql.query(`select * from admin where aid='${aid}'`,function (err,result) {
        if(err){
            res.end('err')
        }else{
            res.end(JSON.stringify(result))
            // console.log(result)
        }
    })
})
// 更改管理员数据
router.get('/ddhome/updataAdmin',function (req,res) {
    var aid=req.query.aid
    var aname=req.query.aname;
    var header=req.query.header;
    var rid=req.query.rid;
    mysql.query(`UPDATE admin SET aname = '${aname}',header = '${header}',rid = '${rid}' WHERE aid = '${aid}'`,function (err,result) {
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
})
// 管理员修改密码
router.post('/ddhome/updataPass',function (req,res) {
    var aid=(req.body.aid)
    var pass=md5(req.body.pass)
    mysql.query(`UPDATE admin SET apass = '${pass}' WHERE aid = '${aid}'`,function (err,result) {
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
})
// 登录
router.get("/ddhome/login",function (req,res) {
    var name=req.query.name.replace(/['"]/g,"");
    var pass=md5(req.query.pass);
    var sql=`select * from admin where aname='${name}' and apass='${pass}'`
    mysql.query(sql,function (err,result) {
        if(err){
            res.end('err')
        }else{
            if(result.length>0){
                res.end(JSON.stringify({aid:result[0].aid,rid:result[0].rid,aname:result[0].aname,header:result[0].header,message:"ok"}))
            }else{

                res.end('err')
            }
        }
    })
})
// 添加角色
router.get('/ddhome/addLevel',function (req,res) {
    var levels=req.query.checkedlevels;
    var lname=req.query.lname;

    mysql.query(`INSERT INTO \`level\` (\`lid\`, \`lname\`, \`lnum\`) VALUES (NULL, '${lname}', '${levels}')`,function (err,result) {
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
})
// 查看角色
router.get('/ddhome/showLevel',function (req,res) {
    mysql.query('select * from level',function (err,result) {
        if(err){
            res.end('err')
        }else{
            mysql.query('select * from root',function (err,levels) {
                if(err){
                    res.end('err')
                }else{
                    for(var i=0;i<result.length;i++){
                        var lnum=result[i].lnum.split(',');
                        for(var j=0;j<lnum.length;j++){
                            for(var k=0;k<levels.length;k++){
                                if(lnum[j]==levels[k].lid){
                                    var obj={lid:levels[k].lid,rname:levels[k].rname}
                                    lnum[j]=obj
                                }
                            }
                        }
                        result[i].lnum=lnum
                        result[i].levels=levels
                    }
                    // console.log(result)
                    res.end(JSON.stringify(result))
                }

            })

        }
    })
})
    // router.get('/ddhome/showLevel',function (req,res) {
    //     mysql.query('select * from level',function (err,result) {
    //         if(err){
    //             res.end('err')
    //         }else{
    //             mysql.query('select * from root',function (err,levels) {
    //                 if(err){
    //                     res.end('err')
    //                 }else{
    //                     for(var i=0;i<result.length;i++){
    //                         var lnum=result[i].lnum.split(',');
    //                         for(var j=0;j<lnum.length;j++){
    //                             for(var k=0;k<levels.length;k++){
    //                             if(lnum[j]==levels[k].lid){
    //
    //                                 lnum[j]=levels[k].rname
    //                             }
    //                             }
    //                         }
    //                         result[i].lnum=lnum.join('-')
    //
    //                     }
    //
    //                     res.end(JSON.stringify(result))
    //                 }
    //
    //             })
    //
    //         }
    //     })
    // })
    // 修改角色updataLevel
router.get('/ddhome/updataLevel',function (req,res) {
    var levels=req.query.checkedlevels;
    var lid=req.query.lid;
    var lname=req.query.lname;
    mysql.query(`UPDATE level SET lname='${lname}',lnum = '${levels}' WHERE lid = '${lid}'`,function (err,result) {
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
})
// 删除角色
router.get('/ddhome/delLevel',function (req,res) {
    var ids=req.query.ids;
    var aid=req.query.aid;
    var num=2;
        ids='('+ids+')'
    // console.log(ids)
    setAdmin(aid,num,function () {
        // console.log(100)
        // 权限：看角色里边有没有用户
        // 用户删掉  异步
        // 删除角色
        // 删除照片fs.unlink   path.resolve(photo)
        mysql.query("select * from admin where rid in"+ids,function (err,result) {
            if(err){
                res.end('err')
            }else{
                // 有这些用户删除这些用户
                if(result.length>0){
                    for(var i=0;i<result.length;i++){
                        var photo=[];
                        photo.push(result[i].header)
                        for(var j=0;j<photo.length;j++){
                            fs.unlink(path.resolve(photo[j]))
                        }
                    }
                    // 删除用户
                    mysql.query('delete from admin where rid in'+ids,function (err,Dadmin) {
                        if(err){
                            res.end('err')
                        }else{
                            if(Dadmin.affectedRows>0){
                                // 删除角色
                                mysql.query('delete from level where lid in'+ids,function (err,Dlevels) {
                                   if(err){
                                       res.end('err')
                                   }else{
                                       if(Dlevels.affectedRows>0){
                                         res.end('ok')
                                       }else{
                                           res.end('err')
                                       }
                                   }
                                })
                            }else{
                                res.end('err')
                            }
                        }
                    })
                }else{ //没有这个用户，
                    mysql.query('delete from level where lid in'+ids,function (err,Dlevels1) {
                        if(err){
                            res.end('err')
                        }else{
                            if (Dlevels1.affectedRows > 0) {
                                res.end('ok')
                            } else {
                                res.end('err')
                            }
                        }

                    })
                }
            }
        })
        // mysql.query('DELETE FROM level WHERE lid in' +ids,function (err,result) {
        //     if(err){
        //         res.end('err')
        //     }else {
        //         // console.log(1)
        //         if (result.affectedRows > 0) {
        //             res.end('ok')
        //             // console.log(2)
        //         } else {
        //             // console.log(3)
        //             res.end('err')
        //         }
        //     }
        // })
    },function () {
        // console.log(21)
        res.end('no')
    })
        // console.log(aid)

})
// 查看其中一条角色信息
router.get('/ddhome/updataLevelCon',function (req,res) {
    var lid=req.query.lid;
    mysql.query(`select * from level where lid='${lid}'`,function (err,result) {
        if(err){
            res.end('err')
        }else{
            res.end(JSON.stringify(result))
        }
    })

})

// 查看权限
router.get('/ddhome/showRoot',function (req,res) {
    mysql.query("select * from root",function (err,result) {

        if(err){
            res.end('err')
        }else{
            res.end(JSON.stringify(result))
        }
    })
})
// 删除权限
router.get('/ddhome/delRoot',function (req,res) {
    var ids=req.query.ids;
    ids='('+ids+')'
    var aid=req.query.aid;
    var num=2;
    // console.log(ids)
    setAdmin(aid,num,function () {
        mysql.query('DELETE FROM root WHERE rid in' + ids, function (err, result) {
            if (err) {
                res.end('err')
            } else {
                if (result.affectedRows > 0) {
                    res.end('ok')
                } else {
                    res.end('err')
                }
            }
        })
    },function () {
        // console.log(21)
        res.end('no')
    })
})
// 查看某一条权限数据
router.get('/ddhome/UpRootCon',function (req,res) {
    var rid=req.query.rid;
    mysql.query(`select * from root where rid='${rid}'`,function (err,result) {
        if(err){
            res.end('err')
        }else{
            res.end(JSON.stringify(result))
        }
    })
})
// 查看多条权限数据
router.get('/ddhome/udataLevelCons',function (req,res) {
    var ids=req.query.ids;
    ids='('+ids+')';
    mysql.query('select * from root where rid in'+ids,function (err,result) {
        if(err){
            res.end('err')
        }else{
            res.end(JSON.stringify(result))
        }
    })
})
// 编辑权限
router.get('/ddhome/updataRoot',function (req,res) {
    var lid=req.query.lid
    var rname=req.query.rname;
    var rid=req.query.rid;
    // console.log(lid)
    // console.log(rname)
    // console.log(rid)
    mysql.query(`UPDATE root SET rname = '${rname}',lid = '${lid}' WHERE rid = '${rid}'`,function (err,result) {
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
})
// 添加权限
router.get('/ddhome/addRoot',function (req,res) {
    var rname=req.query.rname;
    var lid=req.query.lid;
    mysql.query(`INSERT INTO root (rid, rname, lid) VALUES (NULL, '${rname}', '${lid}')`,function (err,result) {
        if (err) {
            res.end('err')
        } else {
            if (result.affectedRows > 0) {
                res.end('ok')
            } else {
                res.end('err')
            }
        }

    })
})
// 查看部门信息
router.get('/ddhome/showPart',function (req,res) {
    var arr1=[]
    mysql.query('select * from part',function (err,result) {
        if(err){
            res.end('err')
        }else{
            var arr1=[];
            for(var i=0;i<result.length;i++){
                var arr=[];

                for(var j=0;j<result.length;j++){
                    if(result[i].pid==result[j].parentid){
                        arr.push(result[j])
                    }
                    result[i].children=arr
                }
            }

            for(i=0;i<result.length-1;i++){
                for(j=0;j<result.length-1-i;j++){
                    if(result[j].pid>result[j+1].pid){
                        var temp=result[j];
                        result[j]=result[j+1];
                        result[j+1]=temp;
                    }
                }
            }
            for(var k=0;k<result.length;k++){
                 if(result[k].parentid==0){
                     arr1.push(result[k])

                 }
            }
            var obj={result:result,arr:arr1}
                res.end(JSON.stringify(obj))
            }

    })
})
//添加部门信息
router.get('/ddhome/addPart',function (req,res) {
    var pname=req.query.pname;
    // var b=req.query.parentid;
    var parentid=req.query.parentid.slice(req.query.parentid.lastIndexOf(',')+1);
    var sql=`INSERT INTO part (pid, pname, parentid) VALUES (NULL, '${pname}', '${parentid}')`
    mysql.query(sql,function (err,result) {
        if (err) {
            res.end('err')
        } else {
            if (result.affectedRows > 0) {
                res.end('ok')
            } else {
                res.end('err')
            }
        }
    })

})
// 删除部门信息
router.get('/ddhome/delPart',function (req,res) {
   var obj={}
    obj.arr1=[];
    var ids=req.query.ids;
    ids=ids.split(",")
    for(var i=0;i<ids.length;i++){
        obj.arr1.push(parseInt(ids[i]))
    }
    var aid=req.query.aid;
    var num=2;//
    var arr=[]
    setAdmin(aid,num,function () {
        function dels(ids){
            // 如果有子元素
            if(ids.length>0){
                var ids1='('+ids+')'
                mysql.query('DELETE FROM part WHERE pid in' + ids1, function (err, result) {
                    if(err){
                        res.end('err1')
                    }else{
                        if(result.affectedRows>0){
                            mysql.query('select * from part',function (err,parts) {
                                if(err){
                                    res.end('err2')
                                }else{
                                    for(var i=0;i<ids.length;i++){
                                        for(var j=0;j<parts.length;j++){
                                            if(ids[i]==parts[j].parentid){
                                                arr.push(parts[j].pid)
                                                obj.arr1.push(parts[j].pid)
                                            }

                                        }
                                    }
                                    dels(arr)
                                }
                            })
                        }else{
                            obj.message='ok'
                            res.end(JSON.stringify(obj))
                        }
                    }
                })
            }else{
                //没有子元素
                obj.message='ok'
                res.end(JSON.stringify(obj))
            }
        }
        dels(ids)

    },function () {
        // console.log(21)
        res.end('no')
    })
})
// 更改部门信息
router.get('/ddhome/updataPart',function(req,res){
        var pname=req.query.pname
        var parentid=req.query.parentid.slice(req.query.parentid.lastIndexOf(',')+1);
        var pid=req.query.pid;
        console.log(pname)
        console.log(parentid)
        console.log(pid)
        mysql.query(`UPDATE part SET pname = '${pname}',parentid = '${parentid}' WHERE pid = '${pid}'`,function (err,result) {
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
    })
// 查看用户信息
router.get('/ddhome/showUser',function (req,res) {
    //根据部门查看用户信息
    var pid=req.query.pid
    if(pid>0){
        mysql.query(`select * from user where pid=${pid}`,function (err,result1) {
            if(err){
                res.end('err')
            }else{
                if(result1.length>0){
                    res.end(JSON.stringify(result1))
                }else{
                    res.end(JSON.stringify(result1))
                }
            }
        })
    }else{
        mysql.query('select * from user',function (err,result) {
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
    }

})
// 添加用户信息
router.get('/ddhome/addUser',function (req,res) {
    var uname=req.query.uname;
    var uphone=req.query.uphone;
    var pass=md5('123456')
    var uphoto='upload/1516464531894ban661.jpg';
    var pid=parseInt(req.query.pid);
    var sql=`INSERT INTO user (uid, uname,upass, uphone, uphoto, pid) VALUES (NULL, '${uname}', '${pass}', '${uphone}', '${uphoto}', ${pid})`;
    // console.log(sql)
    mysql.query(`select * from user where uname='${uname}'`,function (err,data) {
        if(err){
            res.end(err)
        }else{
            if(data.length>0){
                res.end('repeat')
            }else{
                mysql.query(sql,function (err,result) {
                    if (err) {
                        res.end('err')
                    } else {
                        if (result.affectedRows > 0) {
                            res.end('ok')
                        } else {
                            res.end('err')
                        }
                    }

                })
            }
        }
    })

})
// 删除用户
router.get('/ddhome/delUser',function (req,res) {
    var ids=req.query.ids;
    ids='('+ids+')'
    var aid=req.query.aid;
    var num=2;
    // console.log(ids)
    setAdmin(aid,num,function () {
        mysql.query('DELETE FROM user WHERE uid in' + ids, function (err, result) {
            if (err) {
                res.end('err')
            } else {
                if (result.affectedRows > 0) {
                    res.end('ok')
                } else {
                    res.end('err')
                }
            }
        })
    },function () {
        // console.log(21)
        res.end('no')
    })
});
// 更改用户信息
router.get('/ddhome/updataUser',function (req,res) {
    var uid=req.query.uid
    var uname=req.query.uname;
    var uphone=req.query.uphone;
    var pid=parseInt(req.query.pid);
    var sql=`UPDATE user SET uname = '${uname}',uphone = '${uphone}',pid = '${pid}' WHERE uid = '${uid}'`
    // console.log(uid)
    // console.log(uname)
    // console.log(uphone)
    // console.log(pid)
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
})
// 前台发送数据查询部门以及用户
router.get('/ddhome/addUserOne',function (req,res) {
    var pid=req.query.pid
    var arr1=[]
    var obj={}
    mysql.query('select * from part',function (err,result) {
        if(err){
            res.end('err')
        }else{
            var arr1=[];
            for(var i=0;i<result.length;i++){
                var arr=[];

                for(var j=0;j<result.length;j++){
                    if(result[i].pid==result[j].parentid){
                        arr.push(result[j])
                    }
                    result[i].children=arr
                }
            }
            for(var j=0;j<result.length;j++){
                if(result[j].parentid==pid){
                    arr1.push(result[j])
                }
            }
            if(arr1.length>0){
                obj.type=true
                obj.arr=arr1
                res.end(JSON.stringify(obj))
            }else{
                mysql.query(`select * from user where pid=`+pid,function (err,users) {
                    if(err){
                        res.end('err')
                    }else{
                        obj.type=false
                        obj.arr=users
                        res.end(JSON.stringify(obj))
                    }
                })
            }


        }

    })
})

