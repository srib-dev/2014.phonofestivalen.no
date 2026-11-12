/*
|--------------------------------------------------------------------------
| Back To Top
|--------------------------------------------------------------------------
|
|
|
*/

(function($) {

    $.fn.backToTop = function(options){

        var self = this;

        // Default settings
        var settings = $.extend({

            // Default position and speed
            position: 1000,
            speed: 500

        }, options);

        // Settings
        var position = settings.position;
        var speed = settings.speed;
        var placement = settings.placement;

        // Center the back to top div on the page
        self.css({
            'right': 300
            // 'left': $(document).width() / 2 - self.width() / 2
        });

        $(document).scroll(function(){
            var scrollPos = $(window).scrollTop();

            if (scrollPos >= position) {
                // Show back to top button
                self.fadeIn(speed);

            } else {
                // Hide back to top button
                self.fadeOut(speed);
            }

        });

        // Click back to top button
        self.click(function(){
            $('html, body').animate({scrollTop:0},speed);
        });

    };

})(jQuery);
