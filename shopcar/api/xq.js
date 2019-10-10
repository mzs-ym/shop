const http = require('http');
const url = require('url');
// const path=require("path")
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop'
});

connection.connect();
http.createServer((req, res) => {
    let goodsId = url.parse(req.url, true).query.goodsId
        // res.end(goodsId)
        //console.log(goodsId);
    res.setHeader('content-type', 'text/html;charset=utf-8') //解决乱码

    connection.query(`select * from goods where goods_id='${goodsId}'`, function(error, results, fields) {
        if (error) throw error;
        res.setHeader("Access-Control-Allow-Origin", "*"); //防止跨域
        res.end(JSON.stringify({
            meta: {
                msg: "操作成功",
                status: 200
            },
            data: results[0]
        }))

    });

}).listen(5005)