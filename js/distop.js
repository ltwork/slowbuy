$(function () {
    //获取url传过来的值
    function getUrlKey(url) {
        var arr = url.split('?').pop().split('&');

        var obj = {};
        arr.forEach(function (e) {
            var param = e.split('=');
            obj[param[0]] = param[1];
        })

        return obj;
    }

    //从rul中获取需要的数据
    var url = location.href;
    var data = getUrlKey(url);
    // console.log(data);

    //渲染title
    //将传过来的字符串转化成数组,获取需要的字符
    var titleName = unescape(data.brandTitle).split('').reverse().slice(4).reverse().join('');

    // console.log(titleName);
    if (titleName == 'undef') {
        location = './brand.html';
        return;
    }

    var titleName1 = titleName + "哪个好";
    var titleName2 = titleName + "产品销量排行";
    var titleName3 = titleName + "最有用的用户评论";
    var titleName4 = titleName + "好物榜单";
    $('.toptit').html(titleName1);
    $('.hdtit').html(titleName2);
    $('.comtit').html(titleName3);
    $('.goodTop').html(titleName4);

    //渲染品牌内容
    function render(data) {
        $.get({
            url: 'http://mmb.ittun.com/api/getbrand',
            data: data,
            dataType: 'json',
            success: function (obj) {
                // console.log(obj);

                var html = template('tplbrandCon', obj);
                $('.brandCon').html(html);

                // //当数据加载成功之后，需要手动结束刷新状态
                // mui("body").pullRefresh().endPulldownToRefresh();
            }
        })
    }

    //渲染销量
    var brandtitleid = data.brandtitleid;
    function renderhd(brandtitleid) {
        $.get({
            url: 'http://mmb.ittun.com/api/getbrandproductlist',
            data: { brandtitleid: brandtitleid, pagesize: 4 },
            dataType: 'json',
            success: function (obj) {
                // console.log(obj);

                var html = template('tplhdCon', obj);
                $('.hdCon').html(html);

                //获取商品的productid
                productid = $('.hdtpl').data('productid');

                //渲染图片和标题
                var img = obj.result[0].productImg;
                var tit = obj.result[0].productName;
                // console.log(tit);

                //根据productid渲染评论
                rendercom(productid, img, tit);

                //当数据加载成功之后，需要手动结束刷新状态
                // mui("body").pullRefresh().endPulldownToRefresh();
            }
        })
    }

    //渲染评论
    var productid;
    function rendercom(productid, img, tit) {
        $.get({
            url: 'http://mmb.ittun.com/api/getproductcom',
            data: { productid: productid },
            dataType: 'json',
            success: function (obj) {
                // console.log(obj);

                var html1 = template('tplcom', obj);
                $('.comCon').html(html1);

                $('.top .tit').html(tit);
                $('.top .pic').html(img);
            }
        })
    }

    render(data);
    var productid = renderhd(brandtitleid);

    //下拉刷新
    // mui.init({
    //     pullRefresh: {
    //         container: "body",
    //         down: {
    //             style: 'circle',//必选
    //             auto: true, //只要进入到页面，就会执行刷新操作
    //             callback: function () { //下拉刷新执行函数
    //                 render(data);
    //                 var productid = renderhd(brandtitleid);
    //             }
    //         }
    //     }
    // });

    //点击销量排行跳转
    // $('.hdCon').on('click','.hdtpl',function (){
    //     console.log($(this).data('productid'));
    //     // location = '商品详情页?' + $(this).data('productid');
    // });

    // //点击品牌排行跳转商品详情页
    // $('.brandCon').on('click','.tplcon',function (){
    //     console.log($(this).data('brandid'));
    //     // location = '品牌分类?' + $(this).data('brandid');
    // });

    // //点击评论跳转到商品详情
    // $('.comCon').on('click','.comtpl',function (){
    //     console.log($(this).data('productid'));
    //     // location = '详情?' + $(this).data('productid');
    // });
});