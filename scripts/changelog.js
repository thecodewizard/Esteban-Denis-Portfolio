(function(){
    "use strict";

    // Elements
    var orb = document.getElementsByClassName('orb')[0];

    // Functions
    function hide_orb(){
        if(!orb.classList.contains('hidden')){
            orb.classList.add('hidden');
        }
    }

    function show_orb(){
        if(orb.classList.contains('hidden')){
            orb.classList.remove('hidden');
        }
    }

    function assess_page(){
        var position = window.pageYOffset;
        if(position > 420){
            show_orb();
        } else {
            hide_orb();
        }
    }

    function scroll_to_top() {
        var height = window.pageYOffset;
        scrollDown(height, 0);
    }

    function scrollDown(height, Goal){
        if(height >= (Goal - 9)){
            setTimeout(function() {
                document.body.scrollTop = height; // For Chrome, Safari and Opera
                document.documentElement.scrollTop = height; // For IE and Firefox
                scrollDown(height - 10, Goal);
            }, 1);
        }
    }

    // EventListerers
    window.addEventListener("scroll", function(){assess_page();}, false);
    orb.addEventListener("click", function(){scroll_to_top();}, true);
})();