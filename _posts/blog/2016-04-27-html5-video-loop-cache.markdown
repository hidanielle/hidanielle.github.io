---
layout: post
title:  "An adventure with HTML5 video and the cache"
date:   2016-04-27 12:48:54 -0500
categories:
- blog
---

Recently, I was tasked with implementing a header video background. While not my favourite idea for accessibility reasons, I know that it looks cool and flashy... and clients love cool and flashy things. 

I decided to inject the video into the DOM after the page loads. I wanted to do it this way so that the rest of the page doesn't have to be held up by the video loading. Of course, this means that some people may not see the video at all, depending on download speeds, as they could have scrolled passed before it even loads. That's a risk I'm willing to take though, because I think the pro of this approach outweigh the con.

First, I set up an empty div for the background image. This div can contain hidden alt text for screen readers, and it serves as a fallback before the video loads, and in case it doesn't load at all. Then, I have an empty div for the background video. I used data attributes to hold the sources to my two video files (mp4 and webm), and I took these sources and put them in a video tag via javascript

{% highlight html %}
<div class="background-image"></div>

<!-- Empty div to place video in -->
<div class="background-video" 
  data-mp4="https://a0.muscache.com/airbnb/static/Croatia-P1-1.mp4" 
  data-webm="https://a0.muscache.com/airbnb/static/Croatia-P1-0.webm">
</div>
{% endhighlight %}

Then, on the window load function, I pull the data attributes for the sources, create a video element as a string, and replace the empty div with my new video tag. It's also important to include a pause button in order to be accessible. 


{% highlight javascript %}
$(window).on("load", function() {    
  var vidContainer = $('.background-video'),
      src1 = vidContainer.attr('data-mp4'),  
      src2 = vidContainer.attr('data-webm'),
      video = '<video class="video" autoplay loop="loop"><source src="' + src1 + '" type="video/mp4"><source src="' + src2 + '" type="video/webm"></video>';

  vidContainer.replaceWith(video);
  $('.pause-button').removeClass('hidden');
}); 

$('.pause-button').click(function() {
  $('.video').get(0).paused ? $('.video').get(0).play() : $('.video').get(0).pause();
});
{% endhighlight %}


[You can see my codepen example here](http://codepen.io/hidanielle/pen/eZedWB])


## Here's where things get weird

As it's a background image, we want it to continuously loop and autoplay. We set those values in the tag and it works great... until you pop open the dev tools. So here I am, with my dev tools open on the page, looking at the network tab. I see a new video request coming up almost every second or couple of seconds, and the number MBs transferred increasing along with the requests. What the hell? 

If this happens to you the **first** thing you need to check is if you have "Disable Cache" set somewhere in your dev tools. A quick Google search describing this problem, will almost exclusively result in people with this issue realizing they had this checked the whole time. Once the cache in enabled, you'll see the source loading each time, but this time from the cache, and the data transfer won't continue to increase. Great. 

But it's kinda crazy for the people that, for whatever reason, might have cache disabled. While developing this feature, I looked to [Airbnb](https://www.airbnb.ca/) often, thinking that as a really big company, with a video background, they should have this optimized as much as it can be. Well, it happens there too. 

I'm not really sure that there **should** be a solution to this though (beyond just not having background images) because, of course, if your cache is disabled what would you expect to happen? 

However, it's also a problem if caching is disabled on a server level, with Cache-Control http headers, which is kinda beyond the scope of my knowledge but while I was searching, this came up a lot. 

The next avenue that I looked to explore was if there was a way to detect if cache was disabled, and serve up a different experience so as to not load the video over and over again. I haven't figured it out yet though.
