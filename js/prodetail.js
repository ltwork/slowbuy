$(function () {
    var data = {};
    //下拉菜单刷新页面
    function render(fn) {
        mui.init({
            pullRefresh: {
                container: ".content", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                    auto: true, //可选,默认false.首次加载自动上拉刷新一次
                    offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                    callback: function () {
                        fn
                    }
                }
            }
        });
    }



    //获取网址
    function getUrl(url) {
        var arr = url.split('?').pop().split('&');
        var obj = {};
        arr.forEach(function (v) {
            var pram = v.split('=');
            obj[pram[0]] = pram[1];
        })
        return obj;
    }

    data = getUrl(location.href);
    render(getProDetail(data));

    var category = unescape(data.category);
    console.log(category);
    $('.category').html(category + '<span>&gt;</span>');



    function getProDetail(data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproduct",
            type: "get",
            data: {
                productid: data.productid
            },
            dataType: "json",
            success: function (res) {
                mui(".content").pullRefresh().endPulldownToRefresh();

                // res[0]['price']= data.price;
                // res[0]['comment']= data.productCom;
                res.result[0].price = unescape(data.price);
                res.result[0].comment = unescape(data.productCom);
               var str = res.result[0].productName.split(" ").shift();
                //设置面包导航栏
                $('.brand').html(str);
                var htmlstr = template('info', res);
                $('.proinfo').html(htmlstr);
                $('.price-ratio').html(res.result[0].bjShop);
            }
        })
    }

   //获取评论总数数据
   function getComment(data){
       $.ajax({
           url:"http://mmb.ittun.com/api/getproductcom",
           type:"get",
           data:{
              productid: data.productid
           },
           dataType:"json",
           success:function(res){
              var htmlstr=template('commentTotal',res);
              $('.evaluate .box').html(htmlstr)  ;
           }
       })
   }

   $('.breadcrumb').on('tap','.category',function(){
       location.href = sessionStorage.getItem('lasturl')
   })

   $('.otherinfo .option').on('tap', 'a', function () {
    $(this).addClass('active').siblings().removeClass('active');
    if($(this).index()==2){
        $('.evaluate').show();
        getComment(data);
    }
})


})