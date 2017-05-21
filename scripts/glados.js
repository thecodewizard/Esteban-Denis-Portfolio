(function(){
    "use strict";

    //Static Variables
    var cv_location = "./media/download/CV.esteban.denis.pdf";

    //Elements
    var btn_cv = document.getElementById("download_cv");
    var slideshow_items = document.getElementsByClassName('slideshow-item');
    var arrow_left = document.getElementsByClassName('slideshow')[0].getElementsByClassName('arrow-left')[0];
    var arrow_right = document.getElementsByClassName('slideshow')[0].getElementsByClassName('arrow-right')[0];
    var circles = document.getElementsByClassName('circle');

    //Functions
    function download_cv(){
        var w = window.open(cv_location, '_blank');
        w.focus();
    }

    function goto_next_slideshow_item(){
        var visible = 0;
        for(var i=0; i<slideshow_items.length; i++){
            if(visible === 0 && slideshow_items[i].classList.contains('visible')){
                //Find the item that is currently visible and set invisible.
                slideshow_items[i].classList.remove('visible');
                visible = 1;
            } else if (visible === 1){
                //The loop after the current item was set invisible, set the item visible.
                slideshow_items[i].classList.add('visible');
                visible = 2;
            }
        }
        //If the item that was set invisible was the last in the loop, set the first visible
        if(visible === 1) slideshow_items[0].classList.add('visible');
    }

    function goto_previous_slideshow_item(){
        var visible = 0;
        for(var i=slideshow_items.length; i > 0; i--){
            if(visible === 0 && slideshow_items[i - 1].classList.contains('visible')){
                //Find the item that is currently visible and set invisible.
                slideshow_items[i - 1].classList.remove('visible');
                visible = 1;
            } else if (visible === 1){
                //The loop after the current item was set invisible, set the item visible.
                slideshow_items[i - 1].classList.add('visible');
                visible = 2;
            }
        }
        //If the item that was set invisible was the last in the loop, set the last visible
        if(visible === 1) slideshow_items[slideshow_items.length - 1].classList.add('visible');
    }

    function show_showcase(circle){
        // Check if the circle is currently open
        var open = circle.classList.contains('large');

        // Close everything.
        close_all_showcases();

        // If it was closed, open it
        if(!open){
            circle.classList.add('large');
        }
    }

    function close_all_showcases(){
        for(var i=0; i<circles.length; i++){
            if(circles[i].parentElement.classList.contains('large'))
                circles[i].parentElement.classList.remove('large');
        }
    }

    //Event Listeners
    btn_cv.addEventListener("click", function(){download_cv();}, false);
    arrow_left.addEventListener("click", function(){goto_previous_slideshow_item();}, true);
    arrow_right.addEventListener("click", function (){goto_next_slideshow_item();}, true);

    //Multiple Listeners
    for(var i=0; i<circles.length; i++){
        var circle = circles[i];
        circles[i].addEventListener("click", function(){show_showcase(this.parentElement);}, true);
    }

})();