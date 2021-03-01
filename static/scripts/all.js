(function($){
    "use strict";
    $(window).load(function(){
          $(".page-loader div").fadeOut();
          $(".page-loader").delay(200).fadeOut("slow");

        $(window).trigger("scroll");
        $(window).trigger("resize");

        if ((window.location.hash) && ($(window.location.hash).length)){
            var hash_offset = $(window.location.hash).offset().top;
            $("html, body").animate({
                scrollTop: hash_offset
            });
        }

    });

    $(document).ready(function(){
        $(window).trigger("resize");
        init_classic_menu();
        init_wow();
    });

    $(window).resize(function(){
        init_classic_menu_resize();
        js_height_init();

    });
    var mobileTest;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTest = true;
        $("html").addClass("mobile");
    }
    else {
        mobileTest = false;
        $("html").addClass("no-mobile");
    }

    var mozillaTest;
    if (/mozilla/.test(navigator.userAgent)) {
        mozillaTest = true;
    }
    else {
        mozillaTest = false;
    }
    var safariTest;
    if (/safari/.test(navigator.userAgent)) {
        safariTest = true;
    }
    else {
        safariTest = false;
    }

    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
    }

    function height_line(height_object, height_donor){
        height_object.height(height_donor.height());
        height_object.css({
            "line-height": height_donor.height() + "px"
        });
    }

    !function(a){
        a.fn.equalHeights = function(){
            var b = 0, c = a(this);
            return c.each(function(){
                var c = a(this).innerHeight();
                c > b && (b = c)
            }), c.css("height", b)
        }, a("[data-equal]").each(function(){
            var b = a(this), c = b.data("equal");
            b.find(c).equalHeights()
        })
    }(jQuery);

    var mobile_nav = $(".mobile-nav");
    var desktop_nav = $(".desktop-nav");
    function init_classic_menu_resize(){
        $(".mobile-on .desktop-nav > ul").css("max-height", $(window).height() - $(".main-nav").height() - 20 + "px");
        if ($(window).width() <= 1024) {
            $(".main-nav").addClass("mobile-on");
        }
        else
            if ($(window).width() > 1024) {
                $(".main-nav").removeClass("mobile-on");
                desktop_nav.show();
            }
    }

    function init_classic_menu(){
        height_line($(".inner-nav > ul > li > a"), $(".main-nav"));
        height_line(mobile_nav, $(".main-nav"));

        mobile_nav.css({
            "width": $(".main-nav").height() + "px"
        });

        if ($(".main-nav").hasClass("transparent")){
           $(".main-nav").addClass("js-transparent");
        }

        $(window).scroll(function(){
                if ($(window).scrollTop() > 10) {
                    $(".js-transparent").removeClass("transparent");
                    $(".main-nav, .inner-nav, .nav-logo-wrap .logo, .mobile-nav").addClass("small-height"); 
                }
                else {
                    $(".js-transparent").addClass("transparent");
                    $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").removeClass("small-height");
                }


        });

        mobile_nav.click(function(){
            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");
            }

        });

        desktop_nav.find("a:not(.mn-has-sub)").click(function(){
            if (mobile_nav.hasClass("active")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                mobile_nav.removeClass("active");
            }
        });

        var mnHasSub = $(".mn-has-sub");
        var mnThisLi;

        $(".mobile-on .mn-has-sub").find(".fa:first").removeClass("fa-angle-right").addClass("fa-angle-down");

        mnHasSub.click(function(){
            if ($(".main-nav").hasClass("mobile-on")) {
                mnThisLi = $(this).parent("li:first");
                if (mnThisLi.hasClass("js-opened")) {
                    mnThisLi.find(".mn-sub:first").slideUp(function(){
                        mnThisLi.removeClass("js-opened");
                        mnThisLi.find(".mn-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                }
                else {
                    $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    mnThisLi.addClass("js-opened");
                    mnThisLi.find(".mn-sub:first").slideDown();
                }
                return false;
            }
            else {
            }
        });

        mnThisLi = mnHasSub.parent("li");
        mnThisLi.hover(function(){

            if (!($(".main-nav").hasClass("mobile-on"))) {
                $(this).find(".mn-sub:first").stop(true, true).fadeIn("fast");
            }

        }, function(){
            if (!($(".main-nav").hasClass("mobile-on"))) {
                $(this).find(".mn-sub:first").stop(true, true).delay(100).fadeOut("fast");
            }
        });
    }
    function init_team(){
        $(".team-item").click(function(){
            if ($("html").hasClass("mobile")) {
                $(this).toggleClass("js-active");
            }
        });
    }
})(jQuery);

    var fm_menu_wrap = $("#fullscreen-menu");
    var fm_menu_button = $(".fm-button");

    var side_panel = $(".side-panel");
    var sp_button = $(".sp-button");
    var sp_close_button = $(".sp-close-button");
    var sp_overlay = $(".sp-overlay");

    function sp_panel_close(){
        side_panel.animate({
            opacity: 0,
            left: -270
        }, 500, "easeOutExpo");
        sp_overlay.fadeOut();
    }

    function js_height_init(){
        (function($){
            $(".js-height-full").height($(window).height());
            $(".js-height-parent").each(function(){
                $(this).height($(this).parent().first().height());
            });
        })(jQuery);
    }

function init_wow(){
    (function($){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 90,
            mobile: false,
            live: true
        });
        if ($("body").hasClass("appear-animate")){
           wow.init();
        }
    })(jQuery);
}
