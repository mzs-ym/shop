$.ajax({
    url: "http://127.0.0.1:5002",
    dataType: 'json',
    success: function(res) {
        var html = '';
        $.each(res.data, function(index, item) {

            html += `
            <div class="slick-slide slick-current slick-active" data-slick-index="${index}" style="width:234px">
            <div>
			<div class="fl-product">
			<div class="image sale-product">
				<a href="./xq.html">
					<img gd="${item.goods_id}" src="${item.goods_img}"
						class="img-fluid" alt="">
					<img gd="${item.goods_id}" src="${item.goods_img}"
						class="img-fluid" alt="">
				</a>
				
				<span class="wishlist-icon">
					<a href="#"><i class="icon ion-md-heart-empty"></i></a>
				</span>
			</div>
			<div class="content">
				<h2 class="product-title"> <a href="single-product.html">${item.goods_title}</a>
				</h2>
				<div class="rating">
					<i class="fa fa-star active"></i>
					<i class="fa fa-star active"></i>
					<i class="fa fa-star active"></i>
					<i class="fa fa-star"></i>
					<i class="fa fa-star"></i>
				</div>
				<p class="product-price">
					<span class="main-price discounted">${item.goods_small_price}</span>
					<span class="discounted-price">${item.goods_price}</span>
				</p>

				<div class="hover-icons">
					<ul>
						<li><a href="#" data-tooltip="Add to Cart"><i
									class="icon ion-md-cart"></i></a></li>
						<li><a href="#" data-tooltip="Compare"><i
									class="icon ion-md-options"></i></a></li>
						<li><a href="#" data-toggle="modal"
								data-target="#quick-view-modal-container"
								data-tooltip="Quick View"><i
									class="icon ion-md-open"></i></a></li>
					</ul>
				</div>
			</div>
        </div>
        </div>
        </div>`
        })
        console.log($(".slick-track").html());
        $("#datas").html(html);
       
    },
    error: function(err) {
        console.log(err)
    }
})