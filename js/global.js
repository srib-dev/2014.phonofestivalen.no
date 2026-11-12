/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
|
|
*/

// Base URL
var pathArray = window.location.href.split( '/' );
var protocol = pathArray[0];
var host = pathArray[2];
var url = protocol + '//' + host + '/';
var baseUrl = url;



/*
|--------------------------------------------------------------------------
| Document Ready
|--------------------------------------------------------------------------
|
|
*/

$(document).ready(function(){

    // Alert messages
    if ($(".alert-message").css("display") != 'none')
    {
        $(".alert-message").delay(2000).slideUp(200);
    }

    // Cookie Banner
    if ($("#cookie-banner").length) {
        $("#cookie-banner").slideDown(800);
    }

    // Accept cookie policy
    $("#cookie-banner-accept-close").on('click', function(e){
        e.preventDefault();

        $.ajax({
            url: $("#cookie-banner-accept-close").attr('href'),
            type: 'POST',
            data: {'token': $("input#token").val()},
            success: function(data){
                // Hide cookie banner
                $("#cookie-banner").slideUp();
            }
        });
    });

    // Artist grid image sizing (formerly publicScript.js)
    if ($.fn.imgLiquid && $(".imgLiquidFill").length) {
        $(".imgLiquidFill").imgLiquid({
            verticalAlign: 'top',
            horizontalAlign: 'center',
            onItemFinish: function (index, container, img) {
                var el = img && img[0];
                if (!el || !el.naturalHeight) {
                    return;
                }
                // Wide transparent wordmarks (Beglomeg, Fay Wildhagen, and the
                // same set) disappear if cover-cropped on a clear tile.
                if (el.naturalWidth / el.naturalHeight > 2.2) {
                    container.css({
                        "background-size": "contain",
                        "background-position": "center center",
                        "background-color": "#2c25a2"
                    });
                }
            }
        });
    }

    // Main nav icon hover swap
    $("#menuData a").hover(
        function () {
            var hover = $(this).find("input.nav-icon-hover").val();
            if (hover) {
                $(this).find("img").first().attr("src", hover);
            }
        },
        function () {
            var def = $(this).find("input.nav-icon-default").val();
            if (def) {
                $(this).find("img").first().attr("src", def);
            }
        }
    );

    // Mobile menu toggle
    $("a.menulink").on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        $("#menuBar").slideToggle(200);
    });

});

/*
|--------------------------------------------------------------------------
| Reset Form Element
|--------------------------------------------------------------------------
|
|
*/
function resetFormElement(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}

/*
|--------------------------------------------------------------------------
| Scroll To Function
|--------------------------------------------------------------------------
|
|
*/
function goToByScroll(id) {
    $('html,body').animate({
        scrollTop: $(id).offset().top},
    'slow');
}