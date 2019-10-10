const http = require('http');

const mysql = require('mysql');
const url = require('url');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop'
});

connection.connect();

http.createServer((req, res) => {

    var params = url.parse(req.url, true).query;
    var goods_id = parseInt(params.goods_id);

    var goods_img = params.goods_img;
    var goods_title = params.goods_title;
    var goods_price = params.goods_price;
    var goods_small_price = params.goods_small_price;
    var goods_num = params.goods_num;
   
    if (goods_id) {
        connection.query(`insert into goods(goods_id,goods_img,goods_title,goods_price,goods_small_price,goods_num) values('${goods_id}','${goods_img}','${goods_title}','${goods_price}','${goods_small_price}','${goods_num}')`, function (error, results, fields) {
            if (error) throw error;

            res.setHeader("content-type", "text/html;charset=utf-8")
            res.setHeader("Access-Control-Allow-Origin", '*')
           
             res.end(JSON.stringify({
                 meta: {
                     msg: '插入成功',
                     status: 200
                 },
                 data: null
             }))

            
        });
    }

}).listen(5001);

