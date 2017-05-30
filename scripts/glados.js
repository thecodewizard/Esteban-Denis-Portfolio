(function(){
    "use strict";

    //Static Variables
    var cv_location = "./media/download/CV.esteban.denis.pdf";

    //Elements
    var body = document.getElementsByTagName('body')[0];
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
    var profile_pictures = document.getElementById('profile-pictures');
    var header = document.getElementsByTagName('header')[0];
    var aboutme = document.getElementById('aboutme');
    var history = document.getElementById('history');
    var transition = document.getElementsByClassName('transition')[0];
    var future = document.getElementById('future');
    var defh = document.getElementsByClassName('definition-holder')[0];
    var arc = document.getElementsByClassName('arrowholder')[0];
    var sc = document.getElementById('showcase');
    var showcases = sc.getElementsByTagName('article');
    var internship = document.getElementById('internship');
    var plane = document.getElementById('plane');

    //Browser Dectection Fields
        // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';
        // Safari 3.0+ "[object HTMLElementConstructor]"
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
        // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
        // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;
        // Chrome 1+
            var isChrome = !!window.chrome && !!window.chrome.webstore;
        // Blink engine detection
            var isBlink = (isChrome || isOpera) && !!window.CSS;

    //Easter Egg Slogans
    var slogans = ["Hakuna Matata",
        "Piracy is a crime!",
        "A cheesy subtitle that makes you like me",
        "Nobody pays attention to subtitles",
        "The cake is a lie",
        "A large big Mac Menu and diet coke on the go please",
        "I like my slogans like I like my pizzas. Super Cheesy.",
        "I could have sworn that this slogan was different the last time I was here...",
        "Insert an extremely inappropriate quote for this website",
        "Uploading Virus",
        "Watch out - The NSA is watching you <i>(No we're not.)</i>",
        "Madness? This is not madness. This Is A Website! *epic kick*"];

    // Global Variables
    var clickCount = 0;

    //Functions
        //BTN Functions
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

                    //Preload the images
                    preloadInternshipImages(i);
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

                    //Preload the images
                    preloadInternshipImages(i);
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

        function show_showcase_pc(showcase){
            var clicked = showcase.classList.contains('active');

            //Disable all other showcases
            for(var i=0; i<showcases.length; i++){
                if(showcases[i].classList.contains('active'))
                    showcases[i].classList.remove('active');
            }

            //Active current
            if(!clicked) showcase.classList.add('active');
        }

        //Auto Functions
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

        function profile_picture_slideshow(){
            var imgs = profile_pictures.getElementsByTagName('img');
            setTimeout(function(){
                move_to_next_img(imgs, 0)
            }, 6000);
        }

        function move_to_next_img(images, activeIndex){
            // Set the variables
            var curr_img = images[activeIndex];
            var nxt_img, nxt_ai;

            // Find the indexes
            if(activeIndex === (images.length - 2)){
                //The last image is active, set the first active
                nxt_img = images[1];
                nxt_ai = 1;
            } else {
                //Else set the next image active
                nxt_img = images[activeIndex + 1];
                nxt_ai = activeIndex + 1;
            }

            // Preload the image that is next in queue.
            preloadImage(images[nxt_ai + 1]);

            // Do the change
            if(curr_img.classList.contains('focus')) curr_img.classList.remove('focus');
            if(!nxt_img.classList.contains('focus')) nxt_img.classList.add('focus');

            // Set the timeout
            setTimeout(function(){
                move_to_next_img(images, nxt_ai);
            }, 6000);
        }

        var mini_height = header.offsetHeight;
        var nano_height = mini_height + aboutme.offsetHeight + history.offsetHeight + 500;
        function set_header_while_scrolling(height){
            if(height > nano_height){
                if(!header.classList.contains('nano'))
                    header.classList.add('nano');
            } else if(height > mini_height){
                if(header.classList.contains('nano'))
                    header.classList.remove('nano');
                if(!header.classList.contains('mini'))
                    header.classList.add('mini');
            } else {
                if(header.classList.contains('nano'))
                    header.classList.remove('nano');
                if(header.classList.contains('mini'))
                    header.classList.remove('mini');
            }
        }

        function set_fixed_header_height(height){
            var targetheight = height - aboutme.offsetHeight - 125;
            if(targetheight > 0){
                header.style.top = "-" + targetheight + "px";
            } else {
                header.style.top = 0;
            }
        }

        function set_fixed_plane_height(height){
            var startheight = internship.offsetTop + 1000;
            var endheight = future.offsetTop + 450;

            if((height > (startheight - 50)) && (height < endheight)){
                var diff = height - startheight;
                document.getElementsByClassName('subtitle')[0].style.top = diff + "px";
                plane.style.top = diff + "px";
            }
        }

        function easter_egg_slogan(visitNr){
            // Add to visit
            localStorage.setItem('egg', visitNr + 1);

            // Make sure that we do not accidently easter egg our 'first impression'
            if(visitNr > 5){
                var rand = Math.random();
                if(rand > 0.99){
                    var itemnr = Math.floor(Math.random()*slogans.length);
                    var slogan = slogans[itemnr];
                    var elements = document.getElementsByClassName('slogan');
                    for(var i=0; i<elements.length; i++){
                        var target = elements[i].getElementsByTagName('span')[0];
                        target.innerHTML = slogan;
                    }
                }
            }
        }

        function set_future_max(height){
            if ((window.innerHeight + height >= document.body.scrollHeight)){
                if(!future.classList.contains('max'))
                    future.classList.add('max');
            } else {
                if(future.classList.contains('max'))
                    future.classList.remove('max');
            }
        }

        function remove_future_arrow(){
            arc.style.opacity = 0;
            defh.removeEventListener("scroll", remove_future_arrow, true);
        }

        function enableBrowsersupport(){
            if(isFirefox || isEdge || isIE){
                var transitions = document.getElementsByClassName("transition");
                for(var t=0;t<transitions.length;t++){
                    if(!transitions[t].classList.contains('browsersupport'))
                        transitions[t].classList.add('browsersupport');
                }
            }

            if(isEdge || isIE){
                if(!plane.classList.contains('browsersupport'))
                    plane.classList.add('browsersupport');

                var slideshowitems = document.getElementsByClassName("slideshow-item");
                for(var s=0;s<slideshowitems.length;s++){
                    if(slideshowitems[s].hasAttribute('data-size') && !slideshowitems[s].classList.contains('browsersupport')){
                        slideshowitems[s].classList.add('browsersupport');
                    }
                }
            }

            if(body.offsetWidth > 1200 && isIE){
                if(!sc.classList.contains('browsersupport'))
                    sc.classList.add('browsersupport');
            }
        }

        // Image loading
        function preloadImages(){
            // Get all the images
            var images = document.getElementsByTagName('img');
            for(var i=0;i<images.length;i++){
                var image = images[i];

                // Do not preload the invisible internship images or profile pictures
                var isProfilePicture = image.parentNode.id === "profile-pictures";
                var isInternshipPicture = image.parentNode.classList.contains('slideshow-item');
                var isActiveInternshipPicture = image.parentNode.classList.contains('visible');

                if((!isProfilePicture && !isInternshipPicture) || isActiveInternshipPicture)
                    preloadImage(images[i]);
            }

            // Preload the current active profilepictures
            var current = profile_pictures.getElementsByClassName('focus')[0];
            if(body.offsetWidth >= 768){
                preloadImage(current);
                preloadImage(current.previousElementSibling);
                preloadImage(current.nextElementSibling);
            } else {
                preloadImage(current)
            }

            preloadInternshipImages(0); // Given that the active image is the first in the list by default
        }

        function preloadInternshipImages(i){
            // Preload the correct images
            if((i + 1) >= slideshow_items.length){
                preloadImage(slideshow_items[0].getElementsByTagName('img')[0]);
            } else {
                preloadImage(slideshow_items[i + 1].getElementsByTagName('img')[0]);
            }
            if((i - 1) < 0){
                preloadImage(slideshow_items[slideshow_items.length - 1].getElementsByTagName('img')[0]);
            } else {
                preloadImage(slideshow_items[i - 1].getElementsByTagName('img')[0]);
            }
        }

        function preloadImage(image)
        {
            // Set Timeout for Async Behaviour.
            setTimeout(function(){
                // Load image if a source is supplied.
                if(image.hasAttribute("data-src")){
                    var url = image.getAttribute("data-src");

                    // Only load if the requested source is not yet applied to the image.
                    if(url !== image.src){
                        var img = new Image();
                        img.src=url;
                        img.onload = function(){
                            image.src = img.src;
                        };
                    }
                }
            }, 0);
        }

        // General Functions
        function startupScript(){
            //Event Listeners
            btn_cv.addEventListener("click", function(){download_cv();}, false);
            arrow_left.addEventListener("click", function(){goto_previous_slideshow_item();}, true);
            arrow_right.addEventListener("click", function (){goto_next_slideshow_item();}, true);
            legal.addEventListener("click", function(){open_changelog();}, true);
            window.addEventListener("orientationchange", function(){recalculate_container_heights();}, false);
            window.addEventListener("scroll", function(){scrollingScripts();}, false);

            // Execute Given Functions based on screen width
            if(body.offsetWidth >= 768){
                //Functions for tablets or bigger
                profile_picture_slideshow();
                window.addEventListener("orientationchange", function(){set_header_while_scrolling(0);}, false);
                nano_height = nano_height + 500;

                for(var j=0; j<showcases.length; j++){
                    if(!showcases[j].hasAttribute('data-noclick'))
                        showcases[j].addEventListener('click', function(){show_showcase_pc(this);}, true);
                }

                if(localStorage){
                    if(localStorage.getItem('egg') !== undefined && !isNaN(parseInt(localStorage.getItem('egg')))){
                        easter_egg_slogan(parseInt(localStorage.getItem('egg')));
                    } else {
                        localStorage.setItem('egg', 0);
                    }
                }
            } else {
                //Listeners for mobile
                defh.addEventListener("scroll", remove_future_arrow, true);
                for(var i=0; i<circles.length; i++){
                    circles[i].addEventListener("click", function(){show_showcase(this.parentElement);}, true);
                }

                //Functions for mobile
                if(localStorage){
                    if(localStorage.getItem('clicked') !== undefined && localStorage.getItem('clicked') === "true"){
                        pointer.style.display = "none";
                    } else {
                        pointer.style.display = "inline-block";
                    }
                }
            }

            // Execute functions for all viewports
            enableBrowsersupport();
            preloadImages();
        }

        function scrollingScripts(){
            // var yscroll = body.scrollTop;
            var yscroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            set_header_while_scrolling(yscroll);
            set_future_max(yscroll);

            if(body.offsetWidth >= 1200){
                set_fixed_header_height(yscroll);
                set_fixed_plane_height(yscroll);
            }
        }

    // Startup Functions
    startupScript();
})();