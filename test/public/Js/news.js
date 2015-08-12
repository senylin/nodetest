//导航栏
$(document).ready(function () {
    $(".lsy_nav,ul,li").mouseover(function(){
        $(this).children(".news_down").slideDown(200);
    })
})
$(document).ready(function () {
    $(".lsy_nav,ul,li").mouseleave(function(){
        $(this).children(".news_down").hide();
    })
})
//获取元素
function gain(cl){
    return document.getElementsByClassName(cl);

}
function gainid(id){
    return document.getElementById(id);
}
//$(document).ready(function(){
//    $(".page").mouseover(function(ev){
//        if(ev.target.className=='block'){
//            $(".big_block").removeClass("big_block").addClass("block");
//
//            ev.target.className = 'big_block';
//        }
//    })
//})
//判断鼠标
$(document).ready(function(){
    $(".page").mouseover(function(){
        $(this).addClass("hover");
    })
})
$(document).ready(function(){
    $(".page").mouseout(function(){
        $(this).removeClass("hover");
    })
})


//图片导航
function get_pic(n){
    return $("#picnavs").children().eq(n);
}
function change_pic(th,ne){
    $(".pcc").fadeOut(100);
    get_pic(th).animate({width:"120px",height:"120px"},600);
    get_pic(th).removeClass("pic_c");
    get_pic(th).children().removeClass("pcc");
    get_pic(ne).animate({width:"200px",height:"180px"},600);
    get_pic(ne).children().addClass("pcc");
    get_pic(ne).addClass("pic_c");
}
function pic_turnup(){
    for(var i=0;i<9;i++){
        if(get_pic(i).hasClass("pic_c")){
            break;
        }}
        if(!get_pic(0).hasClass("pic_c")){
            change_pic(i,i-1);
            $("#picnavs").animate({top:'+=130px'},800);
        }


}
function pic_turndown() {
    for(var i=0;i<9;i++){
        if(get_pic(i).hasClass("pic_c")){
            break;
        }}
        if(!get_pic(7).hasClass("pic_c")){
            change_pic(i,i+1);
            $("#picnavs").animate({top:'-=130px'},800);
        }

}
var ch =0;
var sc=0;
function followsc(){
    var top =document.body.scrollTop ;
    if(sc==0) {
        if (top > 250 && top < 700) {
//        alert(top);
            $("#container_pic").hide();
//            $("#container_pic").animate({top: top - 220},200);
            $("#container_pic").css("top", top - 220);
            $("#container_pic").fadeIn(800);
        }
        else if (top >= 600) {
            $("#container_pic").css("top", "320px")
        }
        else {
            $("#container_pic").css("top", "0px")
        }
    }
}
//翻页
function move_pageup(){
    for(var i=0;i<9;i++){
        if($("#container").children().eq(i).hasClass("nowpage")){break;}
    }
    if(i>0){
    $("#container").children().eq(i).animate({left:'150px',opacity:'0'},600);
    $("#container").children().eq(i).removeClass("nowpage");
        $("#container").children().removeClass("block_c");
        $("#container").children().eq(i).hide(300);
        $("#container").children().eq(i-1).show();
    $("#container").children().eq(i-1).animate({left:'10px',opacity:'1'},600);
    $("#container").children().eq(i-1).addClass("nowpage");
}}
function move_pagedown(){
    for(var i=0;i<9;i++){
        if($("#container").children().eq(i).hasClass("nowpage")){break;}
    }

    if(i<4){
        $("#container").children().eq(i).animate({left:'150px',opacity:'0'},600);
        $("#container").children().eq(i).removeClass("nowpage");
        $("#container").children().removeClass("block_c");
        $("#container").children().eq(i).hide(600);
        $("#container").children().eq(i+1).show();
        $("#container").children().eq(i+1).animate({left:'10px',opacity:'1'},600);
        $("#container").children().eq(i+1).addClass("nowpage");
    }
}
//页码
function move_page(nm){
    for(var i=0;i<9;i++){
        if($("#container").children().eq(i).hasClass("nowpage")){break;}
    }
    if(i!=nm-1){
        $("#container").children().eq(i).animate({left:'150px',opacity:'0'},600);
        $("#container").children().eq(i).removeClass("nowpage");
        $("#container").children().removeClass("block_c");
        $("#container").children().eq(i).hide(300);
        $("#container").children().eq(nm-1).show();
        $("#container").children().eq(nm-1).animate({left:'10px',opacity:'1'},600);
        $("#container").children().eq(nm-1).addClass("nowpage");
    }
}

//瀑布流切换
$(document).ready(function(){
    $(".changing").click(function(){
        $("#container_pic").fadeOut(600);
            $("#container").fadeOut(600);
            $(".turn_page").fadeOut(600);
            $(".turn_page2").fadeOut(600);
            $("#containerps").slideDown(800);
        $(".changing").fadeOut(600);
        $(".changing2").fadeIn(600);
        PBL('wrap','box');
        sc=1;
   })
})
$(document).ready(function(){
    $(".changing2").click(function(){
        $("#containerps").fadeOut(600);
        $("#container").slideDown(800);
        $("#container_pic").slideDown(800);
        $(".turn_page").show();
        $(".turn_page2").show();
        $(".changing2").fadeOut(600);
        $(".changing").fadeIn(600);
        sc=0;
    })
})
//加载block
window.onload=function () {
    var len = data.length;
//    alert(len);
    var page = document.getElementById('page_a');
    for(var i=0;i<len;i++){
        //创建block
        var block1 = document.createElement('div');
        block1.className = 'block';
        page.insertBefore(block1, page.childNodes[0]);
        //创建title
        var title1 = document.createElement('a');
        title1.className = 'block_title';
        title1.href="#";
        title1.innerHTML=data[i].title;
        block1.appendChild(title1);
        //创建dianzan
        var goodbutton = document.createElement('span');
        goodbutton.className = 'glyphicon glyphicon-thumbs-up ingood';
        block1.appendChild( goodbutton);
        //创建date
        var date1 = document.createElement('p');
        date1.className='block_data';
        date1.innerHTML=data[i].date;
        block1.appendChild(date1);
        //创建标签
        var bq = document.createElement('div');
        bq.className='biaoqian';
        block1.appendChild(bq);
        var bqp = document.createElement('p');
        bqp.innerHTML = data[i].label;
        bq.appendChild(bqp);
        //创建简要内容
        var jy = document.createElement('div');
        jy.className = 'block_cova';
        jy.innerHTML = data[i].covaerage;
        block1.appendChild(jy);
        //创建按钮
        var but = document.createElement('div')
        but.className = 'block_button';
        but.innerHTML= '点击阅读';
        block1.appendChild(but);


    }
    //溢出
    var b = document.getElementById("page_b");
    var c = document.getElementById("page_c");
   var d = document.getElementById("page_d");
   var e = document.getElementById("page_e");
    var f = document.getElementById("page_f");
    var g = document.getElementById("page_g");

    for(var i=0;i<len;i++) {
        if (page.children.length>9) {
            var b1 = page.children.length;
            var c1 = page.childNodes[b1-2];
            b.insertBefore(c1, b.childNodes[0]);

        if (b.children.length>9) {
            var b2 = b.children.length;
            var c2 = b.childNodes[b2-2];
            c.insertBefore(c2, c.childNodes[0]);

        if (c.children.length>9) {
            var b3 = c.children.length;
            var c3 = c.childNodes[b3-2];
            d.insertBefore(c3, d.childNodes[0]);

        if (d.children.length>9) {
            var b4 = d.children.length;
            var c4 = d.childNodes[b4-2];
            e.insertBefore(c4, e.childNodes[0]);
        }}}}
    }
    //加载图片
   for(var h=0;h<8;h++){
          var aa = document.getElementById("picnavs");
          var bb = document.createElement("div");
        bb.className = "picnav_in";
        bb.style.background = "url("+'/Img/image2/'+data[h].src+")";
        bb.style.backgroundSize = "100% 100%";
        aa.insertBefore(bb,aa.childNodes[0]);
        var ccc = document.createElement("div");
        ccc.className = "pcc";
        bb.appendChild(ccc);
       var dd = document.createElement("p");
       dd.className = "pictitle";
       dd.innerHTML = data[h].title;
       ccc.appendChild(dd);
    }
    //热点
    var bigdata = new Array();
    var dl =data.length;
    for(var q =0;q<dl;q++){
        bigdata[q]=data[q];
    }
    bigdata.sort(function(x,y){return (x.good < y.good) ? 1 : -1;});
    for(var l = 0;l<6;l++){
        var ra = document.getElementById("redian2");
        var rb = document.createElement("li");
        ra.appendChild(rb);
        var rc = document.createElement("a");
        rc.href = "#";
        rc.innerHTML = bigdata[l].title;
        rb.appendChild(rc);
    }
    //图片响应
    $(document).ready(function(){
        $(".picnav_in").mouseover(function(){
            $(this.children).fadeIn(1000);
        })
    })
    //box响应
    $(document).ready(function(){
        $(".block").hover(function(ev){
            var a =$(this).css("height");
            for(var i =0;i<100;i++){
                if($(".page").children().eq(i).hasClass('block_c')){
                    break;
                }
            }
            if(a=="100px"){
                $(".page").children().eq(i).animate({height:'100px',width:'600px'},300);
                $(".page").children().eq(i).removeClass('block_c');
                $(this).animate({height:'150px',width:'650px'},300);
                $(this).addClass("block_c")}
        })
    })
    //点赞
    $(document).ready(function(){
        $(".ingood").click(function(){
      for(var i =0;i<len;i++){
            if($(this).parent().children(".block_title").text() == data[i].title)
            {break;}
       }
        data[i].good += 1;
            $(this).css("color","palevioletred");
        })
        $(".ingood2").click(function(){
            for(var i =0;i<len;i++){
                if($(this).parent().children(".title").text() == data[i].title)
                {break;}
            }
            data[i].good += 1;
            $(this).css("color","#3c3c3c");
        })
    })
    //初始化
    $("#page_a").children().eq(0).addClass("block_c");
    $("#page_a").children().eq(0).css({"width":"650px","height": "150px"});
    $("#picnavs").children().eq(0).addClass("pic_c");
    $("#picnavs").children().eq(0).css({"width":"200px","height":"180px"});

}

//
function goon(){
    $(document).ready(function(){
        $(".transmit").slideDown(600);
    })
}
function goout(){
    $(document).ready(function(){
        $(".transmit").fadeOut(600);
    })
}


//分类
function select(string){
    $(".block").remove();
    var len = data.length;
    var page = document.getElementById('page_a');
    for(var i=0;i<len;i++){
        if(data[i].typee == string) {
            //创建block
            var block1 = document.createElement('div');
            block1.className = 'block';
            page.insertBefore(block1, page.childNodes[0]);
            //创建title
            var title1 = document.createElement('a');
            title1.className = 'block_title';
            title1.href = "#";
            title1.innerHTML = data[i].title;
            block1.appendChild(title1);
            //创建dianzan
            var goodbutton = document.createElement('span');
            goodbutton.className = 'glyphicon glyphicon-thumbs-up ingood';
            block1.appendChild(goodbutton);
            //创建date
            var date1 = document.createElement('p');
            date1.className = 'block_data';
            date1.innerHTML = data[i].date;
            block1.appendChild(date1);
            //创建标签
            var bq = document.createElement('div');
            bq.className = 'biaoqian';
            block1.appendChild(bq);
            var bqp = document.createElement('p');
            bqp.innerHTML = data[i].label;
            bq.appendChild(bqp);
            //创建简要内容
            var jy = document.createElement('div');
            jy.className = 'block_cova';
            jy.innerHTML = data[i].covaerage;
            block1.appendChild(jy);
            //创建按钮
            var but = document.createElement('div')
            but.className = 'block_button';
            but.innerHTML = '点击阅读';
            block1.appendChild(but);
        }
    }
    $(document).ready(function(){
        $(".block").hover(function(ev){
            var a =$(this).css("height");
            for(var i =0;i<100;i++){
                if($(".page").children().eq(i).hasClass('block_c')){
                    break;
                }
            }
            if(a=="100px"){
                $(".page").children().eq(i).animate({height:'100px',width:'600px'},300);
                $(".page").children().eq(i).removeClass('block_c');
                $(this).animate({height:'150px',width:'650px'},300);
                $(this).addClass("block_c")}
        })
    })
}