/**
 * Created by senyi on 2015/4/13.
 */

 function pubu(){
    var len = data.length ;
    var picn = 0;
    var wrap1 = document.getElementById('wrap');
    for(var i=0;i<8;i++){
        //创建box
        var box1 = document.createElement('div');
        box1.className = 'box';
        wrap1.appendChild(box1);
        //创建info
        var info1 = document.createElement('div');
        info1.className = 'info';
        box1.appendChild(info1);

        //创建pic
        var pic1 = document.createElement('div');
        pic1.className = 'pic';
        info1.appendChild(pic1);
        //创建img
        var img1 = document.createElement('img');
        img1.src = '/Img/image2/'+data[len-1-picn].src;
        img1.style.height = 'auto';
        pic1.appendChild(img1);
        //创建title
        var title1 = document.createElement('div');
        title1.className = 'title';
        info1.appendChild(title1);
        //创建a标记
        var a1 = document.createElement('p');
        a1.innerHTML = data[len-1].title;
        title1.appendChild(a1);
        //创建标签
        var bq1 = document.createElement('div');
          bq1.className = "biaoqian2";
        info1.appendChild(bq1);
        var bqp1 = document.createElement('p');
        bqp1.innerHTML = data[len-1-picn].label;
        bq1.appendChild(bqp1);
        //简要内容
        var jy1 = document.createElement('div');
        jy1.className = "jianjie2";
        info1.appendChild(jy1);
        var jyp1 = document.createElement('p');
        jyp1.innerHTML = data[len-1-picn].covaerage;
        jy1.appendChild(jyp1);
        //创建按钮
        var butt1 = document.createElement('div');
        butt1.className = 'button2';
        butt1.innerHTML = 'more';
        info1.appendChild(butt1);
        //创建点赞
        var zan1 = document.createElement('span');
        zan1.className = "glyphicon glyphicon-thumbs-up ingood2";
        info1.appendChild(zan1);
        picn++;
    }
    //设置滚动加载

    document.getElementById('containerp').onscroll = function(){
        //校验数据请求
        if(getCheck()&&(len-1-picn) in data){
            var wrap = document.getElementById('wrap');
            for(var i=0;i<3;i++){
                //创建box
                var box1 = document.createElement('div');
                box1.className = 'box';
                wrap1.appendChild(box1);
                //创建info
                var info1 = document.createElement('div');
                info1.className = 'info';
                box1.appendChild(info1);

                //创建pic
                var pic1 = document.createElement('div');
                pic1.className = 'pic';
                info1.appendChild(pic1);
                //创建img
                var img1 = document.createElement('img');
                img1.src = '/Img/image2/'+data[len-1-picn].src;
                img1.style.height = 'auto';
                pic1.appendChild(img1);
                //创建title
                var title1 = document.createElement('div');
                title1.className = 'title';
                info1.appendChild(title1);
                //创建a标记
                var a1 = document.createElement('p');
                a1.innerHTML = data[len-1-picn].title;
                title1.appendChild(a1);
                //创建标签
                var bq1 = document.createElement('div');
                bq1.className = "biaoqian2";
                info1.appendChild(bq1);
                var bqp1 = document.createElement('p');
                bqp1.innerHTML = data[len-1-picn].label;
                bq1.appendChild(bqp1);
                //简要内容
                var jy1 = document.createElement('div');
                jy1.className = "jianjie2";
                info1.appendChild(jy1);
                var jyp1 = document.createElement('p');
                jyp1.innerHTML = data[len-1-picn].covaerage;
                jy1.appendChild(jyp1);
                //创建按钮
                var butt1 = document.createElement('div');
                butt1.className = 'button2';
                butt1.innerHTML = '按钮';
                info1.appendChild(butt1);
                //创建点赞
                var zan1 = document.createElement('span');
                zan1.className = "glyphicon glyphicon-thumbs-up ingood2";
                info1.appendChild(zan1);
                picn++;
            }
            PBL('wrap','box');
        }
    }
}
/**
 * 瀑布流主函数
 * @param  wrap	[Str] 外层元素的ID
 * @param  box 	[Str] 每一个box的类名
 */
function PBL(wrap,box){
    //	1.获得外层以及每一个box
    var wrap = document.getElementById(wrap);
    var boxs  = getClass(wrap,box);
    //	2.获得屏幕可显示的列数
    var boxW = boxs[0].offsetWidth;
    var x = document.getElementById("wrap").offsetWidth;
    var colsNum = Math.floor(x/boxW);
    wrap.style.width = boxW*colsNum+'px';
    //	3.循环出所有的box并按照瀑布流排列
    var everyH = [];//定义一个数组存储每一列的高度
    for (var i = 0; i< boxs.length; i++) {
        if(i<colsNum){
            everyH[i] = boxs[i].offsetHeight;
        }else{
            var minH = Math.min.apply(null,everyH);//获得最小的列的高度
            var minIndex = getIndex(minH,everyH); //获得最小列的索引
            getStyle(boxs[i],minH,boxs[minIndex].offsetLeft,i);
            everyH[minIndex] += boxs[i].offsetHeight;//更新最小列的高度
        }
    }
}
/**
 * 获取类元素
 * @param  warp		[Obj] 外层
 * @param  className	[Str] 类名
 */
function getClass(wrap,className){
    var obj = wrap.getElementsByTagName('*');
    var arr = [];
    for(var i=0;i<obj.length;i++){
        if(obj[i].className == className){
            arr.push(obj[i]);
        }
    }
    return arr;
}
/**
 * 获取最小列的索引
 * @param  minH	 [Num] 最小高度
 * @param  everyH [Arr] 所有列高度的数组
 */
function getIndex(minH,everyH){
    for(index in everyH){
        if (everyH[index] == minH ) return index;
    }
}
/**
 * 数据请求检验
 */
function getCheck(){
    var documentH = document.getElementById('containerp').clientHeight;
    var scrollH = document.getElementById('containerp').scrollTop;
    return documentH+scrollH>=getLastH() ?true:false;
}
/**
 * 获得最后一个box所在列的高度
 */
function getLastH(){
    var wrap = document.getElementById('wrap');
    var boxs = getClass(wrap,'box');
    return boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
}
/**
 * 设置加载样式
 * @param  box 	[obj] 设置的Box
 * @param  top 	[Num] box的top值
 * @param  left 	[Num] box的left值
 * @param  index [Num] box的第几个
 */
var getStartNum = 0;//设置请求加载的条数的位置
function getStyle(box,top,left,index){
    if (getStartNum>=index) return;
    $(box).css({
        'position':'absolute',
        'top':top,
        "left":left,
        "opacity":"0"
    });
    $(box).stop().animate({
        "opacity":"1"
    },999);
    getStartNum = index;//更新请求数据的条数位置
}