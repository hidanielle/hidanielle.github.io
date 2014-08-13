// $(function(){
//   var shrinkHeader = 200;
//   $(window).scroll(function() {
//     var scroll = getCurrentScroll();
//     if ( scroll >= shrinkHeader ) {
//       $("nav").addClass("scrolled");
//     }
//     else {
//       $("nav").removeClass("scrolled");
//     }
//   });
//   function getCurrentScroll() {
//     return window.pageYOffset;
//   }
// });

$('.bio-btn').click(function() {
  if ($('.bio').hasClass("bio-long")) {
    $('.bio').removeClass("bio-long");
  } else {
    $('.bio').addClass("bio-long");
  }
});

$('nav').waypoint('sticky', {
  offset: 100,
  stuckClass: 'scrolled',
  wrapper: '<div class="nav-wrapper" />',
  // handler: function() {
  //   $('nav > .logo > h1').addClass("animated fadeInDown");
  //   $('#menu').toggleClass("animated fadeInDown");
  // }
});

// $('#bio').waypoint({

//   handler: function(direction) {
//    if (direction == 'up') {
//       $('nav > .logo > h1').removeClass("animated fadeInDown");
//       $('#menu').removeClass("animated fadeInDown");
//       $('nav > .logo > h1').addClass("animated fadeoutnDown");
//       $('#menu').addClass("animated fadeoutDown");
      
//     }
//   }
// });

$('.section-light').waypoint(function() {
    $('nav').toggleClass('nav-dark');
});

$('.section-light').waypoint(function(direction) {
  $('nav').toggleClass('nav-dark');
}, {
  offset: function() {
    return -$(this).height();
  }
});

