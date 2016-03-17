---
layout: post
title:  "Getting started with Animate.css"
date:   2014-10-13 12:48:54 -0500
categories:
- blog
---

[Animate.css](http://daneden.github.io/animate.css/) is a library filled with fun CSS animations. It's kind of become a staple in my builds because of how easy it is to implement, and it feels like it's hardly there. I've started just taking bits and pieces of it, the animations that I'm actually going to use, and only loading those into my site.

The markup is really simple. You just have to include the animate.css stylesheet, and then add the class "animated" and whatever animation class you want (eg. "bounceOutLeft").

{% highlight html %}
<link rel="stylesheet" href="animate.min.css">

<div class="animate bounceOutLeft">
    <h1>Hi</h1>
</div>
{% endhighlight %}

If you know that you only want to use a certain animation, you can take that particular code block and only add that as well as the base styles. Something like this:

{% highlight css %}
// _base.css
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animated.infinite {
  animation-iteration-count: infinite;
}

.animated.hinge {
  animation-duration: 2s;
}

// rubberBand.css
@keyframes rubberBand {
  0% {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.25, 0.75, 1);
  }

  40% {
    transform: scale3d(0.75, 1.25, 1);
  }

  50% {
    transform: scale3d(1.15, 0.85, 1);
  }

  65% {
    transform: scale3d(.95, 1.05, 1);
  }

  75% {
    transform: scale3d(1.05, .95, 1);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
}

.rubberBand {
  animation-name: rubberBand;
}

{% endhighlight %}

Call an animation on click by using jQuery/Javascript to dynamically add the classes

{% highlight js %}
$(".animateMe").click(function() {
      $(this).addClass("animated rollIn");
});
{% endhighlight %}

## Customization

### Animation Styles

There are a ton of different animation styles. You can view and preview all of them [here](http://daneden.github.io/animate.css/)

### Animation Parameters

You can override some animation parameters by just defining them manually on your animated element

{% highlight css %}
#yourElement {
  animation-duration: 3s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
}
{% endhighlight %}

**Infinite:** Adding a class of `.infinite` to your `.animated` element will cause the animation to run infintitely.

**Hinged:** Adding a class of `.hinge` to your `.animated` element will cause the animation to run 2s slower than the default, which is 1s.

## Integration

This may often be used with something like jQuery Waypoints, to call an animation on scroll. Just make sure to include jQuery and Waypoints.js.

{% highlight js %}
$('.animateMe').waypoint(function() {
    $(this).addClass("animated rollIn");
});
{% endhighlight %}


## Support

Tested Browsers:
* Chrome
* Firefox
* Safari
* Opera
* Android Browser
* iOS Safari

Doesn't work in IE < 9. You can add your own animation fallbacks, or consider it progressive enhancment and fallback to no animation in these browser versions.

### Benefits

* Super easy to implement
* Tons of options and customization
* Integrates easily with other libraries, like Waypoints
* Doesn't require jQuery