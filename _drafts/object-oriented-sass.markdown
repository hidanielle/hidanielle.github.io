You can think of *objects* in CSS as, simply, HTML elements. These HTML objects become modular with how we write our CSS. I talked briefly about this in a presentation (turned post) on an [An intro to CSS Methodologies](http://hidanielle.com/blog/css-methodologies/), but I wanted to dive deeper into using an Object Oriented approach specifically with Sass.

Ultimately, the *goal* of OOCSS is to **separate container from content**. This means, ideally, an element should *never* be dependant on where it's located in the DOM. We want to be able to reuse as much of our styles as possible, thus allowing us to write less code, better code, and more maintainable code.

To achieve this, first we need to think about **separation of structure from skin**. By abstracting positioning properties(margins, padding, position) away from skinning properties(colour, border) into seperate classes, our code becomes more DRY. Chances are, you'll have a couple elements with the same backgrounds and borders, that serve entirely different purposes. OOCSS would have you creating a class specifically for that background/border combination, and applying it to each object where necessary.

{% highlight css %}
.box-border {
  border: 1px solid #eeeeee;
  background-color: #ffffff;
}

/*-- VS --*/

.list-item {
  display: inline;
  margin-bottom: 20px;
  border: 1px solid #eeeeee;
  background-color: #fffffff;
}

.callout-box {
  width: 300px;
  height: 300px;
  margin-bottom: 20px;
  border: 1px solid #eeeeee;
  background-color: #fffffff;
}
{% endhighlight %}

With the HTML looking like this:

{% highlight html %}
<ul>
  <li class="list-item box-border"></li>
</ul>

...

<aside class="callout-box box-border"></aside>
{% endhighlight %}

This is all well and good, but if you've been paying attention, it's *a lot* of classes. That means, our HTML is starting to get really messy. And we've just shifted the problem of maintainability onto our markup instead of actually solving anything. 

## Sass + `@extend` + placeholder classes

### The Rundown

* **`@extend`** allows us to copy code from one style block into another - *one* thing to note is that it will copy **everything**, including nested selectors, from the block that is being extended.
* `%placeholder-classes` are like normal classes, but are marked by a `%` symbol, and they don't get compiled into CSS. This makes it perfect for OOSass.
