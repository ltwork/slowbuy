/**
 * 国内折扣页面内容js
 */

$(function () {

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
     * 获取数据,生成列表
     */
   
    (function () {
        var page;
        var pageSize = 4;
        mui.init({
            pullRefresh: {
                container: "#mainScroll",
                down: {
                    style: 'circle',
                    auto: true,
                    callback: function () {
                        $.ajax({
                            type: 'get',
                            url: 'http://mmb.ittun.com/api/getinlanddiscount',
                            success: function (res) {
                                console.log(res);
                                obj = res;
                                page = 1;
                                obj.page = page;
                                obj.pageStart = 0;
                                obj.pageEnd = 4;
                                var html = template('createProduct', obj);
                                $('#mainScrollProduct').html(html);

                                mui('#mainScroll').pullRefresh().endPulldownToRefresh();

                            }
                        });
                    }
                },
                up: {
                    height: 50,
                    contentrefresh: "正在加载...",
                    contentnomore: '没有更多数据了',
                    callback: function () {
                        page++;
                        obj.pageStart = (page - 1) * pageSize;
                        obj.pageEnd = page * pageSize;
                        var html = template('createProduct', obj);
                        $('#mainScrollProduct').append(html);

                        this.endPullupToRefresh();

                    }
                }
            }
        });


    }());





    /**
     * footer部分点击返回顶部
     */

    (function () {

        $('#goTop').on('click', function (e) {
            e = e || window.event;
            e.preventDefault();
            mui('#mainScroll').scroll().scrollTo(0,0,100);
            /**
             * 解决关键
             */
            mui("#mainScroll").pullRefresh().pulldownLoading();
           
        })


    }());



    /**
     * 调用a标签的点击事件
     */

    (function () {

        mui('#mainScrollProduct').on('tap', 'a', function () {
            location.href = this.href;
        });

    }())







})