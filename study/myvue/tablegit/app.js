var light=require("ueklight");
require("./router/index");
var query=require("uekquery");
var body=require("uekpost");
var app=light();
app.use(query());
app.use(body());
app.listen(18080);