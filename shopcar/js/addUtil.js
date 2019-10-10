
$('#save-data').on('click', function () {

    var goodsid = $('#goods_id').val();
    var goodsimg = $('#goods_img').val();
    var goodstitle = $('#goods_title').val();
    var goodsprice = $('#goods_price').val();
    var goodssmallprice = $('#goods_small_price').val();
    var goodsnum = $('#goods_num').val();



    $.ajax({
        url: "http://127.0.0.1:5001",
        dataType: 'json',
        data: { "goods_id": goodsid, "goods_img": goodsimg, "goods_num": goodsnum, "goods_price": goodsprice, "goods_small_price": goodssmallprice, "goods_title": goodstitle },
        success: function (res) {
            if (res.meta.status == 200) {
                alert('插入成功');
            }
        },
        error: function (err) {
            console.log(err)
        }
    })


    $.ajax({
        url: "http://127.0.0.1:5002",
        dataType: 'json',
        success: function (res) {
           
            var html = '';
            $.each(res.data, function (index, item) {

                html += `
                <tr class="text-center middle">
                            <td>${item.goods_id}</td>
                            <td>${item.goods_img}</td>
                            <td>${item.goods_title}</td>
                            <td>
                               ${item.goods_price}
                            </td>
                            <td>
                            ${item.goods_small_price}
                            </td>
                            <td>
                            ${item.goods_num}
                            </td>
                        </tr>
                `
            })

            $("tbody").html(html);

        },
        error: function (err) {
            console.log(err)
        }
    })




})








