function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return null;
}
$(function () {
    //获取要定位元素距离浏览器顶部的距离
    $("#navbarDownList a[data-page=" + getQueryString("product") + "]").addClass("inPage");
    $('.productLink').mouseover(function () {
        $('.cart_dropdown').stop().slideDown(100);
    }).mouseout(function () {
        $('.cart_dropdown').stop().slideUp(100);
    });
    // $('a.navbar-a').hover(function(){
    //     $('a.navbar-a').removeClass("spanshow");
    //     $(this).addClass("spanshow");
    //   });
    $(window).scroll(function () {
        // 滚动条距离顶部的距离 大于 200px时
        if ($(window).scrollTop() >= 200) {
            $("li.top-li").show(); // 开始淡入
        } else {
            $("li.top-li").stop(true, true).hide();
        }
    });


    var options = {
        animateThreshold: -200,
        scrollPollInterval: 0
    }
    $('.aniview').AniView(options);
    $('.productList li').each(function () {
        $('.productList li').mouseover(function () {
            var index = $(this).index();
            $('.productList .bg').css('left', (index - 1) * 120 + 'px');
            $('.productList li').css('color', '#25272C');
            $(this).css('color', '#328FEC');
            $('.tab2').removeClass('show')
            $('.tab2').eq(index - 1).addClass('show')
        });
    })

    // $("div.ai-container-img").off("click").on("click", function () {
    //     if (!$(this).hasClass("closed")) {
    //         $(this).addClass("closed")
    //         $("div.contact-pannel").fadeIn(200).delay(1000).addClass("slideS")
    //     } else {
    //         $(this).removeClass("closed")
    //         $("div.contact-pannel").removeClass("slideS").hide();
    //     }

    // })
    $("div.top-container").off("click").on("click", function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000); //1s完成回到顶部
        return false;
    })
    $("div.tab-product a.tabitem").off("click").on("click", function () {
        $("div.tab-product ul li").removeClass("pactive");
        $(this).parent("li").addClass("pactive");
        $($(this).data("href")).siblings("div.tabbox").fadeOut(0, () => {
            $($(this).data("href")).fadeIn(300)
        });
    })
    //document.write('<script type="text/javascript"  data-lxb-uid="10977910" data-lxb-gid="06060252" src="http://lxbjs.baidu.com/api/asset/api.js?t=' + new Date().getTime() + '" charset="utf-8"><\/script>' );
    function CheckPhone(number){
        var regExp1=/^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$/
        var regExp2=/^((\+86|\+86\-)|(86|86\-)|(0086|0086\-))?1[3|5|7|8]\d{9}$/
        if(regExp1.test(number)|| regExp2.test(number)){
            return true
        }else{
            return false
        }
    }

    $("#callUs").off("click").on("click", function (e) {
        window.event ? window.event.cancelBubble = true : e.stopPropagation();
        var vtel = $("#vtel").val();
        $(".telRight").hide();
        $(".telWrong").hide();
        $(".contact-card-cover").hide();
        if (CheckPhone(vtel)) {
            //lxb.call(document.getElementById("vtel"));
            $(".contact-card-cover").show();
            $(".telRight").show();
            var timer = setTimeout(function () {
                $(".contact-card-cover").hide();
                $(".telRight").hide();
                clearTimeout(timer)
            }, 000)
        } else {
            $(".contact-card-cover").show();
            $(".telWrong").show();
        }
    })
    $("input[type='tel']").focus(function(){
        $(".telRight").hide();
        $(".telWrong").hide();
        $(".contact-card-cover").hide();
    });
    $(document).bind("click", function (e) {
        // !$("div.ai-container-img").hasClass("slideS")&&
        if ($(e.target).closest(".aside").length > 0 && !$(e.target).hasClass("closed") && $(e.target).hasClass("ai-container-img")) {
            $("div.contact-pannel").fadeIn(200).delay(1000).addClass("slideS")
            $("div.ai-container-img").addClass("closed");
            $("input[type='tel']").focus();
            $(".telRight").hide();
            $(".telWrong").hide();
            $(".contact-card-cover").hide();
        } else if ($(e.target).closest(".aside").length <= 0 || $(e.target).hasClass("closed")) { //!$("div.ai-container-img").hasClass("slideS")
            $("div.contact-pannel").removeClass("slideS").hide();
            $("div.ai-container-img").removeClass("closed")
        }
    });




})