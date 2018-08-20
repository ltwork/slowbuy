$(function () {
    var pageid = 1;
    var data = getUrl(location.href);
    data.pageid = pageid;
    //首次渲染数据
    render(getProduct(data));
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
                        fn;
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

    //给每个li标签添加点击事件
    $('.prolists').on('tap', '.mui-table-view-cell', function () {
        sessionStorage.setItem('lasturl', location.href);
        url = "prodetail.html?productid=" + $(this).data('id') + "&price=" + escape($(this).data('price')) + "&productCom=" + escape($(this).data('comment')) + "&category=" + data.category;
        location.href = url;
    })

    //给加载更多数据设置点击事件
    $('.onload').on('tap', 'a', function () {
        pageid = obj.pageid || 1;
        pageid++;
        data.pageid = pageid;
        console.log(pageid);
        isDisabled(pageid);
        mui(".content").pullRefresh().pulldownLoading(); //手动触发下拉刷新
        getProduct(data);

    })

    //获取列表数据
    var totalPage;

    function getProduct(data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            type: "get",
            dataType: "json",
            data: data,
            success: function (res) {
                var htmlstr = template('pro-lists', res);
                $('.prolists').append(htmlstr);
                mui(".content").pullRefresh().endPulldownToRefresh();
                totalPage = Math.ceil(res.totalCount / res.pagesize);
                var options = template('options', {
                    totalpage: totalPage
                });
                $('.pagenation select').html(options);
                $('.pagenation select option').eq(data.pageid - 1).prop('selected', true);
                // 加载数据显示的信息
                if (totalPage <= data.pageid) {
                    $('.onload a').html('已无更多数据').addClass('mui-disabled');
                }
            }
        })
    }

    function showMask() {
        //显示遮罩层
        var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
        // mask.show(); //显示遮罩
        $('.mui-backdrop').show();
    }
    //隐藏遮罩层
    $('.masker .close').click(function () {
        var mask = mui.createMask(); //callback为用户点击蒙版时自动执行的回调；
        $('.mui-backdrop').hide(); //显示遮罩
    })

    //给搜索框下面的筛选栏添加点击事件
    $('.selection a').click(function () {
        // mui('.content').pullRefresh().refresh(true);
        $(this).addClass('active').siblings().removeClass('active');
        //筛选显示模态框
        if ($(this).index() == 3) {
            showMask();
        }
        //点击改变箭头方向
        if ($(this).index() == 1 || $(this).index() == 2) {
            if ($(this).find('.mui-icon').hasClass('mui-icon-arrowdown')) {
                $(this).find('.mui-icon').addClass('mui-icon-arrowup').removeClass('mui-icon-arrowdown');
            } else {
                $(this).find('.mui-icon').addClass('mui-icon-arrowdown').removeClass('mui-icon-arrowup');
            }
        }
    })

    
    //分页功能
    var obj = data;
    // console.log(selectValue);
    isDisabled(1);
    //判断是否禁用上一页或下一页
    function isDisabled(value){
        if (value == 1) {
            $('.pagenation .pre').addClass('mui-disabled');
            $('.pagenation .next').removeClass('mui-disabled');
        } else if (value == totalPage) {
            $('.pagenation .next').addClass('mui-disabled');
            $('.pagenation .pre').removeClass('mui-disabled');
        } else{
            $('.pagenation .pre').removeClass('mui-disabled');
            $('.pagenation .next').removeClass('mui-disabled');
        }
    }


    $('.pagenation').on('tap', 'button', function () {
        var selectValue = $('.pagenation select').val();
        if ($(this).hasClass('pre')) {
            $('.pagenation .next').removeClass('mui-disabled');
            selectValue--;
            $('option').eq(selectValue-1).prop('selected', true);
            if (selectValue == 1) {
                $(this).addClass('mui-disabled');
            }
        }

        if ($(this).hasClass('next')) {
            $('.pagenation .pre').removeClass('mui-disabled');
            selectValue++;
            $('option').eq(selectValue - 1).prop('selected', true);
            if (selectValue == totalPage) {
                $(this).addClass('mui-disabled');
            }
        }
        obj.pageid = selectValue;
        mui(".content").pullRefresh().pulldownLoading(); //手动触发下拉刷新
        getPagenationData(obj);
    })



    $('.pagenation').on('change', 'select', function () {
        obj.pageid = $(this).val();
        mui(".content").pullRefresh().pulldownLoading(); //手动触发下拉刷新
        getPagenationData(obj);
        isDisabled($(this).val());
    })


    //分页获取一条数据
    function getPagenationData(obj) {
        $('.prolists').html('');
      $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            type: "get",
            dataType: "json",
            data: obj,
            success: function (res) {
                mui(".content").pullRefresh().endPulldownToRefresh();
                mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 1);
                var htmlstr = template('pro-lists', res);
                $('.prolists').html(htmlstr);
                
                if (totalPage <= obj.pageid) {
                    $('.onload a').html('已无更多数据').addClass('mui-disabled');
                }else{
                    $('.onload a').html('加载更多数据').removeClass('mui-disabled');
                }
            }
        })
    }

})