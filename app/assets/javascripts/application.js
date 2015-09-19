//= require angular
//= require angular-rails-templates
//= require angular-ui-router
//= require angular-devise/lib/devise
//= require angular-devise
//= require textAngular/dist/textAngular.min
//= require textAngular/dist/textAngular-sanitize.min
//= require textAngular/dist/textAngular-rangy.min
//= require classie
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {

var navTrigger = document.getElementById('nav-trigger');
var nav = document.getElementById('nav');
var header = document.getElementById('header');
var heading = document.getElementById('heading');
var labels = document.getElementsByClassName('nav-label');

// sizing
var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var fontSize = windowHeight*0.1;
var headingSize = windowWidth*0.1;

// Event Listening
navTrigger.addEventListener('click', navToggle);


function navToggle(e) {
  var closed = (navTrigger.className.indexOf('close') > 0); 
  if(closed) {
    console.log('open')
    navTrigger.className = 'nav-trigger open';
    nav.className = 'out';
  } else {
    console.log('close')
    navTrigger.className = 'nav-trigger close';
    nav.className = 'in';
  }
}
})

$(document).on('ready', '.big-thing', function() {
  $('.big-thing').css('height')
})

$(window).scroll(function(){
  var position = $(this).scrollTop();
  $('.imgHolder img').css({top:position/2});
});

$('.header').on('click','',function(){
    var top = $('section').first().position().top;
   $("html, body").animate({
                            scrollTop: top}, {easing: "swing", duration: 800
                           });

  // $('.hidden-first').fadeIn()
});

$(document).on('click', '.nav-label a', function() {
  console.log('over here')
  $('.nav-trigger').click()
})

$(document).on('click', '.exercise-tab', function() {
  $(this).addClass('moved')
  $('.exercises-container').addClass('moved-container')
})

$(document).on('click', '.moved.exercise-tab', function() {
  $(this).removeClass('moved')
  $('.exercises-container').children().show();
  $('.exercises-container').removeClass('moved-container')
})

$(document).on('click', 'u', function() {
  var keyWord = $(this).text()
  $('.exercises-container').children().hide()
  $('.exercises-container').children().find('p[data-keyword="' +  keyWord + '"]').parent().show()  
  $('.exercise-tab').addClass('moved')
  $('.exercises-container').addClass('moved-container')
})


'use strict';
// Abandon all hope ye who enter here
$(document).ready(function() {
  
  var navigating = true,
      curPage = 1,
      pages = $(".section").length,
      $sections = $(".sections"),
      $paginationPage = $(".pagination .page"),
      $paginationTotal = $(".total-pages"),
      $textStuff = $(".section-heading, .additional-text");
  
  if (pages >= 10) {
    $paginationTotal.text(pages);
  } else {
    $paginationTotal.text("0" + pages);
  }
  
  /*
  Sets random transition-delay for blocks between 0.4 and 1.2 seconds on every call
  */
  function randomDelay() {
    $(".left-part").css("transition-delay", (Math.floor(Math.random() * 9) + 4)/10 + "s");
    for (var i = 1; i <= pages; i++) {
      $(".bg-part:nth-child("+i+")").css("transition-delay", (Math.floor(Math.random() * 9) + 4)/10 + "s");
    }
  }
  
  /* Async hell, with hardcoded numbers.
  On production, 410 number must be .section-heading transform transition time in miliseconds + 10, but i'm sort of tired of this demo :D
  */
  function timeoutNav(t) {
    var time = t || 2000;
    $textStuff.addClass("not-visible");
    setTimeout(function() {
      navigating = false;
      randomDelay();
    }, time);
    setTimeout(function() {
      // cached selector not working because of newely created clone when moving up more then 2 positions
      $(".section-heading, .additional-text").css({"margin-top": 0 - (parseInt($(".nav-elem.active").attr("data-page")) - 1) * 100 + "vh"}).hide();
    }, 410);
    setTimeout(function() {
      $textStuff.show();
      $textStuff.css("top");
      $textStuff.removeClass("not-visible");
      
      $(".section-heading").hide()
      $(".section-heading[data-page='" + (curPage) + "']").show()
      if (curPage === 3) {
        $('.main').fadeOut()
        $(".section-heading[data-page='" + (curPage) + "']").fadeOut()
        $(".final-page").fadeIn()
      }
    }, time + 10);
  }
  
  function magicStuff(paramPage) {
    if (paramPage) curPage = paramPage;
    navigating = true;
    var calculatedMargin = 0 - (curPage - 1) * 100;

    $(".bg-part, .left-part").css("margin-top", calculatedMargin +"vh");
    $(".scroll-down").addClass("removed");
    if (parseInt($(".nav-elem.active").attr("data-page")) === 1) {
      $(".scroll-down").removeClass("removed");
    }
  }
  
  function trickyStuff(page) {
    $(".left-part, .bg-part").css({"transition-duration": "0s", "transition-delay": "0s"});
    $(".main").css("top");
    magicStuff(page);
    $(".main").css("top");
    $(".left-part, .bg-part").css("transition-duration", "0.8s");
    randomDelay();
  }
  
  function pagination(pg) {
    $(".nav-elem").removeClass("active");
    $(".nav-" + pg).addClass("active");
    curPage = pg;
    
    if (pages >= 10) {
      $paginationPage.text(pg);
    } else {
      $paginationPage.text("0" + pg);
    }
  }
  
  function navigateUp() {
    if (curPage > 1) {
      curPage--;
      pagination(curPage);
      magicStuff();
      timeoutNav();
    }
  }
  
  function navigateDown() {
    if (curPage < pages) {
      curPage++;
      pagination(curPage);
      magicStuff();
      timeoutNav();
    }
  }
  
  var sidebarScroll = 0,
      $navEl =  $(".nav-elem"),
      $sidebar = $(".sidebar-real")
  $(".section-heading[data-page='" + (curPage+1) + "']").hide()
      $(".section-heading[data-page='" + (curPage+2) + "']").hide()

  setTimeout(function() {
    navigateDown()
    setTimeout(function() {
      navigateDown()
    }, 4000)
  }, 4000)
  
});