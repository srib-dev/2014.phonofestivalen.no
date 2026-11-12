(function($){

    $.fn.PostForm = function(callback){

        // Show ajax Loader
        $(".loader").show();

        // Store the fields in an object
        var fields = {};
        var a = this.serializeArray();

        // Fetch all the inputs from the form
        $.each(a, function(){
            if (fields[this.name] !== undefined) {
                if (!fields[this.name].push) {
                    fields[this.name] = [fields[this.name]];
                }
                fields[this.name].push(this.value || '');

            } else {
                fields[this.name] = this.value || '';
            }
        });

        // Run ajax
        $.ajax({
            url: $("form").attr('action'),
            type: 'POST',
            data: fields,
            success: function(data){

                // Message div
                var messageDiv = $(".jquery-message");

                // Hide the loader
                $(".loader").hide();

                // Empty the spans and message div
                $("span.input-error").empty();
                $(messageDiv).empty();
                $(messageDiv).removeClass().addClass('jquery-message');

                var result = $.parseJSON(data);

                // Validation passed
                if (result.success) {

                    // Display message if any
                    if (result.message_class)
                    {
                        $(messageDiv).addClass(result.message_class+'-message');
                        $(messageDiv).append(result.success);
                        $(messageDiv).show();
                        $(messageDiv).delay(2400).slideUp(200);
                    }

                    // Set a new token
                    $("input#token").val(result.token);

                    // Run custom callback function
                    if (typeof callback == 'function') {
                        callback.call(this);
                    }
                }

                // Validation failed
                if (result.validation_failed) {

                    $.each(result.validation_failed, function(i, element) {

                        $("input#"+i).addClass('input-error');
                        $("input#"+i).after('<span class="input-error">*'+element+'</span>');
                    });

                    // Set a new token
                    $("input#token").val(result.token);
                }

                // Other error
                if (result.failed) {

                    // Set alert message
                    $(messageDiv).addClass(result.message_class+'-message');
                    $(messageDiv).append(result.failed);
                    $(messageDiv).show();
                    $(messageDiv).delay(2400).slideUp(200);

                    // Set a new token
                    $("input#token").val(result.token);
                }

            }
        });

        return false;
    }; 

}(jQuery));
