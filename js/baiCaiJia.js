$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    function showProductData(titleID){
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data: {titleid: titleID},
            success: (data)=>{
                $('main .data').html(template('ProductData',{list: data.result}));
            }
        });
    }

    $('.proTitle').on('click','a',function(){
        let title = $(this).data('id');
        showProductData(title);
    });

    $.ajax({
        url: 'http://mmb.ittun.com/api/getbaicaijiatitle',
        success: (data)=>{
            $('header .bottom .mui-scroll').html(template('info',{list: data.result}));
        }
    });

    
    showProductData(0);
});