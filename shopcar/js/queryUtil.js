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