window.delay = 2000;

$(function() {
    "use strict";
    var $divs = $(".text div");
    
    var showAndQueue = function(index) {
        $divs.eq(index - 1).fadeOut( 400, function() {
            $divs.eq(index).fadeIn();
        });

        if(index < $divs.length - 1)
        {
            setTimeout(function(){ showAndQueue(index + 1); }, window.delay);
        }
    };

    setTimeout(function(){ showAndQueue(1); }, window.delay);
});

