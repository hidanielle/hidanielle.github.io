---
layout: post
title:  "CSS Methodologies"
date:   2015-08-01 12:48:54 -0500
categories:
- blog
---

Objects in front-end development are simply HTML elements. The CSS is where we make those objects, or elements, modular and location independent to be able to place them anywhere on a page and behave predictably.


This is based off of a presentation I put together for an intro to CSS Methodologies. I thought it might be beneficial to write it out here (as opposed to only having it in Powerpoint). I apologize if some of the descriptions are brief, as it was written to be accompanied by my speaking :)

## Basic principles:

### Separating structure from skin:
To abstract the structure and positioning styles of an object from the presentational styles, or skin.

### Separating container from content:
To break components’ dependency of their containers.
Any object should be able to be placed in another container and still look and behave the same.

## WHY?

* Maintainable and scalable because its DRY.
* Classes can be reapplied and mixed on different objects without worrying about the context
* Easier for newcomers to understand - because there are more standards
* Most beneficial on large projects but still good on smaller ones because it forces you to think.
* Smaller CSS files
* Easier to change parts of a site; piece of mind.


***

## Separating Structure

**In other words:**
Position, float, margin, etc from background-color, border, etc

Essentially, don’t mix structure/positioning properties with skin/styling properties on the same class.

Skinning properties and be reused on a variety of elements, preventing property duplication.

## Separating Container

Allow re-use of elements no mater where you are in the dom.
Styled element should never be dependent on where it’s at in a page.

**“Rarely use location-dependent styles.”**
Do not cascade, go straight into object, give them a class and reference that in your CSS.

**Don’t do this:**
{% highlight css %}
ul li.list-item {
...
}
{% endhighlight %}

Instead, go straight into the element:
{% highlight css %}
.list-item {
...
}
{% endhighlight %}

Never mimic the structure of your HTML in CSS. In other words, don't refer to tags or IDs in your stylesheets. Instead, try to create and apply a classes that describe the use of the tag in question. And keep nested classes to a bare minimum.


***


## The “Media” Object

Poster child for OOCSS, the “media” object is an image to the left, with descriptive content to the right.
The content on the right can contain any other objects, text, lists, other media objects

**Properties of the media object:**

* It can be nested
* Optional right button
* Needs clearfix
* Widths and margins may vary
* Right content is unknown

{% highlight css %}
.media {margin:10px;}
.media, .bd {overflow:hidden; _overflow:visible; zoom:1;}
.media .img {float:left; margin-right: 10px;}
.media .img img {display:block;}
.media .imgExt {float:right; margin-left: 10px;}
{% endhighlight %}

## With SASS

### @extend

Using Sass `@extend` with placeholder classes cleans up your HTML leaving you with semantic class names while still remaining DRY.

Placeholder classes reduce the bloat of extending real classes or using mixing, and if you decide later that you don’t want an element to have that certain style pattern, all you have to do is remove the @extend line instead of going through the HTML and taking it out everywhere.

Placeholders also can be re-used among projects

{% highlight css %}
// Using the “media element” example (Facebook)

%media {
     overflow: hidden;
     &:first-child {
          float: left;
     }
     &:last-child {
         overflow: hidden;
     }
}

.status {
     @extend %media;
     // Status specific styles
}

.profile {
     @extend %media;
     // Profile specific styles
}

{% endhighlight %}

## With BEM

Stands for **Block Element Modifier**, and it’s sort of a way to write OOCSS.

Each block starts with a block (object name). Children of that block are elements, separated by two underscores. Modifiers are added by two hyphens.
{% highlight css %}
.block {}
.block__element {}
.block--modifier {}
{% endhighlight %}
{% highlight css %}
// Media object in BEM

.media {}
.media__img {}
.media__img--rev {}
.media__body {}
{% endhighlight %}

It really aims to not have an descendant selectors.

You can still use it with Sass though, by using the & to prefix the elements

{% highlight css %}
.media {
     &__img { }
}
{% endhighlight %}

## What about Smacss?

**“Scalable and modular architecture for CSS"**
A style guide for your CSS - Widely considered a “must read"
[Check out the book here](http://shop.smacss.com/)- $15.00

Categorization is at the very core of SMACSS.

* base (the defaults, reset can go here, styles that remain consistent everywhere the element is)
* layout (divide page into sections, hold on or more modules together)
* module (reusable, modular parts; callouts, sidebar, product lists, media elements)
* state (way to describe how modules or layouts will look in a particular state; hidden, expanded, active, inactive)
* theme (similar to states and not always necessary but they also describe how layouts or modules may look. most sites don’t have these)

The purpose of categorization is to find patterns. It’s hard at first to decide what pieces go into what category, but that is all part of the process - it forces you to think.

### Naming
Naming conventions help to automatically distinguish which category a rule belongs to.

* layout - “l-"
* states - “is-“ (is-hidden, is-collapsed)
* modules - just use the name of the module itself, as they are the bulk of the project


***

## CONS

* Too many classes in our HTML - bloated.
    * Is the trade off of DRY, clean CSS worth it if our HTML is bloated?
    * Can we use Sass @extend to help with this problem?
* Classes don’t tell you anything about the content
    * Classes shouldn’t describe content when content describes itself
    * Use a custom data-attribute if you want to refer to a component by a unique name ([Naming UI components in OOCSS](http://csswizardry.com/2014/03/naming-ui-components-in-oocss/))
* Takes time to learn - overkill for small scale projects
    * Once something becomes habit, it is much easier and quicker
    * At the very least it gets you thinking more about the why you are doing something
* You have to look through the design in depth to identify repeatable areas
    * We don’t necessarily have control of the design, so it’s important to educate designers on reusability of patterns, font sizes, shadows, etc.


***

## Resources

[MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)

[INUIT.CSS V5.0 THE OBJECT ORIENTED CSS FRAMEWORK](http://www.evoluted.net/thinktank/web-development/inuit-css-v5-0-the-object-oriented-css-framework)

[SMACSS](https://smacss.com/)