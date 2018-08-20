
/**
 * 头部导航箭头的返回事件
 */
function goback() {
    history.back();
}

$(function(){
 //滚动区域实例化
 mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
mui('.ulwrap').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


//返回顶部函数

//mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);

})

