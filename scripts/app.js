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

$('.trigger').waypoint(function() {
  $('nav').toggleClass('nav-dark');
}, {
  offset: 80
});

$('.btn-up').waypoint(function() {
  $('.btn-up').toggleClass('animated fadeInUp');
}, {
  offset: 'bottom-in-view'
});
