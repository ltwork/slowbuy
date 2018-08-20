$(function(){
    var totoal;

    function render (pageid){
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            type: "GET",
            data: {pageid:pageid-1},
            success: function(res){
                var html = template("productList",res);
                $(".productList").html(html);
                
                total = Math.ceil(res.totalCount / res.pagesize);
                console.log(total);
                getpage(total);

                //被选中的那个 展示在页面上
                $("option").eq(pageid-1).prop("selected",true);
            }
        })
        
    }

    //得到总页码的
    function getpage(total){
        //console.log(total);
        var html = template("ullist",{total: total});
        $("#selectop").html(html);
    }
    //默认加载第一页
    render(1);


    
    //点击下拉框中的页码来展示具体页
    $("#selectop").change(function(){
        var value = parseInt($(this).val());
        console.log(value); 
        render (value);
    })

    //点击上一页事件
    
    $(".previouspage").click(function(){
        var value = $("#selectop").val();
        value--;
        if (value <= 1) {
            render(1); 
            $(this).addClass("disabled");
        }else {
            render(value); 
        }
       
    })

    //点击下一页事件
     $(".nextpage").click(function(){
         var value = $("#selectop").val();
         value++;
        // alert(value);
         if (value >= total) {
             $(this).addClass("mui-disabled");
             $(".previouspage").removeClass("disabled");
             render(total); 
         }else {
             render(value); 
         }
     })

     //点击商品跳到对应的详情页
     $(".function").click(function(){
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
     })
        
    
   

   





})