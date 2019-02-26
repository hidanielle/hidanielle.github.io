---
layout: post
title:  "Level up your Sass with the ampersand"
date:   2017-05-17 12:48:54 -0500
categories:
- blog
---


When was the last time you wrote vanilla CSS? As a front end developer, it's hard to imagine a world without CSS preprocessors and all of the functionality they provide. They give us features like variables and functions and organizational benefits like partial includes and selector nesting. 

As the most popular CSS preprocessor out there, [Sass](http://sass-lang.com/) just makes CSS _better_... but most developers barely even scratch the surface of what it can do.

*Originally posted on [Codepen](https://codepen.io/hidanielle/post/level-up-your-sass-with-the-ampersand)*

One of the most widely used features of Sass, and something that I definitely take for granted until I'm stuck writing vanilla CSS again, is the ability to nest [rulesets](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_rulesets) within [declaration blocks](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_declarations_blocks) to represent a [descendant selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_selectors) come compile time.
 
 Not only that, but nesting allows us to group styles together in a logical way that makes it easier to visually understand how elements relate to each other and so they can all be maintained in the same place. Nesting just feels natural... until it doesn't anymore. 
 
Enter: [**the ampersand**](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#parent-selector).

In Sass, the ampersand(`&`) is like a variable that always represents the parent selector. Paired with nesting, the ampersand allows us to do a lot of helpful things from super simple to _when-would-I-ever-actually-do-this_ complex. 


## & pseudo-classes

If you're a front end developer who uses Sass on a regular basis, chances are you've used the ampersand before to nest a [pseudo-class](https://developer.mozilla.org/en/docs/Web/CSS/Pseudo-classes) or [pseudo-element](https://developer.mozilla.org/en/docs/Web/CSS/Pseudo-elements) ruleset (`a:hover` or `div:before`). In this case, the ampersand fills a void that nesting couldn't. 

As I mentioned before, a benefit of Sass nesting is the organization it affords us. By itself, however, this just allows us to group descendant selectors inside declaration blocks. With the ampersand, we can nest pseudo-class rulesets inside the current declaration block just like we would with regular nesting. I've actually found that this use case of the ampersand is often misunderstood as it's only purpose because of how common it is.

Before we get too much further, it's worth noting that the ampersand represents the parent selector _after nesting gets resolved_. 

What that means is, if your inside a declaration block that is nested two levels, the ampersand will represent the full descendant selector. So, to figure out what the parent selector is at any given time, simply go up each nested selector until you reach the first parent. 

That sounds more complicated than it really is, but it's an important concept to understand, so let's look at an example. 

```scss
.pagination {
  a {
    &:hover,
    &:focus {
      color: red;
    }
  }
}

// in this case, the & represents `.pagination a`, and will compile to:

.pagination a:hover, 
.pagination a:focus {
  color: red;
}
```

(Psst, follow along and play with the Sass examples right in your browser at [SassMeister](https://www.sassmeister.com/))

## & concatenation 
As seen in the example above, the ampersand can kind of attach itself to another selector. Not only is this helpful when nesting pseudo-classes/elements, it can also be used the same way to concatenate additional class names (or IDs, etc.) into a compound selector for higher priority (instead of adding another descendant selector). 

While nesting is the most popular feature of Sass it's also the most abused, as increased specificity means less performant CSS selectors and it's really easy to get carried away. 

So how can you get the organizational benefits of nesting, without unnecessarily over-qualifying a selector? You guessed it! The ampersand (and following a CSS naming convention, I guess). 

We can use the ampersand to tell the compiler that we don't want this to be a descendant selector and instead make a single selector where the name literally  _starts with_ our parent selector. 

Take BEM for example, where you have class names that build off of each other like `.block__element--modifier` (or in my case a much less strict version of this). The ampersand lets you nest styles for the element and modifier within the same parent declaration block. This means we only need to write out that block or element name once.

When I build a site, I break out component styles into separate files where the file name generally matches the top-most selector. 

Building off of the example above, I would have a file named `_pagination.scss`, that started with a top level selector of `.pagination`. From there, all pagination related rulesets are contained within this declaration block by using nesting and the ampersand. Among the other benefits of nesting that I've alluded to earlier, this means that when another developer has to work on a component, they only need to look in one place!

Putting together what we've looked at so far, that pagination file could look something like this:

```scss
.pagination {
  &-number {
    // & = .pagination-number
    &.is-current {
      border: 3px solid green;
    }
  }
  // & = .pagination
  &-prev {
    background-color: red;
    // & = .pagination-prev
    &:after {
      content: '<';
    }
  }
}

// which compiles to 

.pagination-number.is-current {
  border: 3px solid green;
}
.pagination-prev {
  background-color: red;
}
.pagination-prev:after {
  content: '<';
}

```

## & self
So far, the ampersand has only been used to attach stuff together: classes, IDs, pseudo-classes, etc. But what about using the ampersand by itself? When you use the ampersand as a nested selector by itself, it will simply write out the full parent selector and compile to that selector as if it was never nested in the first place. At first this doesn't sound that helpful, as ultimately it's just an unnecessary set of brackets, but there are actually a few common places where this can be effectively used. 

Let's say I want to set my top level pagination selector to `display: flex`, but I know I also want my numbers to be flex as well. Without the ampersand, I could write the display [declaration](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#CSS_declarations) in two places: within my top level pagination rule and then again within the nested number rule. But not only does this mean I have to write that declaration multiple times (which of course isn't the end of the world), it also means that the compiled CSS will include two separate declaration blocks that have the same declaration in them. 

Instead, if you combined the single ampersand in a comma separated group of selectors with the child selector they would compile into a single declaration block.

Another use case of the ampersand by itself is when applying styles to same class siblings. For example, I want to apply a left margin to all my pagination numbers that are beside another pagination number. With plain CSS, this can be done by writing out my class name twice in an [adjacent sibling selector](https://developer.mozilla.org/en/docs/Web/CSS/Adjacent_sibling_selectors) (`.class + .class`). But by using the ampersand in a sibling selector instead, we can remove the need to duplicate the class, making it easier in case that class name ever changes.

Here's what both of these methods look like on my pagination component:

```scss
.pagination {
  // & = .pagination
  &,
  &-num {
    display: flex;
  }
  &-num {
    color: red;
    // & = .pagination-num
    & + & {
      margin-left: 1em;
    }
  }
}

// which compiles to 

.pagination, 
.pagination-num {
  display: flex;
}
.pagination-num {
  color: red;
}
.pagination-num + .pagination-num {
  margin-left: 1em;
}
```




## & changing parents
The ampersand doesn't always need to be used at the beginning of a selector, either. Putting the ampersand after a selector allows you to switch up the order, essentially changing the parent selector. 

Say I want my pagination style to have a slight change when it's within a blog list. I could nest my pagination selector within my blog list styles, but then it might not be obvious to other developers that that's where that ruleset lives. 

Wouldn't it be better to contain those styles within my global pagination styles? You can do that with the ampersand.

```scss
.pagination {
  &-container {
    .blog-list & {
      background-color: rebeccapurple;
    }
  }
}

// which will compile to:

.blog-list .pagination-container {
  background-color: rebeccapurple;
}

```

## & variables
As I mentioned before, the ampersand will always be equal to the entire parent selector, with all descendants. But what if you don't need that full selector to apply your declaration, and only need a portion of it? We know that nesting can sometimes result in selectors that are unnecessarily dependent on a specific markup or specificity (how many people have written `ul li a { }`?). 

To help with this, we can assign the ampersand to a variable within a declaration block,  that can then be used anywhere within the scope of that block and it's children.

You might be thinking, _when would I ever need to do this?_ Again, this is another thing that becomes more useful when following certain naming conventions. 

Below is an example of something that I wrote before I learned this trick,  where I wanted to apply certain styles to a panel image only when it's inside a right panel container. To do this, I had to repeat the parent container within my selector. This is okay, but instead we could use our parent variable (or _grandparent_, in this case) to avoid the duplication and stick to our nesting structure.

```scss
.panel {
  $parent: &; // equals .panel
  &-right {
    float: right;
  }
  &-image {
    margin-bottom: 1em;
    // & = .panel-image
    #{$parent}-right & {
      margin-left: 1em;
    }
  }
}

// which compiles to

.panel-right {
  float: right;
}
.panel-image {
  margin-bottom: 1em;
}
.panel-right .panel-image {
  margin-left: 1em;
}
```

##& bonus
Now that we understand how the ampersand works, we're able to keep all relevant code together in one place, and honestly it makes writing Sass much more fun. But with great power comes great responsibility, and with advanced Sass nesting it's easy to get carried away with your selectors. 

While we can argue all day about whether a CSS selector can _really_ be more or less performant, being overly-specific is undeniably a problem for maintenance especially in large-scale code bases. It makes it hard to override things, and confusing to unfamiliar developers.  

### @at-root
Caching the parent selector in a variable can help in some cases, but for organizational purposes it might be nice to group your code together even without a common parent. `@at-root` is a Sass feature that allows us to ignore our nesting altogether, and write top level selectors any where we want. This helps to keep specificity low because you don't have to worry about the compiled parent selector when you don't need it. 

```scss
.block{
  &__elem {
    display: block;
    @at-root .new-block {
      display: inline-block;
    }
  }
}

// compiles to 

.block__elem {
  display: block;
}
.new-block {
  display: inline-block;
}
```

Admittedly, there aren't many concrete use cases for this feature. But it's a nice one to keep in your back pocket as you start to get into more advanced Sass. For starters, I've dug up a few articles about @at-root for some use case examples [here](http://sassbreak.com/getting-back-to-our-roots/) and [here](http://alwaystwisted.com/articles/2014-03-08-using-sass-33s-at-root-for-piece-of-mind)
