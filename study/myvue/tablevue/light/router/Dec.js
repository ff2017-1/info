var crypto=require("crypto");
function Dec(str){
    var Decipher = crypto.createDecipher("aes-256-cbc", str)
    Decipher.update(str, "hex", "utf8")
    // Dec=Decipher.final("utf8");

    return Dec;
}
module.exports=Dec;