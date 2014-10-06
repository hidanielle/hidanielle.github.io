$('.bio-btn').click(function() {
  if ($('.bio').hasClass("bio-long")) {
    $('.bio').removeClass("bio-long");
  } else {
    $('.bio').addClass("bio-long");
  }
});

$('.btn-nav-open').click(function() {
  $('nav > ul').slideToggle();
});

$(window).on("resize", function () {
  if ($(window).width() > 500) {
      $('nav > ul').css('display','');
  }
}).resize();

$('nav').waypoint('sticky', {
  offset: 100,
  stuckClass: 'scrolled',
  wrapper: '<div class="nav-wrapper" />',
});

$('.section-light').waypoint(function() {
    $('nav').toggleClass('nav-dark');
}, {
  offset: 80
});

$('.section-light').waypoint(function(direction) {
  $('nav').toggleClass('nav-dark');
}, {
  offset: function() {
    return -$(this).outerHeight() + 80;
  }
});

$('.btn-up').waypoint(function() {
  $('.btn-up').toggleClass('animated fadeInUp');
}, {
  offset: 'bottom-in-view'
});
