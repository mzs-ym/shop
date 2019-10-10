const http=require("http")
const mysql=require("mysql")
const url=require("url")
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'shop'
});

connection.connect();
http.createServer((req,res)=>{
    let goodsId=url.parse( req.url,true).query.goodsId
    var userId=url.parse( req.url,true).query.userId
    let num=url.parse( req.url,true).query.num
    connection.query(`select * from  goods where goods_id=${goodsId}`,function (error, results, fields) {
      if (error){
        console.log(error.message); 
      }  
        if(num>results[0].goods_num){
          res.setHeader("Access-Control-Allow-Origin","*");
          res.end(JSON.stringify({
            meta:{
              msg:"库存不足,已经为您选择最大库存数量",
              status:400
            },
            data:results
          }))
          return
        }else{
          connection.query(`update cart set buy_num =${num} where goods_id=${goodsId} and user_id=${userId}`,function (error, value, fields) {
            if (error){
                console.log(error.message);     
            } 
            res.setHeader("Access-Control-Allow-Origin","*");
            res.end(JSON.stringify({
              meta:{
                msg:"操作成功",
                status:200
              },
              data:value
            }))
        });   
        }
      })
         
}).listen(3006)