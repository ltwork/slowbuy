$(function(){

    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //1,发起ajax请求,获取商品详情页数据
    var page=0;
    // $.ajax({
    //     url: "http://mmb.ittun.com/api/getmoneyctrl",
    //     type: "GET",
    //    data:{
    //        pageid:page
    //    },
    //     dataType: "json",
    //     success: function(res){
    //         var html = template("shoplist",res);
    //         $('.scrolllist').html(html);
    //     }

    // });
    render(page);

// 点击进入详情页
    $('.scrolllist').on('click','.products',function(){
       
       var ids = $(this).data('id');
    //    sessionStorage.setItem('pid',id);
       location.href = "./productdetails.html?productId="+ids;

    })
     
    $('.callback').on('click',function(){
        window.history.back();
    })

    //返回顶部

    $('.backTop').on('click',function(){
       
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);//100毫秒滚动到顶
    });

    //分页框模块
    var sel = document.querySelector('select');
    sel.onchange = function(){
        var option = this.value;
        option=option-1;
        
        // $.ajax({
        //     url: "http://mmb.ittun.com/api/getmoneyctrl",
        //     type: "GET",
        //    data:{
        //        pageid:option
        //    },
        //     dataType: "json",
        //     success: function(res){
        //         var html = template("shoplist",res);
        //         $('.scrolllist').html(html);
    
        //     }
    
        // });
        render(option);

    };

    //上一页/下一页
   
    
    $('.page .next').on('click',function(){
        var res = sel.value;

        if(res >= 15) {
            sel.value = 15;
            // $.ajax({
            //     url: "http://mmb.ittun.com/api/getmoneyctrl",
            //     type: "GET",
            //    data:{
            //        pageid:14
            //    },
            //     dataType: "json",
            //     success: function(obj){
            //         var html = template("shoplist",obj);
            //         $('.scrolllist').html(html);
        
            //     }
        
            // }); 

            render(14);
        }else {

            sel.value = Number(res)+1;
            // $.ajax({
            //     url: "http://mmb.ittun.com/api/getmoneyctrl",
            //     type: "GET",
            //    data:{
            //        pageid:res
            //    },
            //     dataType: "json",
            //     success: function(obj){
            //         var html = template("shoplist",obj);
            //         $('.scrolllist').html(html);
        
            //     }
        
            // }); 

            render(res);


        }
       
        
    })

    $('.page .previous').on('click',function(){
        
        var res = sel.value;

        if(res <= 1) {
            sel.value = 1;
            // $.ajax({
            //     url: "http://mmb.ittun.com/api/getmoneyctrl",
            //     type: "GET",
            //    data:{
            //        pageid:0
            //    },
            //     dataType: "json",
            //     success: function(obj){
            //         var html = template("shoplist",obj);
            //         $('.scrolllist').html(html);
        
            //     }
        
            // }); 

            render(0);
        }else {

            sel.value = Number(res)-1;
            var num=Number(res)-1-1;
            // $.ajax({
            //     url: "http://mmb.ittun.com/api/getmoneyctrl",
            //     type: "GET",
            //    data:{
            //        pageid:num
            //    },
            //     dataType: "json",
            //     success: function(obj){
            //         var html = template("shoplist",obj);
            //         $('.scrolllist').html(html);
        
            //     }
        
            // }); 

            render(num);


        }
        
        
    })




    /**
     * 封裝ajax
     */
    function render(pagenum) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            type: "GET",
           data:{
               pageid:pagenum
           },
            dataType: "json",
            success: function(obj){
                var html = template("shoplist",obj);
                $('.scrolllist').html(html);
    
            }
    
        }); 
    }






})