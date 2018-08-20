$(function () {
     //渲染数据
    render(lists);

    //获取一级列表
    function lists() {
        //请求数据
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorytitle",
            type: "get",
            dataType: "json",
            success: function (res) {
                var htmlstr = template('prolists', res);
                $('.mui-table-view').html(htmlstr);
                $('.list').each(function(index,ele){
                    category($(ele).data('titleid'),index)
                })
                mui(".content").pullRefresh().endPulldownToRefresh();
            }
        })
    }

    //获取二级分类数据
    function category(titleid,index) {    
        //请求数据
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategory",
            type: "get",
            dataType: "json",
            data: {
                titleid: titleid
            },
            success: function (res) {
                var htmlstr = template('category', res);
                $('.lists').eq(index).html(htmlstr);    
            }
        })
    }
   
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
                        fn();
                    }
                }
            }
        });
    }

    //给每个二级列表菜单添加添加事件
    $('.mui-table-view').on('tap','.subcategory',function(){
       location.href = "prolists.html?categoryid="+$(this).data('categoryid')+"&category="+escape($(this).text());
    })
})