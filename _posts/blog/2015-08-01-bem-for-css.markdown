---
layout: post
title:  "BEM for CSS"
date:   2015-08-01 12:48:54 -0500
categories:
- blog
---

BEM Stands for **Block Element Modifier**, and it’s a methodology used to "speed development process up and ease the teamwork of developers." This post is going to talk about how to use BEM methodologies specifically in CSS. We'll start with some definitions.

### Blocks...

* are **logically** and **functionally** independent page component
* can be nested (eg. head block can include a logo block and a search block)
* can be moved around on a page and will also display properly
* can be re-used

### Elements...
are part of a block that can not be used outside of it’s block (eg. a menu item can’t be used outside of the menu)

### Modifiers...
define the **appearance** and **behaviour** of a block or an element (eg. The same block looks different due to a modifier)


### When to Use Which?
* Use a **Block** if it can be reused and does not depend on anything
* Use an **Element** if it can’t be used on it’s own, without a parent


## Naming Conventions

Probably the biggest part of BEM CSS is, the naming convention. The goal here, is to make CSS selectors as informative as possible,  which helps to make dev and debugging easier

### Blocks define the namespace for elements and modifiers
* Spaces between words in a block name are written using a single dash “-"

{% highlight css %}
.block-name
{% endhighlight %}

**Example:**

{% highlight css %}
.menu {}
.lang-switcher {}
{% endhighlight %}

### Elements identify as belonging to a block - delimited by a double underscore **“__"**

{% highlight css %}
.block-name__elem-name
{% endhighlight %}

**Example:**

{% highlight css %}
menu__item {}
lang-switcher__lang-icon {}
{% endhighlight %}

### Modifiers identify as belonging to that block OR element - delimited by a single underscore **“_"**

The full name for a modifier is created in two different ways (depending on the type of modifier)
* For Boolean modifiers — *owner-name_mod-name*
  * eg. `.menu_hidden {}`
* For key-value type modifiers — *owner-name_mod-name_mod-val*
  * eg. `.menu_theme_morning-forest {}`

When applying a modifier to a block or element, don’t forget to apply the original block/element class as well. This was, your block or element will inherit all of the styles of a normal block or element of it's kind, and the modifier will then be applied on top.

**DO:**

{% highlight html %}
<div class="menu menu_hidden">...</div>
{% endhighlight %}

**DON’T:**

{% highlight html %}
<div class="menu_hidden">...</div>
{% endhighlight %}

## Full BEM Example:

**HTML:**

{% highlight html %}
<form class="form form_login form_theme_forest">
    <input class="form__input">
    <input class="form__submit form__submit_disabled">
</form>
{% endhighlight %}

**CSS:**

{% highlight css %}
.form {}
.form_theme_forest {}
.form_login {}
.form__input {}
.form__submit {}
.form__submit_disabled {}
{% endhighlight %}

## Alternate Naming Convention

#### Harry Roberts' style

{% highlight css %}
block-name__elem-name--mod-name
{% endhighlight %}

* Names are written in lower case.
* Words within the names of BEM entities are separated by a hyphen (-).
* An element name is separated from a block name by a double underscore (__).
* Boolean modifiers are delimited by double hyphens (--).
* Key-value type modifiers are not used.


## Nesting Elements (Don't...)
A block can have a nested element structure in a DOM tree, but in BEM, the **elements** can only be targeted directly from the **block**. This makes it possible to change the internal DOM structure of the **block** without modifying any code in an **element**

What does this mean? Basically, you can put elements inside eachother, but their names will still be based off of the original block. You don't just keep adding elements after elements.

**DOM Tree:**

{% highlight html %}
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2">
            <div class="block__elem3"></div>
        </div>
    </div>
</div>
{% endhighlight %}

**BEM:**

{% highlight css %}
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
{% endhighlight %}



## File System

These are a few ways to organize your files when adopting BEM methodologies:

### Just CSS - Just Blocks
Put all blocks and block-specific elements and modifiers in separate files that get included in to one css file

{% highlight html %}
blocks/
   head.css
  menu.css
{% endhighlight %}

### Just CSS - A file for everything
Simulate a block structure in your file structure

* Block code is placed in a separate directory
  * Directory name matches block name
  * Implementation is placed under this directory
* Elements are placed in subdirectories under the block directory
  * Directory name matches element name
  * Implementation is placed under this directory
* Modifiers are placed in subdirectories under the block directory
  * Directory name matches modifier name
  * Implementation is placed under this directory
  * File name includes both key and value of the modifier (again, for programmatic access)

{% highlight html %}
menu/
   __item/
      _state/
         menu__item_state_current.css
      menu__item.css
   menu.css
   menu.js
{% endhighlight %}

### All related files
Put all blocks in their own directory
{% highlight html %}
blocks/
   menu/
      menu.js
      menu.css
{% endhighlight %}


## How BEM affects design
I think this is important to talk about, when discussing BEM on the front end, because alot of this assumes that there is a DRY (don't repeat yourself) design from the get-go. For example, if a design is all over the place and doesn't reuse components, I'm not sure that BEM will be very easy to incorporate. 

When thinking about parts of a website as modules, style guides are definitely a great place to start. Designers can even create the names of the blocks, elements, and modifiers as names for their layers. 

Personally, I've yet to use BEM on a project, simply because it hasn't felt **right** yet. Obviously, the benefits of BEM are more apparent on large scale sites - which I haven't done lately. 
