const http = require('http');

const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop'
});

connection.connect();

http.createServer((req, res) => {
   


    connection.query('select * from goods', function(error, results, fields) {
        if (error) throw error;
       /*  res.setHeader("content-type", "application/json")
        res.setHeader("content-type", "text/html;charset=utf-8") */
        res.setHeader("Access-Control-Allow-Origin",'*')
        res.end(JSON.stringify({
            meta: {
                msg: '操作成功',
                status: 200
            },
            data: results
        }))
    });
}).listen(5002);