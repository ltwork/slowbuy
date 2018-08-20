/**
 * 这是商品详情页面
 */
$(function () {

    /**
     * 区域滚动
     */
    /**
     * navBar区域滚动
     */


    (function () {


        mui('#navBarScroll').scroll({
            scrollY: false,
            scrollX: true,
            deceleration: 0.0005,
            indicators: false,
        });



    }());


    /**
     * 内容列表滚动
     */

    (function () {

        mui('#mainScroll').scroll({
            deceleration: 0.0005,
            indicators: false
        });


    }());


    /**
     * 获取数据.商品列表
     */

    function urlTool() {
        var obj = {};
        var urlMessage = window.location.href;
        //将地址字符串打开
        var searchList = urlMessage.split('?')[1];
        var arrSearch = searchList.split('&');
        for (var i = 0; i < arrSearch.length; i++) {
            arrSearch[i] = arrSearch[i].split('=');

            obj[arrSearch[i][0]] = arrSearch[i][1];
        }
        // console.log(arrSearch);
        return obj;
    }


    var urlObj = urlTool();

    $.ajax({
        type: 'get',
        url: 'http://mmb.ittun.com/api/getdiscountproduct',
        data: {
            productid: urlObj.productid.split('#')[0]
        },
        success: function (res) {
            // console.log(res);
            var html = template('productMessageList', res);
            $('#mainScrollProduct').html(html);
        }
    });



    /**
     * footer部分点击返回顶部
     */

    (function () {

        $('#goTop').on('click', function (e) {
            e = e || window.event;
            e.preventDefault();
            mui('#mainScroll').scroll().scrollTo(0, 0, 100);
        })

    }());













})