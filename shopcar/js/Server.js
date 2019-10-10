
var mysql = require('mysql');
//连接数据库
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',  //用户名
    password:'root',   //密码
    database:'web1907',
    port:'3306'     //端口号
});
connection.connect(function(err){
    if(err){
      console.log('---:'+err);
      return;
    }
    console.log('连接succeed');
});
connection.query('select * from goods',function(error,res){
    if(error){
        console.log(err);
        return;
    }
    console.log('连接成功');
});
// 插入一条数据
/* var sql = 'insert into userlist (id,name,age,sex) values(?,?,?,?)';
var param = ['3','姜艳霞','18','女'];
connection.query(sql,param,function(err,rs){
    if(err){
        console.log(err.message);
        return;
    }
    console.log('插入数据succeed');
});
//执行查询 查询study数据库中的userlist表的数据
connection.query('select * from userlist',function(err,rs){
    if(err){
        console.log(err);
        return;
    }
    for(var i=0;i<rs.length;i++){
        console.log('id:'+rs[i].id+'name:'+rs[i].name+'age:'+rs[i].age+'sex:'+rs[i].sex);
 
    }
});
//关闭数据库
connection.end(function(err){
    if(err){
      console.log('---:'+err);
      return;
    }
    console.log('关闭succeed');


 */