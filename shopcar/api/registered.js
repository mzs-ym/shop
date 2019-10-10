// 一、导入模块
const http  = require('http')
const mysql = require('mysql');
const url = require('url');
var createAt=updateAt=Date('Y-m-d H:i:s');
// 配置
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'shop'
});
connection.connect();
 

// 二、创建web服务器
http.createServer((req, res) => {

    // 1. 接受数据 
    // console.log(req.url)  /?uname=z3&pwd=admin888

    let params = url.parse(req.url,true).query  // { uname: 'z3', pwd: 'admin888' }
    let uname = params.username
    let pwd = params.password
    
    if (!uname || !pwd) 
    {
        res.setHeader("Access-Control-Allow-Origin",'*')
        res.end(JSON.stringify({
            meta: {
                msg: '参数有误',
                status: 400
            },
            data: null
        }))
        return
    }

    // 执行查询SQL语句
    connection.query(`select * from user where user_name = '${uname}'`, function (error, results, fields) {
        if (error) throw error;
        if (!results[0]) {// 不管你查几条数据都是数组  有-对象，没有-undefined
            res.setHeader("Access-Control-Allow-Origin","*");
            connection.query(`insert into user(user_name,user_pwd,create_at,update_at) values ('${uname}','${pwd}','${createAt}','${updateAt}')`, function (error, results, fields) {
                if (error) throw error;
                res.setHeader("Access-Control-Allow-Origin",'*')
                res.end(JSON.stringify({
                meta: {
                    msg: '注册成功',
                    status: 201
                },
                data: null
            }))
            })
            return;
        }else{
            res.setHeader("Access-Control-Allow-Origin",'*')
            res.end(JSON.stringify({
                meta: {
                    msg: '用户已存在',
                    status: 401
                },
                data: null
            }))
        
        }
    })
    
}).listen(3001)