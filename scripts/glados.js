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
    var legal = document.getElementById('legal');
    var pointer = document.getElementById('pointer');
    var csharp = document.getElementById('csharpskill');
    var js = document.getElementById('jsskill');
    var php = document.getElementById('phpskill');
    var java = document.getElementById('javaskill');

    // Global Variables
    var clickCount = 0;

    //Functions
    function download_cv(){
        var w = window.open(cv_location, '_blank');
        w.focus();
    }

    function open_changelog(){
        window.location.href = "./changelog.html";
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
        // Manage Clickcount
        manage_clickcount();

        // Check if the circle is currently open
        var open = circle.classList.contains('large');

        // If it was closed, open it
        if(!open){
            circle.classList.add('large');
        } else {
            circle.classList.remove('large');
        }

        // Set height
        set_showcase_container_height(circle);
    }

    function set_showcase_container_height(skill){
        // Get the elements
        var showcase = skill.getElementsByClassName('showcase')[0];

        // Calculate the height
        var height = 0;
        if(showcase.parentNode.classList.contains('large')){
            var showcases = showcase.getElementsByTagName('article');
            for(var i=0;i<showcases.length;i++){
                var curr_case = showcases[i];
                height += curr_case.offsetHeight;
            }
        }

        // Set the height
        showcase.style.height = height + "px";
        showcase.parentNode.style.height = height + 100 + "px";
    }

    function recalculate_container_heights(){
        setTimeout(function(){
            set_showcase_container_height(csharp);
            set_showcase_container_height(js);
            set_showcase_container_height(php);
            set_showcase_container_height(java);
        }, 1000);
    }

    function manage_clickcount(){
        // Update the clickcount
        clickCount++;

        // Set the pointer
        if(clickCount === 1){
            pointer.innerHTML = "Good. Now click it again! <div></div>";
        }
        if(clickCount === 2){
            pointer.innerHTML = "Ok, if you click <u>me</u> in the next 5 seconds, I'll disappear forever on this browser!<div></div>";
            pointer.addEventListener("click", function(){
                pointer.style.display = "none";
                if(localStorage){
                    localStorage.setItem("clicked", "true");
                }
            }, true);
            setTimeout(function(){
                pointer.style.opacity = 0;
                setTimeout(function(){pointer.style.display = "none";}, 1000);
            }, 7500);
        }
    }

    function startupScript(){
        //Event Listeners
        btn_cv.addEventListener("click", function(){download_cv();}, false);
        arrow_left.addEventListener("click", function(){goto_previous_slideshow_item();}, true);
        arrow_right.addEventListener("click", function (){goto_next_slideshow_item();}, true);
        legal.addEventListener("click", function(){open_changelog();}, true);
        window.addEventListener("orientationchange", function(){recalculate_container_heights();}, false);

        //Multiple Listeners
        for(var i=0; i<circles.length; i++){
            circles[i].addEventListener("click", function(){show_showcase(this.parentElement);}, true);
        }

        // Execute Given Functions
        if(localStorage){
            if(localStorage.getItem('clicked') !== undefined && localStorage.getItem('clicked') === "true"){
                pointer.style.display = "none";
            } else {
                pointer.style.display = "inline-block";
            }
        }
    }

    // Startup Functions
    startupScript();
})();