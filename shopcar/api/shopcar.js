const http=require("http")
const mysql=require("mysql")
const url=require("url")
var connection =mysql.createConnection({
    host     :'localhost',
    user     :'root',
    password :'root',
    database :'shop'

}); 
connection.connect();

http.createServer((req,res)=>{
    let userId=url.parse( req.url,true).query.userId
    let pwd=url.parse( req.url,true).query.pwd
    if (!userId || !pwd) 
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
    connection.query(`select * from user where user_id = '${userId}'`,function(error,results,fields){
        if(error) throw error;
        
        if(results[0].user_pwd!=pwd){  
            res.setHeader("Access-Control-Allow-Origin","*");
            res.end(JSON.stringify({
                meta:{
                    msg:"请重新登录",
                    status:400
                  },
                  data:null
                }))
            return
        }
    });
    connection.query(`select * from cart where user_id = '${userId}'`,function(error,results,fields){

        res.setHeader("Access-Control-Allow-Origin","*");
    //    let user_pwd=md5(results[0].user_pwd)
        res.end(JSON.stringify({
            meta: {
                msg: '登录成功',
                status: 200
            },
            data:results
        }))
        return
   
    });
}).listen(3005)