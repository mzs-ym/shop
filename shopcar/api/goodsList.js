const http=require("http")
const url=require("url")
// const response=require("./util")
// const url=require("url")
const mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'shop'
});

connection.connect();

  http.createServer((req,res)=>{

    var pagesize=2;
    let pagenum=url.parse( req.url,true).query.pagenum
    var start=(pagenum -1)*pagesize

    connection.query(`SELECT * from goods order by goods_id asc limit ${start},${pagesize}`, function (error, results, fields) {
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

}).listen(3003)
