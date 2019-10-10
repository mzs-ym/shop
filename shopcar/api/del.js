const http=require("http")
const url=require("url")
const mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'shop'
});

connection.connect();

  http.createServer((req,res)=>{
    let good=url.parse( req.url,true).query
    connection.query(`delete from cart where goods_id = ${good.goodsId} and user_id = '${good.userId}'`, function (error, results, fields) {
      if (error) throw error;
      res.setHeader("Access-Control-Allow-Origin","*");
    //  res.setHeader('content-type','application/json')
      res.end(JSON.stringify({
        meta:{
          msg:"操作成功",
          status:200
        },
        data:results
      }))
      
    });  

}).listen(3007)
