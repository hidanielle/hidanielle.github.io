---
layout: post
title:  "CSS variables: An Introduction"
date:   2016-10-04 12:48:54 -0500
categories:
- blog
---


The following is a write up to explain the excellent presentation by Lea Verou titled "CSS Variables: var(--subtitle)" at FITC Toronto Web Unleashed 2016. The slides can be found [here](https://leaverou.github.io/css-variables/). Since the slides were hand-coded during the presentation, the intention of this article is to provide the context that may be missing.

## What?
CSS variables are exactly what they sound like: similar to preprocessor variables, they contain specific values that are intended to be reused.

CSS Variables work like normal CSS properties. They are inherited by default, but you can override this by setting the variable equal to `initial` where it is first being set. 

```css
* {
  outline: var(--outline);
  --outline: initial; // without this, any child of .block1 will also have a .2em solid outline.
}
.block1 {
  --outline: .2em solid;
}
```

## The Syntax

Prefixed with `--` and called as a value by `var(--myvar)`.

Think of it like a prefixed property with an empty prefix (ie. `-webkit-`, without the `webkit`). Additionally, this prefix was chosen was so that you can still use Sass/Less variables without clashing.

CSS variables are set like any other property, **and can even be written within the HTML style attribute**. This opens up the possibility of themeing.

CSS variables are case-sensitive, and can not be *empty*.

```css
--foo:; is invalid
--foo: ; is valid
--foo ≠ --FOO
```

If the value of a variable is not a valid value of whatever property it is being used on, it will compile to "**Invalid at computed-value time**" and will default to `initial`.

```css
body {
  --bgcolor: 20px;
  background-color: var(--bgcolor); // 20px (invalid) = initial = transparent
}
```

CSS variables can be set with fallbacks if the variable is not set. These fallbacks can be other variables, that then have their own fallbacks.

```css
var(--color1, var(--color2, var(--color3, red)))
```

Since you can't concatenate in CSS (aside from the `content` property), CSS variables can not be concatenated. This means, for example, you can't combine a CSS variable that is a number with a unit.

```css
// No version of this will work 
div {
  --height: 100;
  height: var(--height) + 'px';
}
```
## Responsive design, animation, and themeing

### Media Queries
CSS variables can be used inside media queries. This is extremely useful, because you will only have to define rules once and can override the value of a variable inside a media query.

```css
div {
  --height: 100px;
  height: var(--height);
}

@media (max-width: 800px) {
  div {
   --height: 500px;
  }
}
```

### Keyframes and transitions
Since there is no way of knowing exactly what kind of data is inside a CSS variable, they currently can't be animated - the browser wouldn't know what to do with the animation. 

If you try to animate a variable within a **keyframe**, it will simply flip back and forth between values.

However, changing a variable value on an element property with an assigned **transition** will trigger that specific properties animation:

```css
#transition.slide {
  --bgcolor: yellow;
  background: var(--bgcolor);
  transition: 1s;
}

#transition.slide:active {
  --bgcolor: #0ca;
}
```

### Themeing

By utlizing variables, we can create themable elements that don't require a whole new class. We can also create variables with a concept of public and private. 

**For Example:**
The `--col` variable is private, no one but the CSS author knows about it. The `--color` variable is what is used in the HTML to set the theme. 

In the example below, default button is black text with black border and black background on hover. 

```css
button {
  --col: var(--color, black); 
  border: .1em solid var(--col);
  background: transparent;
  color: var(--col);
}

button:hover {
  background: var(--col);
  color: white;
}
```

When manipulating the "public" `--color` variable, we can generate any color button, in this case: the button will result in red text with red border and red background on hover.

```html
<button>Click me</button>
<button style="--color: red">Click me</button>
```

## Javascript
You can use Javascrpit to get, set, and modify CSS variables which can result in some pretty powerful stuff.

```javascript
// Get variable from inline style
element.style.getPropertyValue("--foo");
// Get variable from wherever
getComputedStyle(element).getPropertyValue("--foo");
// Set variable on inline style
element.style.setProperty("--foo", 38 + 4);
```

The following example (taken from the slide deck [try it for yourself!]), sets a variable in Javascript on mouse movement. This variable is used in CSS to create the effect of a radial gradient following the mouse cursor.

```javascript
var root = document.documentElement;

document.addEventListener("mousemove", evt => {
  let x = evt.clientX / innerWidth;
  let y = evt.clientY / innerHeight;

  root.style.setProperty("--mouse-x", x);
  root.style.setProperty("--mouse-y", y);
});
```

```css
#mouse.slide {
  background-image: radial-gradient(
    at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%),
    transparent, black);
}
```

## Browser Support

CSS variables are probably better supported than you *think*, but still not as much as you *want*.

According to [caniuse](http://caniuse.com/#feat=css-variables), CSS variables are supported on all *major* browsers **except IE 11/Edge**
