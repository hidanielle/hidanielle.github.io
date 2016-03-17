---
layout: post
title:  "My Emmet starter guide"
date:   2014-06-01 12:48:54 -0500
categories:
- blog
---

Emmet (formerly known as Zen Coding) is designed to speed up the way you write HTML. Installed easily as a plugin for most text editors, after writing a line of Emmet-style code all you have to do is press the tab button to expand it into all of it's HTML goodness.

Once an Emmet line is expanded into HTML, you can tab through to be brought to each area of the code where you would then need to add more information. 

### The Basics

**Setting up your page**

{% highlight html %}
html:5
{% endhighlight %}

Will output this HTML 5 skeleton

{% highlight html %}
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
   
</body>
</html>
{% endhighlight %}

**Adding the viewport meta tag**

{% highlight html %}
meta:vp

<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
{% endhighlight %}

**Main Emmet Lines**

* E represents an HTML tag
* E#id - An Element with an ID
* E.class - An Element with a Class
* E[attr=foo] - An Element with a specific attribute
{% highlight html %}
img[src=http://placehold.it/50x50]

<img src="http://placehold.it/50x50" alt="">
{% endhighlight %}

* E{foo} - An Element containing content "foo"
{% highlight html %}
h1{Hello World}

<h1>Hello World</h1>
{% endhighlight %}

* E > N - N is a Child Element of E

{% highlight html %}
div>h1{I'm a child of a div!}

<div>
     <h1>I'm a child of a div!</h1>
</div>
{% endhighlight %}

* E + N - N is a Sibling Element of E

{% highlight html %}
div>h2+p

<div>
     <h2></h2>
     <p></p>
</div>
{% endhighlight %}

* E * N - Write Element E, N number of times
* E$*N - Write Element E, N number of times and append number ($$ will number 2 digits [01, 02, etc.])

{% highlight html %}
select>option[value=$]*3

<select name="" id="">
    <option value="1"></option>
    <option value="2"></option>
    <option value="3"></option>
</select>
{% endhighlight %}


It's important to note that Emmet is not an alternative to HAML, you can actually use the two together. 

Any line of Emmet, can be expanded into HAML instead of HTML by adding `|haml` to the end of your line. If you are working in a HAML file, Emmet should automatically expand to HAML without adding anything to the line.


{% highlight html %}
section#wrapper>h2+p|haml

%section#wrapper
    %h2
    %p 
{% endhighlight %}

## Further Reading

[Emmet Cheatsheet](http://docs.emmeti.io/cheat-sheet)

[More info](http://docs.emmet.io/filters/)