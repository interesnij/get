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
        init_wow();
    });

    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += " no-touch";
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
})(jQuery);
