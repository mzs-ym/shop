// 1. 构建web服务（构建好了别人才可以请求 响应老铁666啊）
// 2. 通过npm安装MySQL模块 -> 使用方法操作数据库，然后响应

// 一、导入模块
const http  = require('http')
const mysql = require('mysql');
const url = require('url');

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

    let params = url.parse(req.url, true).query     
    let uname = params.username
    let pwd = params.password
    
    if (!uname || !pwd) 
    {
        res.setHeader("Access-Control-Allow-Origin","*");
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
    connection.query(`select * from admin where ad_name = '${uname}'`, function (error, results, fields) {
        if (error) throw error;

        if (!results[0]) {// 不管你查几条数据都是数组  有-对象，没有-undefined
            res.setHeader("Access-Control-Allow-Origin","*");
            res.end(JSON.stringify({
                meta: {
                    msg: '用户或密码错误-用户不存在',
                    status: 400
                },
                data: null
            }))
            return
        }

        if (results[0].ad_pwd != pwd) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.end(JSON.stringify({
                meta: {
                    msg: '用户或密码错误-密码有瑕疵',
                    status: 401
                },
                data: null
            }))
            return
        }

        res.setHeader("Access-Control-Allow-Origin","*");
        res.end(JSON.stringify({
            meta: {
                msg: '登录成功',
                status: 200
            },
            data:results
        }))
        return
        
       
    });
}).listen(5000)