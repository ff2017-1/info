"use strict";

var light = require("ueklight");
var router = light.Router();

router.post('/ddhome/upload', function (req, res) {
    var relPath = res.upInfo.relPath;
    res.end(relPath);
});