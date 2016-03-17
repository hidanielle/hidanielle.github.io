---
layout: post
title:  "Font size calculator mixin"
date:   2015-09-20 12:48:54 -0500
categories:
- blog
---

The following snippet of code taks a px value font size and converts it into rem, with a px fallback. This is a really cool idea that I saw in the [OOCSS repo](https://github.com/stubbornella/oocss/blob/master/oocss/src/components/utils/_fontSize.scss) and have been using ever since. It's a really great way to see how Sass can help you beyond just nesting blocks of CSS! 

Rems are similar to ems in that they are a scalavle CSS unit but they are much more predictable. They were introduced in CSS3 and they are relative to the root HTML element as opposed to the parent - so you wouldn't have to worry about confusing em calculations anymore.

{% highlight scss %}
/**
 * Convert font-size from px to rem with px fallback
 *
 * @param $size - the value in pixel you want to convert
 *
 * e.g. p {@include fontSize(12px);}
 * 
 */

// Function for converting a px based font-size to rem.
@function calculateRem($size) {
  $remSize: $size / 16px;
//Default font size on html element is 100%, equivalent to 16px;
  @return #{$remSize}rem;
}

// Mixin that will include the fall back px declaration as well as the calculated rem value.
@mixin fontSize($size) {
  font-size: $size;
  font-size: calculateRem($size);
}
{% endhighlight %}
