$(function(){
    // var sessionid = sessionStorage.getItem('pid');

    function UrlTool() {
        var searchMessage=window.location.href;
        var getMessage=searchMessage.split('?').pop().split('#').shift();
        //searchMessage.split('?').pop() 表示获取到?后面内容
        //split('#').shift()  表示获取到#号前面的内容
        var arr=getMessage.split('&');
        var obj={};
        arr.forEach(function(ele,index) {
            obj[ele.split('=')[0]]=ele.split('=')[1];
        });
        return obj;
    };

    var sessionid=UrlTool().productId;
    console.log(sessionid);
    


   // console.log(sessionid);
    $.ajax({
        url: "http://mmb.ittun.com/api/getmoneyctrlproduct",
        type: "GET",
        data: {productid:sessionid},
        dataType: "json",
        success: function(res){
            console.log(res);
            var html = template('productlist',res.result[0]);
            $('.main').html(html);
            
            
            
        }

    })

    // 返回顶部
    $('.callback').on('click',function(){
        window.history.back();
    });


})