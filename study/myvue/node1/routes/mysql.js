'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'sqld.duapp.com',
    user: 'fe16405c83b0460ab3701f89bda71a21',
    password: '4f0c3eb521bc4b0e80ecca790b6eae14',
    database: 'pzGuLLmnFIRcJCaKAWdI',
    port:4050
});
module.exports = connection;
// svn   git 多人协作/
// svn只有一个仓库（一个中央处理器）
// git有一个远程仓库（本地也会有一个仓库）（linx衍生出来的，是开源的）（）