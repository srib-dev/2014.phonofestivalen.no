/*
|--------------------------------------------------------------------------
| Flickr Gallery
|--------------------------------------------------------------------------
|
|
*/

(function($){
    $.fn.flickrGallery = function(options){

        var self = this,

            settings = $.extend({

                key: '',
                userID: ''

            }, options);

            // Run ajax call
            loadFlickr = function(type, url) {

                if (type == 'collections') {

                    // Load collections by year
                    $.getJSON(url, function(data) {

                        // Dispatch collection sets
                        dispatch('collections', data.collections.collection);

                    });

                } else if (type == 'albums') {

                    // Load albums in the selected collection
                    $.getJSON(url, function(data) {

                        // Loop through collection
                        $.each(data.collections.collection, function(collectionObj, collectionData) {

                            // Loop through each set in the collection
                            $.each(collectionData.set, function(setObj, setData) {

                                // Run ajax call to collect photoset information
                                var url = 'api.flickr.com/services/rest/?method=flickr.photosets.getInfo&api_key='+settings.key+'&photoset_id='+setData.id+'&format=json&jsoncallback=?';

                                $.getJSON(url, function(data) {
                                    dispatch('albums', data);
                                });
                            });

                        });

                    });

                } else if (type == 'photos') {

                    // Load photos in the selected album
                    $.getJSON(url, function(data) {
                        dispatch('photos', data);
                    });
                }

            }

            // Display
            dispatch = function(type, data) {
                if (type == 'collections') {
                    // Display collections
                    var templ = self.find("#collection-template");
                }

                if (type == 'albums') {
                    // Display albums in collection
                    var templ = self.find("#album-template");
                }

                if (type == 'photos') {
                    // Display photos in album
                    var templ = self.find("#photos-template");
                }

                var template = Handlebars.compile(templ.html());
                self.append(template(data));
            };

        if (settings.key.length) {

            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');

            for (var i = 0; i < sURLVariables.length; i++) {

                var sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] == '') {

                    // Load collections
                    var type = 'collections';
                    var url = 'api.flickr.com/services/rest/?method=flickr.collections.getTree&api_key='+settings.key+'&user_id='+settings.userID+'&format=json&jsoncallback=?';

                } else if (sParameterName[0] == 'collection') {

                    // Load albums
                    var type = 'albums';
                    var url = 'api.flickr.com/services/rest/?method=flickr.collections.getTree&api_key='+settings.key+'&collection_id='+sParameterName[1]+'&user_id='+settings.userID+'&format=json&jsoncallback=?';

                } else if (sParameterName[0] == 'album') {

                    // Load photos in album
                    var type = 'photos';
                    var url = 'api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key='+settings.key+'&photoset_id='+sParameterName[1]+'&format=json&jsoncallback=?';
                }
            }

            // Load Flickr
            loadFlickr(type, url);

        } else {
            console.log('Key is required for flickrGallery');
        }
    };
}(jQuery));
