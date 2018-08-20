$(function(){

    $.ajax({

        url: "http://mmb.ittun.com/api/getsitenav",
        type: "GET",
        dataType: "json",
        success: function(res){
            console.log(res);
            var html = template('shoplist',res);
            $('.main').html(html);
        }
    })




});