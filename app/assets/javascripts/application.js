//= require angular
//= require angular-rails-templates
//= require angular-ui-router
//= require angular-devise/lib/devise
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
    navTrigger.className = 'nav-trigger open';
    nav.className = 'out';
  } else {
    navTrigger.className = 'nav-trigger close';
    nav.className = 'in';
  }
}


})