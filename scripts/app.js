$(function(){
  var shrinkHeader = 200;
  $(window).scroll(function() {
    var scroll = getCurrentScroll();
    if ( scroll >= shrinkHeader ) {
      $("nav").addClass("scrolled");
    }
    else {
      $("nav").removeClass("scrolled");
    }
  });
  function getCurrentScroll() {
    return window.pageYOffset;
  }
});

$('.bio-btn').click(function() {
  if ($('.bio').hasClass("bio-long")) {
    $('.bio').removeClass("bio-long");
  } else {
    $('.bio').addClass("bio-long");
  }
});
