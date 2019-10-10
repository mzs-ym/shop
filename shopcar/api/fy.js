const http=require("http")
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
    connection.query('SELECT count(*) from goods', function (error, results, fields) {
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

}).listen(8000)
