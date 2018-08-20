$(function(){
    //区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 分割url的函数
    function urlTool(urlStr) {
        
        var arr = urlStr.split("?").pop().split("&");
      
        var query = {};
        arr.forEach(function(v) {
            var param = v.split("=");
            query[param[0]] = param[1];
        });
    
        return query;
    }
    
    
    var urlstr=window.location.href;
    var arr= urlTool(urlstr);
    var id=arr.id;
    
    function render(id){
        $.ajax({
            url:"http://mmb.ittun.com/api/getcouponproduct",
            type:"GET",
            data:{couponid:id},
            success:function(res){
                var html= template("counponlist",res);
                $(".productlist").html(html);
                
            }
        })
    }
    render(id);
   //返回上一级
    $(".back").click(function(){
        window.history.back();
    })
   
    var index;
    //给图片设置点击事件弹出遮罩层
    $(".productlist").on("click",".popup",function(){
        $('.mask,.masked').css('display','block');
        var arr=  $(this).data("img");
        index=$(this).data("id");
        
        $(".imgs").html(arr);
    })

    $(".mask").click(function(){
        $('.mask,.masked').css('display','none');
    })

     
    function rendera(id,index){
        $.ajax({
            url:"http://mmb.ittun.com/api/getcouponproduct",
            type:"GET",
            data:{couponid:id},
            success:function(res){
                var img=res.result[index].couponProductImg;
    
                $(".imgs").html(img);    
       
            }
        })
    }





    //给遮罩层左焦点设置点击事件
    $(".masked .left").click(function(){
        index--;
        if(index<0){
            return;
        }
        rendera(id,index);

           
    })
    
    //给遮罩层右焦点设置点击事件
    $(".masked .right").click(function(){
        
        index++;
        if(index>58){
            return;
        }
        rendera(id,index);

           
    })
    
    //快速回滚到顶部

    $(".function .top").click(function(){
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,800);//100毫秒滚动到顶
    })
})