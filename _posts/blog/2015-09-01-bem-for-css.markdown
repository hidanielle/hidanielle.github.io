---
layout: post
title:  "BEM for CSS"
date:   2015-09-01 12:48:54 -0500
categories:
- blog
---

BEM Stands for **Block Element Modifier**, and it’s a methodology used to "speed development process up and ease the teamwork of developers." This post is going to talk about how to use BEM methodologies specifically in CSS

### Blocks

* **Logically** and **functionally** independent page component
* Can be nested (eg. head block can include a logo block and a search block)
* Can be moved around on a page and will also display properly
* Can be re-used

### Elements
Part of a block that can not be used outside of it’s block (eg. a menu item can’t be used outside of the menu)

### Modifier
Defines the **appearance** and **behaviour** of a block or an element (eg. The same block looks different due to a modifier)


## When to Use Which
* **Block** - If it can be reused and does not depend on anything
* **Element** - If it can’t be used on it’s own, without a parent





## BEM Tree
Help visually represent BEM entities - representation of a web page structure in terms of **Blocks**, **Elements**, and **Modifiers**

### DOM Tree:
{% highlight html %}
<header class="header">
    <img class="logo">
    <form class="search-form">
        <input type="input">
        <button type="button"></button>
    </form>
    <div class="lang-switcher">
    </div>
</header>
{% endhighlight %}

### BEM Tree
{% highlight html %}
header
  ├──logo
  └──search-form
    ├──input
    └──button
  └──lang-switcher
{% endhighlight %}




## Nesting Elements (Don't...)
A block can have a nested element structure in a DOM tree, but in BEM, the **ELEMENTS** can only be targeted directly from the **BLOCK**. This makes it possible to change the internal DOM structure of the **BLOCK** without modifying any code in an **ELEMENT**

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



## Naming Conventions

**Goal:** Make CSS selectors as informative as possible which helps to make dev and debugging easier

### Blocks:
* Defines the namespace for elements and modifiers
* Spaces between words are written using a single dash “-"
{% highlight css %}
.block-name
{% endhighlight %}
**Example:**
{% highlight css %}
.menu {}
.lang-switcher {}
{% endhighlight %}

### Elements:
Identifies an elements as belonging to a block - delimited by a double underscore “__"
{% highlight css %}
.block-name__elem-name
{% endhighlight %}

**Example:**
{% highlight css %}
menu__item {}
lang-switcher__lang-icon {}
{% endhighlight %}

### Modifiers:
Identifies a modifier as belonging to that block OR element - delimited by a single underscore “_"

Full name of a modifier is creating using:
* For Boolean modifiers — owner-name_mod-name
  * eg. .menu_hidden {}
* For key-value type modifiers — owner-name_mod-name_mod-val
  * eg. .menu_theme_morning-forest {}

When applying a modifier to a block or element, don’t forget to apply the original block/element class as well

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




## File System

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



## Style Guide - Using BEM in Design
BEM conventions can be applied at the design level. If designers new about the terms and how things are separated on the front side, this can influence how they design and set up their files?

## Scaling Down
https://en.bem.info/articles/bem-for-small-projects/