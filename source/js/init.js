document.body.classList.add("js");
document.body.classList.remove("no-js");

//-------------------------------
//
// Helper Functions
//
//-------------------------------

jQuery.fn.cssNumber = function(prop){
    var v = parseInt(this.css(prop),10);
    return isNaN(v) ? 0 : v;
};

//-------------------------------
//
// Header Stuff
//
//-------------------------------

//Toggle Nav

var nav = $("nav");

function mobileNavToggle(e){
	e.preventDefault();
	if(nav.hasClass("nav--open")){
		nav.removeClass("nav--open");
	}else{
		nav.addClass("nav--open");
	}
}

$("#nav-toggle").click(mobileNavToggle);

//Toggle SubnavMobile

// function mobileSubnavToggle(e){
// 	e.preventDefault();

// 	var target = $(e.target);
// 	var subnav;
// 	if(target.hasClass("subnav-list")) subnav = target;
// 	else subnav = target.siblings(".subnav-list");

// 	if(subnav.hasClass("subnav-list--open")){
// 		subnav.removeClass("subnav-list--open");
// 	}else{
// 		nav.find(".subnav-list--open").removeClass("subnav-list--open");
// 		subnav.addClass("subnav-list--open");
// 	}
// }

// $(".nav-list > li").click(mobileSubnavToggle);

//100% Width Submenu
function openSubnav(e){
	var target = $(e.target);
	var subnav;
	if(target.is("li")) subnav = target.find(".subnav-list");
	else subnav = target.siblings(".subnav-list");
	subnav.addClass("subnav-list--open");
	if(subnav.css("left") == "0px"){
		subnav.attr("style", "");
		calcSubnavSize();
	}
}

function closeSubnav(e){
	var target = $(e.currentTarget);
	var subnav;
	subnav = target.find(".subnav-list");
	subnav.removeClass("subnav-list--open");
}

function calcSubnavSize(){
	var subnav = $(".subnav-list--open");
	if(subnav.length == 0) return false;

	var off = subnav.offset();

	subnav.css("left", "-"+off.left+"px");
	subnav.css("padding-left", off.left+"px");

	var width = $(window).width();
	var right = width - off.left - subnav.find("li").cssNumber("width");
	subnav.css("width", width+"px");
	subnav.css("padding-right", right+"px");
}

$(".nav-list > li").hover(openSubnav, closeSubnav);

//-------------------------------
//
// Reset on Resize
//
//-------------------------------

function reset(e){

	//Subnav
	nav.find(".subnav-list--open").removeClass("subnav-list--open"); 
	nav.find(".subnav-list").attr("style", "");

	//Mainnav
	if(nav.hasClass("nav--open")) nav.removeClass("nav--open");

	//Parallax
	$(".parallax").each(function(i){
		ele = $(this);
		if(ele.find(".parallax-image").css("display") == "none"){
			ele.unbind("click", animateParallax);
			ele.bind("click", animateParallax);
		}else{
			ele.unbind("click", animateParallax);
		}
	});
}

$(window).resize(reset);


//-------------------------------
//
// Parallax
//
//-------------------------------

function animateParallax(e){
	var parallax = $(e.currentTarget);
	parallax.unbind("click", animateParallax);
	console.log("click");

	var width = $(window).width();

	if(width > 1920){
		var movement = "-="+ (Math.floor(width / 1920 * 1360) - 1200) +"px";
	}else var movement = "-=160px";

	parallax.velocity({
		"background-position-y": movement
	}, {
    duration: 400,
    easing: "swing",
    complete: 
    	function(ele){ 
				$(ele).velocity("reverse");
				$(ele).bind("click", animateParallax); 
			}
	});
}

$(".parallax").each(function(i){
	ele = $(this);
	if(ele.find(".parallax-image").css("display") == "none")
		ele.bind("click", animateParallax);
});

//-------------------------------
//
// Parallax Event Arrows
//
//-------------------------------

function checkArrows(e){
	$(e.currentTarget).unbind("scroll", checkArrows);
	var scrolledContainer = $(e.currentTarget),
			parent = scrolledContainer.closest(".parallax--events"),
			scroll = scrolledContainer.scrollLeft(),
			left = parent.find(".parallax-arrow--left"),
			right = parent.find(".parallax-arrow--right"),
			max = 0;

	//scrolledContainer.scrollLeft(scrolledContainer.children(".parallax-events-scrolling").width());
	max = e.currentTarget.scrollWidth - e.currentTarget.clientWidth;
	scrolledContainer.scrollLeft(scroll);
	console.log(max);

	if(scroll == 0) left.hide();
	else if(left.is(":hidden")) left.show();

	if(scroll == max) right.hide();
	else if(right.is(":hidden")) right.show();

	scrolledContainer.bind("scroll", checkArrows);
}

function addScrollLeft(e){
	var parent = $(e.currentTarget).closest(".parallax--events"),
			scrollContainer = parent.find(".parallax-events");

	scrollContainer.unbind("scroll", checkArrows);
	scrollContainer.animate({ scrollLeft: scrollContainer.scrollLeft() + 300 }, 300, "swing", function(){
		$(this).bind("scroll", checkArrows);
	});
	//scrollContainer.scrollLeft(scrollContainer.scrollLeft() + 100);
}

function subScrollLeft(e){
	var parent = $(e.currentTarget).closest(".parallax--events"),
			scrollContainer = parent.find(".parallax-events");

	scrollContainer.unbind("scroll", checkArrows);
	scrollContainer.animate({ scrollLeft: scrollContainer.scrollLeft() - 300 }, 300, "swing", function(){
		$(this).bind("scroll", checkArrows);
	});
	//scrollContainer.scrollLeft(scrollContainer.scrollLeft() - 100);
}

$(".parallax-arrow--left").click(subScrollLeft);
$(".parallax-arrow--right").click(addScrollLeft);

$(".parallax-events").bind("scroll", checkArrows);

//-------------------------------
//
// Scroll to Top
//
//-------------------------------

function toTop(e){
	$("html").velocity("scroll", 200);
}

$(".to-top").click(toTop);


