(function($){
    "use strict";

    $(window).load(function(){
          $(".page-loader div").fadeOut();
          $(".page-loader").delay(200).fadeOut("slow");

        init_scroll_navigate();

        $(window).trigger("scroll");
        $(window).trigger("resize");

        // Hash menu forwarding
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
        init_fullscreen_menu();
        init_side_panel();
        init_lightbox();
        init_parallax();
        init_shortcodes();
        init_team();
        initPageSliders();
        init_wow();
    });

    $(window).resize(function(){
        init_classic_menu_resize();
        init_side_panel_resize()
        js_height_init();
        split_height_init();
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

    var pageSection = $(".home-section, .page-section, .small-section, .split-section");
    pageSection.each(function(indx){

        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

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

        $(".js-stick").sticky({
            topSpacing: 0
        });

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
                    $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").addClass("small-height");
                }
                else {
                    $(".js-transparent").addClass("transparent");
                    $(".main-nav, .nav-logo-wrap .logo, .mobile-nav").removeClass("small-height");
                }


        });

        // Mobile menu toggle

        mobile_nav.click(function(){

            if (desktop_nav.hasClass("js-opened")) {
                desktop_nav.slideUp("slow", "easeOutExpo").removeClass("js-opened");
                $(this).removeClass("active");
            }
            else {
                desktop_nav.slideDown("slow", "easeOutQuart").addClass("js-opened");
                $(this).addClass("active");

                // Fix for responsive menu
                if ($(".main-nav").hasClass("not-top")){
                    $(window).scrollTo(".main-nav", "slow");
                }

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

    function init_scroll_navigate(){
        $(".local-scroll").localScroll({
            target: "body",
            duration: 1500,
            offset: 0,
            easing: "easeInOutExpo"
        });

        var sections = $(".home-section, .split-section, .page-section");
        var menu_links = $(".scroll-nav li a");

        $(window).scroll(function(){
            sections.filter(":in-viewport:first").each(function(){
                var active_section = $(this);
                var active_link = $('.scroll-nav li a[href="#' + active_section.attr("id") + '"]');
                menu_links.removeClass("active");
                active_link.addClass("active");
            });
        });
    }

    function init_parallax(){
        if (($(window).width() >= 1024) && (mobileTest == false)) {
            $(".parallax-1").parallax("50%", 0.1);
            $(".parallax-2").parallax("50%", 0.2);
            $(".parallax-3").parallax("50%", 0.3);
            $(".parallax-4").parallax("50%", 0.4);
            $(".parallax-5").parallax("50%", 0.5);
            $(".parallax-6").parallax("50%", 0.6);
            $(".parallax-7").parallax("50%", 0.7);
            $(".parallax-8").parallax("50%", 0.5);
            $(".parallax-9").parallax("50%", 0.5);
            $(".parallax-10").parallax("50%", 0.5);
            $(".parallax-11").parallax("50%", 0.05);
        }

    }
    function init_shortcodes(){
        var tpl_tab_height;
        $(".tpl-minimal-tabs > li > a").click(function(){
            if (!($(this).parent("li").hasClass("active"))) {
                tpl_tab_height = $(".tpl-minimal-tabs-cont > .tab-pane").filter($(this).attr("href")).height();
                $(".tpl-minimal-tabs-cont").animate({
                    height: tpl_tab_height
                }, function(){
                    $(".tpl-minimal-tabs-cont").css("height", "auto");
                });
            }
        });

        $(".accordion").each(function(){
            var allPanels = $(this).children("dd").hide();
            $(this).children("dd").first().slideDown("easeOutExpo");
            $(this).children("dt").children("a").first().addClass("active");

            $(this).children("dt").children("a").click(function(){
                var current = $(this).parent().next("dd");
                $(".accordion > dt > a").removeClass("active");
                $(this).addClass("active");
                allPanels.not(current).slideUp("easeInExpo");
                $(this).parent().next().slideDown("easeOutExpo");
                return false;
            });

         });

        var allToggles = $(".toggle > dd").hide();

        $(".toggle > dt > a").click(function(){
            if ($(this).hasClass("active")) {
                $(this).parent().next().slideUp("easeOutExpo");
                $(this).removeClass("active");
            }
            else {
                var current = $(this).parent().next("dd");
                $(this).addClass("active");
                $(this).parent().next().slideDown("easeOutExpo");
            }
            return false;
        });
        $(".video, .resp-media, .blog-media").fitVids();
        $(".work-full-media").fitVids();

    }

    function init_team(){

        $(".team-item").click(function(){
            if ($("html").hasClass("mobile")) {
                $(this).toggleClass("js-active");
            }
        });
    }
})(jQuery);
function initPageSliders(){
    (function($){
        "use strict";
        $(".fullwidth-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".fullwidth-slider-fade").owlCarousel({
            transitionStyle: "fadeUp",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".fullwidth-gallery").owlCarousel({
            transitionStyle: "fade",
            autoPlay: 5000,
            slideSpeed: 700,
            singleItem: true,
            autoHeight: true,
            navigation: false,
            pagination: false
        });

        $(".item-carousel").owlCarousel({
            autoPlay: 2500,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 1],
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".small-item-carousel").owlCarousel({
            autoPlay: 2500,
            stopOnHover: true,
            items: 6,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 3],
            itemsMobile: [480, 2],
            pagination: false,
            navigation: false,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".single-carousel").owlCarousel({
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".content-slider").owlCarousel({
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".photo-slider").owlCarousel({
            slideSpeed: 350,
            items: 4,
            itemsDesktop: [1199, 4],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".work-full-slider").owlCarousel({
            slideSpeed : 350,
            singleItem: true,
            autoHeight: true,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".blog-posts-carousel").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            items: 3,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            pagination: false,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".blog-posts-carousel-alt").owlCarousel({
            autoPlay: 3500,
            stopOnHover: true,
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            pagination: false,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

        $(".image-carousel").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            items: 4,
            itemsDesktop: [1199, 3],
            itemsTabletSmall: [768, 2],
            itemsMobile: [480, 1],
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });

          var sync1 = $(".fullwidth-slideshow");
          var sync2 = $(".fullwidth-slideshow-pager");

        $(".fullwidth-slideshow").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            transitionStyle: "fade",
            slideSpeed: 350,
            singleItem: true,
            autoHeight: true,
            pagination: false,
            navigation: true,
            navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            afterAction : syncPosition,
            responsiveRefreshRate : 200
        });
        $(".fullwidth-slideshow-pager").owlCarousel({
            autoPlay: 5000,
            stopOnHover: true,
            items: 8,
            itemsDesktop: [1199,8],
            itemsDesktopSmall: [979,7],
            itemsTablet: [768,6],
            itemsMobile: [480,4],
            autoHeight: true,
            pagination: false,
            navigation: false,
            responsiveRefreshRate : 100,
            afterInit : function(el){
              el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        function syncPosition(el){
            var current = this.currentItem;
            $(".fullwidth-slideshow-pager").find(".owl-item").removeClass("synced").eq(current).addClass("synced")
            if ($(".fullwidth-slideshow-pager").data("owlCarousel") !== undefined) {
                center(current)
            }
        }

        $(".fullwidth-slideshow-pager").on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

        function center(number){
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for (var i in sync2visible) {
                if (num === sync2visible[i]) {
                    var found = true;
                }
            }
            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                }
                else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            }
            else
                if (num === sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", sync2visible[1])
                }
                else
                    if (num === sync2visible[0]) {
                        sync2.trigger("owl.goTo", num - 1)
                    }
        }

        var owl = $(".fullwidth-slideshow").data("owlCarousel");

        $(document.documentElement).keyup(function(event){
            if (event.keyCode == 37) {
                owl.prev();
            }
            else
                if (event.keyCode == 39) {
                    owl.next();
                }
        });

        if ($(".owl-carousel").length) {
            var owl = $(".owl-carousel").data('owlCarousel');
            owl.reinit();
        }

    })(jQuery);
};
    var fm_menu_wrap = $("#fullscreen-menu");
    var fm_menu_button = $(".fm-button");

    function init_fullscreen_menu(){
        fm_menu_button.click(function(){
            if ($(this).hasClass("animation-process")){
                return false;
            }
            else{
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active").css("z-index", "2001").addClass("animation-process");;

                    fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function(){
                        fm_menu_wrap.fadeOut(function(){
                            fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                            fm_menu_button.css("z-index", "1030").removeClass("animation-process");

                        });
                    });
                    if ($(".owl-carousel").lenth) {
                        $(".owl-carousel").data("owlCarousel").play();
                    }
                }
                else {
                    if ($(".owl-carousel").lenth) {
                        $(".owl-carousel").data("owlCarousel").stop();
                    }
                    $(this).addClass("active").css("z-index", "2001").addClass("animation-process");

                    fm_menu_wrap.fadeIn(function(){
                        fm_menu_wrap.find(".fm-wrapper-sub").addClass("js-active");
                        fm_menu_button.removeClass("animation-process");
                    });
                }
                return false;
            }
        });

        $("#fullscreen-menu").find("a:not(.fm-has-sub)").click(function(){
            if (fm_menu_button.hasClass("animation-process")){
                return false;
            }
            else {
                fm_menu_button.removeClass("active").css("z-index", "2001").addClass("animation-process");
                fm_menu_wrap.find(".fm-wrapper-sub").fadeOut("fast", function(){
                    fm_menu_wrap.fadeOut(function(){
                        fm_menu_wrap.find(".fm-wrapper-sub").removeClass("js-active").show();
                        fm_menu_button.css("z-index", "1030").removeClass("animation-process");

                    });
                });
                if ($(".owl-carousel").lenth) {
                    $(".owl-carousel").data("owlCarousel").play();
                }
            }
        });
        var fmHasSub = $(".fm-has-sub");
        var fmThisLi;
        fmHasSub.click(function(){

            fmThisLi = $(this).parent("li:first");
            if (fmThisLi.hasClass("js-opened")) {
                fmThisLi.find(".fm-sub:first").slideUp(function(){
                    fmThisLi.removeClass("js-opened");
                    fmThisLi.find(".fm-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                });
            }
            else {
                $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                fmThisLi.addClass("js-opened");
                fmThisLi.find(".fm-sub:first").slideDown();
            }
            return false;
        });
    }

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


        if ($(".owl-carousel").lenth) {
            $(".owl-carousel").data("owlCarousel").play();
        }
    }

    function init_side_panel(){
        (function($){
            "use strict";
            sp_button.click(function(){
                side_panel.animate({
                    opacity: 1,
                    left: 0
                }, 500, "easeOutExpo");
                setTimeout(function(){
                    sp_overlay.fadeIn();
                }, 100);

                if ($(".owl-carousel").lenth) {
                    $(".owl-carousel").data("owlCarousel").stop();
                }
                return false;
            });

            sp_close_button.click(function(){
                sp_panel_close();
                return false;
            });
            sp_overlay.click(function(){
                sp_panel_close();
                return false;
            });

            $("#side-panel-menu").find("a:not(.sp-has-sub)").click(function(){
                if (!($(window).width() >= 1199)) {
                    sp_panel_close();
                }
            });

            var spHasSub = $(".sp-has-sub");
            var spThisLi;

            spHasSub.click(function(){

                spThisLi = $(this).parent("li:first");
                if (spThisLi.hasClass("js-opened")) {
                    spThisLi.find(".sp-sub:first").slideUp(function(){
                        spThisLi.removeClass("js-opened");
                        spThisLi.find(".sp-has-sub").find(".fa:first").removeClass("fa-angle-up").addClass("fa-angle-down");
                    });
                }
                else {
                    $(this).find(".fa:first").removeClass("fa-angle-down").addClass("fa-angle-up");
                    spThisLi.addClass("js-opened");
                    spThisLi.find(".sp-sub:first").slideDown();
                }
                return false;
            });

        })(jQuery);
    }

    function init_side_panel_resize(){
        (function($){
            "use strict";
             if ($(window).width() >= 1199){
               side_panel.css({
                   opacity: 1,
                   left: 0
               });
               $(".side-panel-is-left").css("margin-left", "270px");
               sp_button.css("display", "none");
               sp_close_button.css("display", "none");
             } else {
                 if (sp_close_button.is(":hidden")) {
                     side_panel.css({
                         opacity: 0,
                         left: -270
                     });
                     $(".side-panel-is-left").css("margin-left", "0");
                     sp_button.css("display", "block");
                     sp_close_button.css("display", "block");
                 }
             }
        })(jQuery);
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

function split_height_init(){
    (function($){
        $(".ssh-table, .split-section-content").css("height", "auto");
        if ($(window).width() > 992) {
            $(".split-section").each(function(){
                var split_section_height = $(this).find(".split-section-content").innerHeight();
                $(this).find(".ssh-table").height(split_section_height);
            });
        }
    })(jQuery);
}
