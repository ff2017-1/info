'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ddhome'
});
module.exports = connection;
// svn   git 多人协作/
// svn只有一个仓库（一个中央处理器）
// git有一个远程仓库（本地也会有一个仓库）（linx衍生出来的，是开源的）（））（）