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
  debugger;
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