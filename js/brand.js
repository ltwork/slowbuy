$(function (){
    //渲染页面
    function render(){
        $.get({
            url: 'http://mmb.ittun.com/api/getbrandtitle',
            dataType: 'json',
            success: function (obj){
                // console.log(obj);

                var html = template('tplBrand',obj);
                $('.brandList').html(html);

                // //当数据加载成功之后，需要手动结束刷新状态
				// mui("body").pullRefresh().endPulldownToRefresh();
            }
        });
    }

    render();

    //点击li跳转对应的品牌
    $('.brandList').on('click','.goBrand',function (){
        location = "./distop.html?brandtitleid=" + $(this).parent().data('brandtitleid') + "&id="+ $(this).parent().data('id') + "&brandTitle=" + escape($(this).html());
    });

    //下拉刷新
    // mui.init({
    //     pullRefresh: {
    //         container: "body",
    //         down: {
    //             style: 'circle',//必选
    //             auto: true, //只要进入到页面，就会执行刷新操作
    //             callback: function () { //下拉刷新执行函数
    //                 render();
    //             }
    //         }
    //     }
    // });
});