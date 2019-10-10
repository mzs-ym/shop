// 步骤1：在站点目录中  npm init -y 生成一个package.json文件  记录项目所需第三方依赖
// 步骤2：百度搜名字 然后通过 npm i 模块名 下载（node_modules目录中）
// 步骤3：在文件中导入模块，调用方法
const http = require('http');
const svgCaptcha = require('svg-captcha');

http.createServer((req, res) => {
    // npm i svg-captcha

    let captcha = svgCaptcha.create();
    console.log(captcha);
    res.setHeader('content-type', 'text/html;charset=utf-8')
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify({
        meta: {
            msg: '登录成功',
            status: 200
        },
        data: captcha.data
    }))


}).listen(6006)


// {data: '<svg.../svg>', text: 'abcd'}s