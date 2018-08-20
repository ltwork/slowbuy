$(function(){
    mui('.mui-scroll-wrapper').scroll();



    //点击返回顶部
    $(".getBack").click(function(){       
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
    })

    //导航栏发起请求
    $.ajax({
        url:"http://mmb.ittun.com/api/getindexmenu",
        type:"get",
        success:function(obj){
            // console.log(obj);
            var html =template("tpl",{list:obj.result})
           $('.nav').html(html);           
        }
    })

    $(".nav").on('click',".click7",function(){
        console.log(123);
        
        $(".nav .bottom").slideToggle(300);
    })

    //商品列表发起请求
    $.ajax({
        url:"http://mmb.ittun.com/api/getmoneyctrl",
        type:"get",
        success:function(obj){
            var html = template("tpl1",{list:obj.result})
            $(".products").html(html);
            // console.log(obj);
            
        }
    })
    $(".nav").on('tap',".click0",function(){
        console.log(123);
        
        window.location.href="./subHtml/lists.html"
    });
    $(".nav").on('tap',".click1",function(){

        window.location.href="./subHtml/savemoney.html"
    });
    $(".nav").on('tap',".click2",function(){

        window.location.href="./subHtml/discounts.html"
    });
    $(".nav").on('tap',".click3",function(){

        window.location.href="./subHtml/baiCaiJia.html"
    });
    $(".nav").on('tap',".click4",function(){

        window.location.href="./subHtml/haitaozekou.html"
    });
    $(".nav").on('tap',".click5",function(){

        window.location.href="./subHtml/coupons.html"
    });

    $(".nav").on('tap',".click8",function(){
        window.location.href="./subHtml/coudanpin.html"
    });
    $(".nav").on('tap',".click10",function(){
        window.location.href="./subHtml/navigation.html"
    });
    $(".nav").on('tap',".click11",function(){
        window.location.href="./subHtml/brand.html"
    });




})