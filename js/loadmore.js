/*
|--------------------------------------------------------------------------
| LoadMore
|--------------------------------------------------------------------------
|
| Loads more content dynamically via ajax.
| Uses the Handlebars.js library for templating
|
| Example:
|	$('ParentSelector').loadmore({
|		source: PostSource,
|		step: Number of items,
|		templ: $("HandleBarsTemplate"),
|		loadMoreBtn: $("Load More Button")
|	});
|
*/

(function($){

    "Use strict";

    $.fn.loadmore = function(options){

        var self = this,

            settings = $.extend({
                source: '',
                templ: '',
                step: 2
            }, options),

            stepped = 1,

            finished = function() {
                // Hide the load more button
                settings.loadMoreBtn.remove();
            },

            dispatch = function(data) {
                // Create the template
                var template = Handlebars.compile(settings.templ.html());
                self.append(template(data));
            },

            load = function(start, count) {
                $.ajax({
                    url: settings.source,
                    type: 'POST',
                    dataType: 'json',
                    data: {start: start, count: count},
                    success: function(data){

                        var items = data.items;

                        if (items.length) {
                            dispatch(items);

                            stepped = stepped + count;
                        }

                        if (data.last === true) {

                            finished();
                        }
                    }
                });
            };

        if (settings.source.length) {

            settings.loadMoreBtn.on('click', function(){
                load(stepped, settings.step);
                return false;
            });

            load(1, settings.step);

        } else {
            console.log('Source required for loadmore.');
        }

    }; 

}(jQuery));
