$(function () {

    //存一个全局变量存id
    var shopid = 0;
    var areaid = 0;
    //进来就加载页面
    jiazai(shopid, areaid);
    //导航的点击事件



    var flag = 0;
    $('.left a').click(function () {
        //点击箭头变化


        if ($(this).find(".mui-icon").hasClass("mui-icon-arrowdown")) {
            // alert('msg');
            $(this).find(".mui-icon").addClass("mui-icon-arrowup").removeClass("mui-icon-arrowdown");
        } else {
            $(this).find(".mui-icon").addClass("mui-icon-arrowdown").removeClass("mui-icon-arrowup");

        }

        // $(this).find(".mui-icon").removeClass().addClass("mui-icon  mui-icon-arrowup").siblings().removeClass().addClass("m4ui-icon  mui-icon-arrowdown");

        //弹出内容
        //console.log($(this).data('xh'));


        if ($(this).data('xh') == 1) {
            $('.yc1').toggle();
            $('.yc2').hide();
            $('.yc3').hide();
            $('.yc4').hide();
            $('.mui-icon-search').show();
            $('#xx').hide();



            $.get({
                url: "http://mmb.ittun.com/api/getgsshop",
                success: function (obj) {
                    //console.log(obj);




                    var html1 = template('muban1', obj);
                    $('.yc1').html(html1);


                    //获取导航span data-id  
                    var daohangid1 = $('#shop').data('shopid');
                    //默认第一个显示
                     $('.yc1').find('li').eq(daohangid1).find('span').show();


                    //点击换标题
                    $('.yc1').on('click', 'li', function () {
                        //console.log($(this).data('shopid'));

                        shopid = $(this).data('shopid');
                        
                        //console.log(ooo);
                        
                        $('#shop').data('shopid',shopid);
                        //console.log(shopid);
                        //console.log(areaid);
                        //调用加载函数
                        jiazai(shopid, areaid);
                        //console.log($(this).html());
                        //截取字符串
                        var diyige = $(this).html();
                        var dyg = diyige.split('<');
                        //console.log(dyg);
                        //赋值给导航
                        $('#shop').html(dyg[0]);
                        //箭头还原
                        $('.left a').find(".mui-icon").removeClass().addClass('mui-icon mui-icon-arrowdown');
                        $('.yc2').hide();
                        $('.yc3').hide();
                        $('.mui-icon-search').show();
                        $('#xx').hide();
                        $('.yc4').hide();
                        $('.yc1').hide();
                    })
                }
            })
        } else if ($(this).data('xh') == 2) {
            $('.yc2').toggle();
            $('.yc1').hide();
            $('.yc3').hide();
            $('.mui-icon-search').show();
            $('#xx').hide();
            $('.yc4').hide();
            $.get({
                url: "http://mmb.ittun.com/api/getgsshoparea",
                success: function (obj) {

                    

                    var html2 = template('muban2', obj);
                    $('.yc2').html(html2);

                     //获取导航span data-id  
                     var daohangid2 = $('#area').data('areaid');
                     //默认第一个显示
                      $('.yc2').find('li').eq(daohangid2).find('span').show();

                    $('.yc2').on('click', 'li', function () {
                        //console.log($(this).data('shopid'));

                        areaid = $(this).data('areaid');
                        $('#area').data('areaid',areaid);
                        //$('#area').html($(this).html());
                        //console.log(shopid);
                        //console.log(areaid);
                        jiazai(shopid, areaid);
                        //切割字符串
                        var strs = $(this).html();
                        var str = strs.split('（');
                        //console.log(str[0]);
                        $('#area').html(str[0]);
                        $('.left a').find(".mui-icon").removeClass().addClass('mui-icon mui-icon-arrowdown');
                        $('.yc2').hide();
                        $('.yc3').hide();
                        $('.yc1').hide();
                        $('.yc4').hide();
                        $('.mui-icon-search').show();
                        $('#xx').hide();


                        
                    })

                    
                    
                   
                    
                }
            })
        } else if ($(this).data('xh') == 3) {
            $('.yc3').toggle();
            $('.yc1').hide();
            $('.yc2').hide();
            $('.mui-icon-search').show();
            $('#xx').hide();
            $('.yc4').hide();

            
            $('.yc3').on('click', 'li', function () {//默认第一个亮
                $('.yc3').find('li').eq(0).find('span').show();
                
                $(this).parent().siblings().find('span').hide();
                $(this).find('span').show().parent().siblings().find('span').hide();



                //赋值  拼接
                //$('#jiage').html($(this).html());

                 //截取字符串
                 var disange = $(this).html();
                 var dsg = disange.split('<');
                 //console.log(dyg);
                 //赋值给导航
                 $('#jiage').html(dsg[0]);



                $('.left a').find(".mui-icon").removeClass().addClass('mui-icon mui-icon-arrowdown');
                $('.yc2').hide();
                $('.yc3').hide();
                $('.yc1').hide();
                $('.yc4').hide();
                $('.mui-icon-search').show();
                $('#xx').hide();

            })
        }
    })


    //加载数据的函数
    function jiazai(shopid, areaid) {
        $.get({
            url: "http://mmb.ittun.com/api/getgsproduct",
            data: {
                shopid: shopid,
                areaid: areaid
            },
            success: function (obj) {
                var html3 = template('muban3', obj);
                $('.main').html(html3);
            }
        })
    }

    $('.rig span').click(function () {
        $('.yc4').toggle();
        $('.mui-icon-search').toggle();
        $('#xx').toggle();
        $('.yc2').hide();
        $('.yc3').hide();
        $('.yc1').hide();
    })

    $('.paixu button').click(function () {
        $(this).addClass('yanse').siblings().removeClass('yanse');
    })
    $('.classify button').click(function () {
        $(this).addClass('yanse').siblings().removeClass('yanse');
    })
})