//点击Add to Cart 添加到购物车

const http = require('http');
const mysql = require('mysql');
const url = require('url');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop'
});
connection.connect();



const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')

    //1.接受数据
    let getData = url.parse(req.url, true).query

    // //2.检测数据库是否存在
    connection.query(`select * from cart where goods_id = ${getData.goodsId} and user_id = ${getData.userId}`, function(error, results, fields) {
        if (error) throw error;
        if (results[0]) {


            connection.query(`update cart set buy_num = buy_num + ${getData.addCartNum}  where goods_id = ${getData.goodsId} and user_id = ${getData.userId}`, function(error, results, fields) {
                if (error) throw error;

                // results 是一个对象

                if (results) {
                    res.end(JSON.stringify({
                        meta: {
                            status: 200,
                            msg: '操作成功'
                        },
                        data: results
                    }))
                } else {

                    res.end(JSON.stringify({
                        meta: {
                            status: 500,
                            msg: '操作失败'
                        },
                        data: null
                    }))
                }
            });
        } else {

            connection.query(`select * from goods where goods_id = ${getData.goodsId}`, function(error, results, fields) {
                if (error) throw error;

                let goodsInfo = results[0]

                connection.query(`insert into cart (goods_id, goods_img, goods_title, goods_small_price, buy_num, user_id) values (${getData.goodsId}, '${goodsInfo.goods_img}', '${goodsInfo.goods_title}', '${goodsInfo.goods_small_price}', ${getData.addCartNum}, ${getData.userId}) `, function(error, results, fields) {
                    if (error) throw error;

                    // results 是一个对象

                    if (results) {
                        res.end(JSON.stringify({
                            meta: {
                                status: 201,
                                msg: '操作成功'
                            },
                            data: results
                        }))
                    } else {

                        res.end(JSON.stringify({
                            meta: {
                                status: 500,
                                msg: '操作失败'
                            },
                            data: null
                        }))
                    }
                });

            });

        }

    });

}).listen(7000)