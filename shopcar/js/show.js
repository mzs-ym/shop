//获取到的数据是字符串要转换成对象才能用
var goodsId = localStroage.getItem('goodsId');
var userId = localStroage.getItem('userId');
//商品详情页 显示数据库所有信息
$.ajax({
    type: 'get',
    url: 'http://127.0.0.1:5005',
    data: { goodsId}, //需要传递参数
    dataType: 'json',
    success: function(res) {
       
        var html = ''
            // console.log(res)  res.data

        // item就是数组中一个个对象
        // 一个个对象 对应 一条条 数据  
        html += `
                <div class="box">
                <div class="img">
                    <img src="${res.data.goods_img}" alt="" />
                    <div class="mask"></div>
                </div>
                <ul>
                    <li class="active">
                        <img src="${res.data.goods_img}" alt="">
                    </li>
                    <li>
                        <img src="${res.data.goods_img}" alt="">
                    </li>
                </ul>
                <div class="enlarge"></div>
            </div>
    
            <div class="tb-property">
                <div class="tr-nobdr">
                    <h3>${res.data.goods_title}</h3>
                </div>
                <div class="txt">
                    <span class="nowprice">￥<a href="">${res.data.buy_price}</a></span>    
                </div>
                <div class="nobdr-btns">
                    <button class="addcart hu">加入购物车</button>
                    <button class="addcart yh">立即购买</button>
                </div>
    
            </div>
				`

        // 在页面显示
        $('.showall').html('1111');
        console.log($('.showall').html(html));
    },
    error: function(err) {
        console.log(err)
    }
})

$('.showall').on("click", ".hu", function() {
    var goodsId = localStroage.getItem('goodsId');
var userId = localStroage.getItem('userId');
    $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:7000',
        data: { userId, goodsId, addCartNum: 1 }, //需要传递参数
        dataType: 'json',
        success: function(res) {
            if (res.meta.status == 200 || res.meta.status == 201) {
                alert(res.meta.msg)
                location.href = "./cart.html"
            }

        },
        error: function(err) {
            console.log(err)
        }
    })
})


