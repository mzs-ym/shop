const http=require("http");
const url=require("url")
// const path=require("path")
const mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'shop'
});

connection.connect();
http.createServer((req,res)=>{
   let goodsId=url.parse( req.url,true).query.goodsId
    // res.end(goodsId)
    
    connection.query(`SELECT * from goods where goods_id='${goodsId}'`, function (error, results, fields) {
        if (error) throw error;
      res.setHeader("Access-Control-Allow-Origin","*");
      res.end(JSON.stringify({
        meta:{
          msg:"操作成功",
          status:200
        },
        data:results
      }))
      
    });  

}).listen(3004)