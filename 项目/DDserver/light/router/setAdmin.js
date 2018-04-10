"use strict";

var mysql = require("./mysql");
function setAdmin(aid, num, success, error) {
    var sql = "select * from admin,level where admin.aid=" + aid + " and admin.rid=level.lid and find_in_set('" + num + "',level.lnum)\n";
    // console.log(sql)
    mysql.query(sql, function (err, result) {
        if (err) {
            console.log('err');
            error();
        } else {
            if (result.length > 0) {
                success();
            } else {
                error();
            }
        }
    });
}
module.exports = setAdmin;